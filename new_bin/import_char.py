import re
from collections import OrderedDict

from lib.genshin.datafiles.char import CharData, CharProudSkillData, CharSkillData, CharSkillDepotData, SKIP_CHARACTERS, CharTalentSkillData
from lib.genshin.datafiles.hyperlinks import HyperLinkData
from lib.genshin.datafiles.lang import LangData
from lib.genshin.strings.templates.names import keywords_eng, keywords_rus, names_eng, names_rus, patterns_eng
from lib.genshin.strings.templates import talents
from lib.genshin.utils import convert_id
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper  # noqa

char_data = CharData()
depot_data = CharSkillDepotData()
char_skill_data = CharSkillData()
talent_data = CharTalentSkillData()
proud_data = CharProudSkillData()
hyperlink_data = HyperLinkData()

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'patterns': patterns_eng,
        'names': names_rus,
        'talents': talents.templates,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
        'patterns': patterns_eng,
        'names': names_eng,
        'talents': talents.templates,
        'keywords': keywords_eng,
    },
}

lang_default = lang_data['eng']['lang']

result_talents = []
result_const = []
result_names = []

char_keys = {}
uniq_skills = {}
texts = {}

traveler_depot_ids = {
    502: 'pyro',
    503: 'hydro',
    504: 'anemo',
    506: 'geo',
    507: 'electro',
    508: 'dendro',
}

def collect_links(txt):
    return re.findall(r'{LINK#N(\d+)}', txt)

for char in char_data.get_list():
    if char['id'] in SKIP_CHARACTERS:
        continue

    if char['id'] in (10000007,):
        continue

    # if char['id'] not in (10000114,):
    #     continue

    char_name = lang_default.get(char['nameTextMapHash'])
    char_id = convert_id(char_name)

    # print([char_id, char['id']])

    depot_ids = char.get('candSkillDepotIds', [])
    if depot_ids:
        for depot_id in depot_ids:
            if depot_id not in traveler_depot_ids.keys():
                continue
            traveler_id = f'{char_id}_{traveler_depot_ids[depot_id]}'
            char_keys[traveler_id] = {
                'char_id': char_id,
                'nameTextMapHash': char['nameTextMapHash'],
                'depot_ids': [depot_id],
            }
    else:
        char_keys[char_id] = {
            'char_id': char_id,
            'nameTextMapHash': char['nameTextMapHash'],
            'depot_ids': [char['skillDepotId']],
        }

