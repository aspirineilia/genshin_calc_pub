import requests
import re

DATA_URL = "https://gi.yatta.moe/api/v2/en/gcg"

data = requests.get(DATA_URL).json()['data']['items']

TAGS = {
    'GCG_TAG_ELEMENT_CRYO': ('element', 'cryo'),
    'GCG_TAG_ELEMENT_HYDRO': ('element', 'hydro'),
    'GCG_TAG_ELEMENT_PYRO': ('element', 'pyro'),
    'GCG_TAG_ELEMENT_ELECTRO': ('element', 'electro'),
    'GCG_TAG_ELEMENT_ANEMO': ('element', 'anemo'),
    'GCG_TAG_ELEMENT_GEO': ('element', 'geo'),
    'GCG_TAG_ELEMENT_DENDRO': ('element', 'dendro'),
    'GCG_TAG_WEAPON_BOW': ('weapon', 'bow'),
    'GCG_TAG_WEAPON_SWORD': ('weapon', 'sword'),
    'GCG_TAG_WEAPON_CLAYMORE': ('weapon', 'claymore'),
    'GCG_TAG_WEAPON_POLE': ('weapon', 'polearm'),
    'GCG_TAG_WEAPON_CATALYST': ('weapon', 'catalyst'),
    'GCG_TAG_WEAPON_NONE': ('weapon', 'none'),
    'GCG_TAG_NATION_MONDSTADT': ('origin', 'mondstadt'),
    'GCG_TAG_NATION_LIYUE': ('origin', 'liyue'),
    'GCG_TAG_NATION_INAZUMA': ('origin', 'inazuma'),
    'GCG_TAG_NATION_SUMERU': ('origin', 'sumeru'),
    'GCG_TAG_NATION_FONTAINE': ('origin', 'fontaine'),
    'GCG_TAG_ARKHE_OUSIA': '',
    'GCG_TAG_ARKHE_PNEUMA': '',
    'GCG_TAG_CAMP_FATUI': '',
    'GCG_TAG_CAMP_EREMITE': '',
    'GCG_TAG_CAMP_MONSTER': '',
    'GCG_TAG_CAMP_HILICHURL': '',
    'GCG_TAG_CAMP_SACREAD': '',
}

print('import { DbObjectChar } from "../../../../src/js/classes/DbObject/Char";')
print('import { DbObjectListSerializeChars } from "../../../../src/js/classes/DbObject/List/Serialize/Chars";\n')
print('export const TcgChars = new DbObjectListSerializeChars({')

for char in sorted(data.values(), key=lambda item: item['name']):
    if char['type'] != 'characterCard':
        continue

    id_name = re.sub(r'[^\w]', '', re.sub(r'\s+', '_', char["name"].lower()))
    name = re.sub(r'[^\w]', '', char["name"])

    print(f'    {name}: new DbObjectChar({{')
    print(f"        name: '{id_name}',")
    print(f"        serializeId: {10000 + char['id']},")
    print(f"        gameId: {char['id']},")
    print(f"        hp: {char['props']['GCG_PROP_HP']},")
    print(f"        energy: {char['props']['GCG_PROP_ENERGY']},")
    print(f"        iconClass: 'char-icon-{id_name.replace('_', '-')}',")

    for tag in char['tags'].keys():
        vals = TAGS[tag]
        if not vals:
            continue
        print(f"        {vals[0]}: '{vals[1]}',")

    print("    }),")

print('});')
