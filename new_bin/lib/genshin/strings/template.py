import itertools
import re
import logging

logger = logging.getLogger(__name__)


class SentenceMismatch(Exception):
    def __init__(self, value: str = None, new_value: str = None) -> None:
        self.value = value
        self.new_value = new_value


def clean_number(text: str):
    text = re.sub(r',(\d\d\d)', '\\1', text)
    text = re.sub(r',', '.', text)
    text = re.sub(r'[^\d\.]', '', text)
    return text


class TemplateSentence:
    def __init__(self, source: str):
        self.source = source
        self.values = []

        def repalce_callback(match):
            self.values.append(match.group(1))
            return '{value_%d}' % (len(self.values),)

        self.formatted = re.sub(r'\b(\d+(?:(?:,|\.)\d+)?\%?)', repalce_callback, source)

    def apply(self, values: list):
        if len(self.values) != len(values):
            logger.error(f'Template Sentence values length mismatch: {self.source}')

        index = 0
        result = self.formatted

        for (own_value, ext_value) in itertools.zip_longest(self.values, values):
            ext_value = self.check_value(own_value, ext_value)
            index += 1
            if ext_value and ext_value == 'ignore':
                result = result.replace('{value_%d}' % index, own_value)
            elif ext_value:
                result = result.replace('{value_%d}' % index, '%%{%s}' % ext_value)
            else:
                result = result.replace('{value_%d}' % index, 'value{%s}' % own_value)
        return result

    def check_value(self, own_value, ext_value):
        if not ext_value:
            return ext_value
        parts = ext_value.split(':')
        if len(parts) != 2:
            return ext_value

        if clean_number(own_value) != clean_number(parts[0]):
            raise SentenceMismatch(ext_value, own_value)

        return parts[1]


class TemplateString:
    def __init__(self, source: str):
        self.source = source
        self.sentences = []

        text = re.sub(r'\. ([A-ZА-Я])', ".\n\\1", source)
        for item in re.split(r'\n', text):
            self.sentences.append(TemplateSentence(item))

    def apply(self, values: list, res_index=None):
        if len(self.sentences) != len(values):
            logger.error('Template sentence length mismatch')
            self.dump()
            return ''

        result = []
        for (item, data) in zip(self.sentences, values):
            try:
                result.append(item.apply(data))
            except SentenceMismatch as e:
                logger.error(f'Template sentence value mismatch for {e.value} new value is {e.new_value}')
                return ''

        if isinstance(res_index, list):
            res_list = []
            for indices in res_index:
                r = []
                for index in indices:
                    r.append(result[index])
                res_list.append(' '.join(r))
            return res_list
        return ' '.join(result)

    def dump(self):
        logger.error(self.source)
        for item in self.sentences:
            logger.error(item.values)


class Template:
    def __init__(self, replace={}, names=[], sentences=[], patterns=[], keywords=[], skills={}, results=None):
        self.replace = replace
        self.names = names
        self.sentences = sentences
        self.patterns = patterns
        self.keywords = keywords
        self.results = results
        self.skills = skills

    def process(self, string: str):
        result = string
        result = self.apply_replace(result)
        result = self.apply_keywords(result)
        result = self.apply_skills(result)
        result = self.apply_patterns(result)
        sen_result = self.apply_sentences(result)
        if isinstance(sen_result, list):
            ret = []
            for sent in sen_result:
                ret.append(self.apply_names(sent))
            return ret
        else:
            return self.apply_names(sen_result)

    def apply_replace(self, string):
        result = string
        for key in self.replace:
            result = result.replace(key, self.replace[key])
        return result

    def apply_sentences(self, string):
        result = string
        if self.sentences:
            result = TemplateString(result).apply(self.sentences, self.results)
        return result

    def apply_names(self, string):
        result = string
        for name in self.names:
            result = re.sub(r'(?:^|([^\{])\b)' + re.escape(name) + r'(?:\b([^\}])|$)', '\\1name{%s}\\2' % name, result)
        return result

    def apply_keywords(self, string):
        result = string
        for keyword in self.keywords:
            result = re.sub(r'(?:^|([^\{])\b)(' + re.escape(keyword[0]) + r')(?:$|\b([^\}]))', '\\1' + keyword[1] + '{\\2}\\3', result)
        return result

    def apply_patterns(self, string):
        result = string
        for pattern in self.patterns:
            result = re.sub(pattern[0], pattern[1], result)
        return result

    def apply_skills(self, string):
        result = string
        for skill in self.skills:
            for name in self.skills[skill]:
                result = result.replace(f'skill{{{name}}}', f'skill{{{skill}:{name}}}')
        return result


class TemplateList:
    def __init__(self, **templates):
        self.templates = dict(**templates)

    def process(self, lang, name, string):
        result = string
        default = self.templates.get(f'default_{lang}')
        selected = self.templates.get(name) or self.templates.get(f'{name}_{lang}')
        if default:
            result = default.process(result)
        if selected:
            result = selected.process(result)
        return result
