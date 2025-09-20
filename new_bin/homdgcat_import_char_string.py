import requests
import re
import json

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

CHAR_NAME = 'Ineffa'
CHAR_ID = 'Ineffa'
LINK_ID = '1115'
DATA_URL = f'https://homdgcat.wiki/gi/EN/Avatar/{CHAR_ID}_1.js'


def import_json(url):
    data = requests.get(url).text
    data = re.sub(r'^.*var _AvatarSkillPConfig_ = (.*)\s*var _AvatarAttackConfig_ .*$', '\\1', data, flags=re.DOTALL)
    data: dict
    data = json.loads(data)
    char_name = list(data.keys())[0]
    data = data[char_name]['Ver']
    version = max(list(data.keys()))
    return data[version]

def import_char():
    data = {
        'rus': import_json(DATA_URL.replace('/EN/', '/RU/')),
        'eng': import_json(DATA_URL),
    }
    char_id = convert_id(CHAR_NAME)
    # char_id = 'traveler_pyro'
    result = []

    tpl_char = getattr(talents, f'char_{char_id}', None)
    # if not tpl_char:
    #     return

    for talent_eng, talent_rus in zip(data['eng']['BattleSkills'], data['rus']['BattleSkills']):
        # if talent_eng['type'] not in (0, 1):
        #     continue
        skill_name = talent_eng['Name'].replace('Normal Attack: ', '')
        skill_id = char_id + '_' + convert_id(skill_name)
        # skill_id = char_id + '_' + convert_id(skill_name, removeSemicolon=True)

        res_item1 = OrderedDict(category='talent_name', name=skill_id)
        res_item2 = OrderedDict(category='talent_descr', name=skill_id)

        for lang_name, talent_data in zip(('rus', 'eng'), (talent_rus, talent_eng)):
            skill_name = talent_data['Name'].replace('ЪЪЪ', '').replace('Normal Attack: ', '')
            skill_descr = talent_data['Desc'].replace('ЪЪЪ', '')
            skill_descr = skill_descr.replace('<link>', "")
            skill_descr = skill_descr.replace('</link>', "")
            skill_descr = patterns_eng.process(skill_descr)

            res_item1[lang_name] = skill_name
            res_item2[lang_name] = skill_descr

        result.append(res_item1)
        result.append(res_item2)

    list_eng = data['eng']['PassiveSkills'] + data['eng']['Constellations']
    list_rus = data['rus']['PassiveSkills'] + data['rus']['Constellations']

    for talent_eng, talent_rus in zip(list_eng, list_rus):
        skill_name = talent_eng['Name']
        skill_short_id = convert_id(skill_name, removeSemicolon=True)
        skill_id = char_id + '_' + skill_short_id

        res_item1 = OrderedDict(category='talent_name', name=skill_id)
        descItems = {}

        for lang_name, talent_data in zip(('rus', 'eng'), (talent_rus, talent_eng)):
            skill_name = talent_data['Name'].replace('ЪЪЪ', '')
            res_item1[lang_name] = skill_name

            if talent_data['Desc'] and talent_eng.get('Level') not in (3, 5):
                skill_descr = talent_data['Desc'].replace('ЪЪЪ', '')

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

        if descItems:
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

    link_num = 0
    for talent_eng, talent_rus in zip(data['eng'].get('HyperLinks', []), data['rus'].get('HyperLinks', [])):
        link_num += 1
        skill_name = talent_eng['Name']
        skill_id = "n%s%04d" % (LINK_ID, link_num)

        res_item1 = OrderedDict(category='talent_name', name=skill_id)
        res_item2 = OrderedDict(category='talent_descr', name=skill_id)

        for lang_name, talent_data in zip(('rus', 'eng'), (talent_rus, talent_eng)):
            skill_name = talent_data['Name'].replace('ЪЪЪ', '').replace('Normal Attack: ', '')
            skill_descr = talent_data['Desc'].replace('ЪЪЪ', '')
            skill_descr = skill_descr.replace('<link>', "")
            skill_descr = skill_descr.replace('</link>', "")
            skill_descr = patterns_eng.process(skill_descr)

            res_item1[lang_name] = skill_name
            res_item2[lang_name] = skill_descr

        result.append(res_item1)
        result.append(res_item2)

    CsvDumper().dump(result, 'exported.csv')


import_char()
