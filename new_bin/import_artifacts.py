from collections import OrderedDict

from lib.genshin.datafiles.lang import LangData
from lib.genshin.datafiles.artifacts import ArtifactPieceBonusesData, ArtifactSetData
from lib.genshin.utils import convert_id
from lib.genshin.strings.templates import artifacts_eng, artifacts_rus
from lib.genshin.strings.templates.names import names_eng, names_rus, keywords_eng, keywords_rus
from lib.genshin.strings.csv import CsvDumper

IGNORED_SETS = [215004, 215012]

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'art_tpl': artifacts_rus,
        'piece': {
            1: '1 предмет',
            2: '2 предмета',
            4: '4 предмета',
        },
        'names': names_rus,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
        'art_tpl': artifacts_eng,
        'piece': {
            1: '1-Piece bonus',
            2: '2-Piece bonus',
            4: '4-Piece bonus',
        },
        'names': names_eng,
        'keywords': keywords_eng,
    },
}

sets = ArtifactSetData()
sets_bonuses = ArtifactPieceBonusesData()

result = []
set_data = {}
set_names = []


for set in sets.get_list():
    affix_id = set.get('equipAffixId')
    if not affix_id:
        continue
    if affix_id in IGNORED_SETS:
        continue

    bonuses = sets_bonuses.bonuses_list(affix_id)
    pieces = set.get('setNeedNum', [])
    if len(pieces) != len(bonuses):
        print(f'Pieces and Bonuses mismatch for affix {affix_id}')
        break

    set_name = lang_data['eng']['lang'].get(bonuses[0]['nameTextMapHash'])
    set_id = convert_id(set_name)
    set_data[set_id] = {
        'bonuses': bonuses,
        'pieces': pieces,
    }

    set_name_item = OrderedDict(
        category='artifact_set',
        name=set_id,
    )
    for lang_name in lang_data:
        lang = lang_data[lang_name]['lang']
        set_name_item[lang_name] = lang.get(bonuses[0]['nameTextMapHash'])
    set_names.append(set_name_item)

for set_id in sorted(set_data.keys()):
    # print(set_id)
    bonuses = set_data[set_id]['bonuses']
    pieces = set_data[set_id]['pieces']

    for (cnt, bonus) in zip(pieces, bonuses):
        setnb = f'{set_id}_{cnt}'
        res_item = OrderedDict(
            category='set_bonus',
            name=setnb,
        )
        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            pstr = lang_data[lang_name]['piece']
            value = lang.get(bonus['nameTextMapHash'])
            res_item[lang_name] = f'{value} ({pstr[cnt]})'

        result.append(res_item)

        res_lang = {
            'rus': [],
            'eng': [],
        }
        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            artifacts = lang_data[lang_name]['art_tpl']

            tpl_name = f'{set_id}_{cnt}'
            descr = lang.get(bonus['descTextMapHash'])

            tpl_art = getattr(artifacts, tpl_name, None) or getattr(lang_data['eng']['art_tpl'], tpl_name)
            tpl_names = lang_data[lang_name]['names']
            tpl_keywords = lang_data[lang_name]['keywords']

            tpl_result = tpl_art.process(descr)
            if not isinstance(tpl_result, list):
                tpl_result = [tpl_result]

            for item in tpl_result:
                if tpl_keywords:
                    item = tpl_keywords.process(item)
                if tpl_names:
                    item = tpl_names.process(item)
                res_lang[lang_name].append(item)

        index = 0
        for (rus, eng) in zip(res_lang['rus'], res_lang['eng']):
            index += 1
            namei = setnb
            if len(res_lang['rus']) > 1:
                namei = f'{setnb}_{index}'
            result.append(
                OrderedDict(
                    category='set_descr',
                    name=namei,
                    rus=rus,
                    eng=eng,
                )
            )

CsvDumper().dump(result, 'artifact_set_bonuses.csv')
CsvDumper().dump(set_names, 'artifact_set_names.csv')
