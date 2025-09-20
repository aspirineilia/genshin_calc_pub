import json

from lib.genshin.datafiles.lang import LangData
from lib.genshin.datafiles.artifacts import ArtifactPieceBonusesData, ArtifactSetData, ArtifactData


IGNORED_SETS = [215004, 215012]


sets = ArtifactSetData()
sets_bonuses = ArtifactPieceBonusesData()
artifacts = ArtifactData()

lang = LangData('RU')
result = []


def dump(obj):
    print(json.dumps(obj, ensure_ascii=False, indent=4))


for set_data in sets.get_list():
    affix_id = set_data.get('equipAffixId')
    if not affix_id:
        continue
    if affix_id in IGNORED_SETS:
        continue

    # if set_data['setId'] != 15032:
    #     continue

    bonuses = sets_bonuses.bonuses_list(affix_id)
    pieces = set_data.get('setNeedNum', [])

    if len(pieces) != len(bonuses):
        # print(f'Pieces and Bonuses mismatch for affix {affix_id}')
        continue

    item = {
        'name': lang.get(bonuses[0]['nameTextMapHash']),
        'icons': [],
        'rarity': 5,
    }

    # for art in artifacts.get_list_by_field('setId', set_data['setId']):
    for item_id in set_data['containsList']:
        art = artifacts.get(item_id)
        # dump(art)
        # item['rarity'] = max(item['rarity'], (art['maxLevel'] - 1) / 4)
        item['icons'].append(art['icon'])

    for (cnt, bonus) in zip(pieces, bonuses):
        item[f'bonus_{cnt}'] = lang.get(bonus['descTextMapHash'])

    result.append(item)

dump(result)