for char_key in sorted(char_keys):
    char = char_keys[char_key]
    char_id = char['char_id']
    eng_name = lang_data['eng']['lang'].get(char['nameTextMapHash'])

    res_item = OrderedDict(
        category='char_name',
        name=char_id,
    )
    for lang_name in lang_data:
        lang = lang_data[lang_name]['lang']
        res_item[lang_name] = lang.get(char['nameTextMapHash'])

    result_names.append(res_item)

    tpl_char = getattr(talents, f'char_{char_key}', None)
    # if not tpl_char:
    #     continue

    texts[eng_name] = []

    for depot_id in char['depot_ids']:
        depot = depot_data.get(depot_id)
        if not depot:
            continue
        skill_ids = []
        if depot.get('energySkill'):
            skill_ids.append(depot.get('energySkill'))
        if depot.get('skills'):
            skill_ids.extend(depot.get('skills'))
        # if depot.get('SubSkills'):
        #     skill_ids.extend(depot.get('SubSkills'))

        hyperlinks = set()

        for id in skill_ids:
            if not id:
                continue
            skill = char_skill_data.get(id)
            if not skill:
                continue
            skill_name = lang_default.get(skill['nameTextMapHash'])
            if not skill_name:
                continue
            skill_id = char_id + '_' + convert_id(skill_name, removeSemicolon=True)

            if uniq_skills.get(skill_id):
                continue
            uniq_skills[skill_id] = 1

            res_item1 = OrderedDict(
                category='talent_name',
                name=skill_id,
            )

            res_item2 = OrderedDict(
                category='talent_descr',
                name=skill_id,
            )

            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(skill['nameTextMapHash'])
                skill_descr = lang.get(skill['descTextMapHash'])

                hyperlinks.update(collect_links(skill_descr))

                # tpl_names = lang_data[lang_name]['names']
                # tpl_keywords = lang_data[lang_name]['keywords']
                tpl_patterns = lang_data[lang_name]['patterns']

                skill_name = re.sub(r'^Normal Attack:\s*', '', skill_name)
                skill_descr = tpl_patterns.process(skill_descr)

                res_item1[lang_name] = skill_name
                res_item2[lang_name] = skill_descr

            result_talents.append(res_item1)
            result_talents.append(res_item2)

        talent_items = []
        const_num = 0
        used_passive = 0

        for passive in depot.get('inherentProudSkillOpens', []):
            skip = 1
            if passive.get('needAvatarPromoteLevel'):
                skip = 0
            elif passive.get('proudSkillGroupId') and char_id in ('skirk', 'ineffa'):
                if not used_passive:
                    skip = 0
                    used_passive = 1
            if skip:
                continue

            passive_id = passive.get('proudSkillGroupId')
            proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
            if proud:
                talent_items.append({
                    'nameTextMapHash': proud.get('nameTextMapHash'),
                    'descTextMapHash': proud.get('descTextMapHash'),
                })

        for const_id in depot.get('talents'):
            const_num += 1
            talent = talent_data.get(const_id)
            if not talent:
                continue
            talent_items.append({
                'nameTextMapHash': talent.get('nameTextMapHash'),
                'descTextMapHash': talent.get('descTextMapHash'),
                'no_descr': const_num == 3 or const_num == 5,
            })

        for talent in talent_items:
            talent_name = lang_default.get(talent['nameTextMapHash'])
            if not talent_name:
                continue
            talent_short_id = convert_id(talent_name, removeSemicolon=True)
            talent_id = char_id + '_' + talent_short_id

            if uniq_skills.get(talent_id):
                continue
            uniq_skills[talent_id] = 1

            res_item1 = OrderedDict(
                category='talent_name',
                name=talent_id,
            )

            descItems = {}

            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(talent['nameTextMapHash'])
                res_item1[lang_name] = skill_name

                texts[eng_name].append(skill_name)

                if talent['descTextMapHash']:
                    skill_descr = lang.get(talent['descTextMapHash'])
                    hyperlinks.update(collect_links(skill_descr))
                    texts[eng_name].append(skill_descr)

                    tpl_names = lang_data[lang_name]['names']
                    tpl_keywords = lang_data[lang_name]['keywords']
                    tpl_talents = lang_data[lang_name]['talents']

                    # skill_name = re.sub(r'^.*?:\s*', '', skill_name)
                    skill_descr = tpl_talents.process(skill_descr)
                    skill_descr = tpl_keywords.process(skill_descr)
                    skill_descr = tpl_names.process(skill_descr)
                    if tpl_char:
                        skill_descr = tpl_char.process(lang_name, talent_short_id, skill_descr)

                    if not isinstance(skill_descr, list):
                        skill_descr = [skill_descr]

                    descItems[lang_name] = skill_descr
                texts[eng_name].append('\n')

            if tpl_char:
                result_const.append(res_item1)

                if descItems and not talent.get('no_descr'):
                    index = 0
                    for (rus, eng) in zip(descItems['rus'], descItems['eng']):
                        index += 1
                        namei = talent_id
                        if len(descItems['rus']) > 1:
                            namei = f'{talent_id}_{index}'
                        result_const.append(
                            OrderedDict(
                                category='talent_descr',
                                name=namei,
                                rus=rus,
                                eng=eng,
                            )
                        )

        for hl_id in sorted(hyperlinks):
            hl_item = hyperlink_data.get(int(hl_id))
            skill_id = f'n{hl_id}'

            if hl_item:
                res_item1 = OrderedDict(
                    category='talent_name',
                    name=skill_id,
                )

                res_item2 = OrderedDict(
                    category='talent_descr',
                    name=skill_id,
                )

                for lang_name in lang_data:
                    lang = lang_data[lang_name]['lang']
                    skill_name = lang.get(hl_item['nameTextMapHash'])
                    skill_descr = lang.get(hl_item['descTextMapHash'])

                    tpl_patterns = lang_data[lang_name]['patterns']
                    skill_descr = tpl_patterns.process(skill_descr)

                    res_item1[lang_name] = skill_name
                    res_item2[lang_name] = skill_descr

                result_talents.append(res_item1)
                result_talents.append(res_item2)

CsvDumper().dump(result_talents, 'char_skills.csv')
CsvDumper().dump(result_const, 'char_talents.csv')
CsvDumper().dump(result_names, 'char_names.csv')
CsvDumper().dump(result_names, '../../strings_casino/char_names.csv')
CsvDumper().dump(result_names, '../../strings_draft/char_names.csv')
TextDumper().dump(texts, 'chat_texts.txt')
