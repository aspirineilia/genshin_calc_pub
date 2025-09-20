import requests
import re

PROPS = {
    'FIGHT_PROP_BASE_HP': 'hp_base',
    'FIGHT_PROP_BASE_ATTACK': 'atk_base',
    'FIGHT_PROP_BASE_DEFENSE': 'def_base',
    'FIGHT_PROP_WIND_ADD_HURT': 'dmg_anemo_base',
    'FIGHT_PROP_CRITICAL': 'crit_rate_base',
    'FIGHT_PROP_CRITICAL_HURT': 'crit_dmg_base',
    'FIGHT_PROP_ATTACK_PERCENT': 'atk_percent',
    'FIGHT_PROP_HP_PERCENT': 'hp_percent',
}

CURVES = {
    'GROW_CURVE_ATTACK_S4': 'charScales.s4atk',
    'GROW_CURVE_HP_S4': 'charScales.s4hp',
    'GROW_CURVE_ATTACK_S5': 'charScales.s5atk',
    'GROW_CURVE_HP_S5': 'charScales.s5hp',
}

ELEMENTS = {
    'WIND': 'anemo',
    'FIRE': 'pyro',
    'ICE': 'cryo',
    'WATER': 'hydro',
    'ROCK': 'geo',
}

WEAPON_TYPES = {
    'WEAPON_SWORD_ONE_HAND': 'sword',
    'WEAPON_CLAYMORE': 'claymore',
    'WEAPON_BOW': 'bow',
    'WEAPON_CATALYST': 'catalyst',
    'WEAPON_POLE': 'polearm',
}

DATA_URL = 'https://api.ambr.top/v2/en/avatar/10000106'


def import_char():
    data = requests.get(DATA_URL).json()['data']

    if 'talent' in data:
        import_talents(data["name"], data['talent'])
    import_base(data)


def import_base(data: dict):
    name = normalize_name(data["name"])

    print(f'export const {data["name"]} = new DbObjectChar({{')
    print(f"    name: '{name}',")
    print("    serializeId: ?,")
    print(f"    gameId: {data['id']},")
    print(f"    iconClass: 'char-icon-{name}',")
    print(f"    rarity: {data['rank']},")
    print(f"    element: '{get_element_by_name(data['element'])}',")
    print(f"    weapon: '{get_weapon_type_by_name(data['weaponType'])}',")
    print("    origin: '',")
    print("    talents: Talents,")

    if 'upgrade' in data:
        import_base_stats(data['upgrade'])

    print("    features: [],")
    print("    conditions: [],")
    print("    postEffects: [],")
    print("    constellation: new DbObjectConstellation([]),")
    print("    partyData: {},")
    print("});")


def import_talents(name: str, data: dict):
    name = name.replace(' ', '')
    print(f'let charTalentTables = {{\n    {name}: {{')

    for index, talent in enumerate([i for i in data.values() if i['type'] in (0, 1)]):
        skill_index = index + 1
        params2descr = {}
        params_tables = {}
        for level in sorted(talent['promote'].values(), key=lambda x: x['level']):
            if not params2descr:
                for descr in level['description']:
                    if not descr:
                        continue
                    (name, params_str) = descr.split('|')

                    name = re.sub(r'\#?{LAYOUT_PC#(.*?)\}', '\\g<1>', name)
                    name = re.sub(r'\#?{.*?}', '', name)
                    params_indices = re.findall(r'param(\d+):(\w+)\b', params_str)
                    for (ind, fmt) in params_indices:
                        ind = int(ind)
                        params2descr[ind] = {
                            'name': name,
                            'format': fmt,
                        }
                        params_tables[ind] = []
            for ind in map(int, params2descr.keys()):
                params_tables[ind].append(level['params'][ind - 1])
        print(f'        s{skill_index}_id: 0,\n        s{skill_index}: {{')
        for ind in params2descr.keys():
            print(f"            // {params2descr[ind]['name']},")
            print(f"            p{ind}: [{', '.join(map(str, format_table(params_tables[ind], params2descr[ind]['format'])))}],")
        print('        },')
    print('    }\n};')


def import_base_stats(data: dict):
    base_stats = {
        'burst_energy_cost': {'base': '??'},
        'crit_dmg_base': {'base': 50},
        'crit_rate_base': {'base': 5},
        'recharge_base': {'base': 100},
    }

    for item in data['prop']:
        stat = get_stat_by_name(item['propType'])
        base_stats[stat] = {
            'base': item['initValue'],
            'curve': get_curve_by_name(item['type']),
        }

    ascension_stats = {}
    for item in sorted(data['promote'], key=lambda i: i['promoteLevel']):
        if 'addProps' not in item:
            continue
        for prop, value in item['addProps'].items():
            stat = get_stat_by_name(prop)
            if stat not in ascension_stats:
                ascension_stats[stat] = [0, 0, 0, 0, 0, 0]
            if re.match(r'^crit_', stat):
                value = value * 100
            ascension_stats[stat][int(item['promoteLevel']) - 1] = value

    print('    statTable: [')
    for stat in set(list(base_stats.keys()) + list(ascension_stats.keys())):
        print('        new StatTableAscensionScale({')
        print(f"            stat: '{stat}',")
        print(f"            base: {base_stats.get(stat, {}).get('base', 0)},")
        if stat in ascension_stats:
            print(f"            ascension: new StatTable('', [{', '.join(map(str, ascension_stats[stat]))}]),")
        if stat in base_stats and 'curve' in base_stats[stat]:
            print(f"            scale: {base_stats[stat]['curve']},")
        print('        }),')
    print('    ],')


def get_stat_by_name(name: str) -> str:
    return PROPS[name]


def get_curve_by_name(name: str) -> str:
    return CURVES[name]


def get_element_by_name(name: str) -> str:
    return ELEMENTS[name.upper()]


def get_weapon_type_by_name(name: str) -> str:
    return WEAPON_TYPES[name]


def normalize_name(name: str) -> str:
    return name.lower().replace(' ', '_')


def format_table(data, fmt):
    isPercent = fmt.find('P') >= 0

    def foramt_value(val):
        if isPercent:
            val *= 100
        return trim_value(val)

    # data = list(map(foramt_value, data))
    data = [foramt_value(x) for x in data]

    return shrink_table(data)


def trim_value(value):
    if not isinstance(value, str):
        value = '%.4f' % (value)
    if value.find('.') >= 0:
        return re.sub(r"\.?0+$", '', value)
    return value


def shrink_table(data):
    last = None
    for index in reversed(range(len(data))):
        val = data[index]

        if last is None:
            last = val
            continue

        if val == last:
            data.pop()
            continue

        break

    return data


import_char()
