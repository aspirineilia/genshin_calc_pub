import requests

from collections import OrderedDict
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.templates import talents
from lib.genshin.strings.templates.names import keywords_eng, keywords_rus, names_eng, names_rus, patterns_eng
from lib.genshin.utils import convert_id

lang_data = {
    'rus': {
        'patterns': patterns_eng,
        'names': names_rus,
        'talents': talents.templates,
        'keywords': keywords_rus,
    },
    'eng': {
        'patterns': patterns_eng,
        'names': names_eng,
        'talents': talents.templates,
        'keywords': keywords_eng,
    },
}

DATA_URL = 'https://api.ambr.top/v2/en/avatar/10000093?vh=43F5'


def import_char():
    data = {
        'rus': requests.get(DATA_URL.replace('/en/', '/ru/')).json()['data'],
        'eng': requests.get(DATA_URL).json()['data'],
    }
    char_id = convert_id(data['eng']['name'])
    # char_id = 'traveler_hydro'
    result = []

    res_item = OrderedDict(
        category='char_name',
        name=char_id,
    )
    for lang_name in data:
        res_item[lang_name] = data[lang_name]['name']
    result.append(res_item)

    tpl_char = getattr(talents, f'char_{char_id}', None)
    # if not tpl_char:
    #     return

    for talent_eng, talent_rus in zip(data['eng']['talent'].values(), data['rus']['talent'].values()):
        if talent_eng['type'] not in (0, 1):
            continue
        skill_name = talent_eng['name'].replace('Normal Attack: ', '')
        skill_id = char_id + '_' + convert_id(skill_name)
        # skill_id = char_id + '_' + convert_id(skill_name, removeSemicolon=True)

        res_item1 = OrderedDict(category='talent_name', name=skill_id)
        res_item2 = OrderedDict(category='talent_descr', name=skill_id)

        for lang_name, talent_data in zip(('rus', 'eng'), (talent_rus, talent_eng)):
            skill_name = talent_data['name'].replace('ЪЪЪ', '').replace('Normal Attack: ', '')
            skill_descr = talent_data['description'].replace('ЪЪЪ', '')
            skill_descr = patterns_eng.process(skill_descr)

            res_item1[lang_name] = skill_name
            res_item2[lang_name] = skill_descr

        result.append(res_item1)
        result.append(res_item2)

    list_eng = [i for i in data['eng']['talent'].values() if i['type'] == 2] + list(data['eng']['constellation'].values())
    list_rus = [i for i in data['rus']['talent'].values() if i['type'] == 2] + list(data['rus']['constellation'].values())

    for talent_eng, talent_rus in zip(list_eng, list_rus):
        skill_name = talent_eng['name']
        skill_short_id = convert_id(skill_name, removeSemicolon=True)
        skill_id = char_id + '_' + skill_short_id

        res_item1 = OrderedDict(category='talent_name', name=skill_id)
        descItems = {}

        for lang_name, talent_data in zip(('rus', 'eng'), (talent_rus, talent_eng)):
            skill_name = talent_data['name'].replace('ЪЪЪ', '')
            res_item1[lang_name] = skill_name

            if talent_data['description']:
                skill_descr = talent_data['description'].replace('ЪЪЪ', '')

                tpl_names = lang_data[lang_name]['names']
                tpl_keywords = lang_data[lang_name]['keywords']
                tpl_talents = lang_data[lang_name]['talents']

                # skill_name = re.sub(r'^.*?:\s*', '', skill_name)
                skill_descr = tpl_talents.process(skill_descr)
                skill_descr = tpl_keywords.process(skill_descr)
                skill_descr = tpl_names.process(skill_descr)
                if tpl_char:
                    skill_descr = tpl_char.process(lang_name, skill_short_id, skill_descr)

                if not isinstance(skill_descr, list):
                    skill_descr = [skill_descr]

                descItems[lang_name] = skill_descr

        result.append(res_item1)

        if descItems and not talent_data.get('extraData'):
            index = 0
            for (rus, eng) in zip(descItems['rus'], descItems['eng']):
                index += 1
                namei = skill_id
                if len(descItems['rus']) > 1:
                    namei = f'{skill_id}_{index}'
                result.append(
                    OrderedDict(
                        category='talent_descr',
                        name=namei,
                        rus=rus,
                        eng=eng,
                    )
                )

    CsvDumper().dump(result, 'exported.csv')


import_char()
