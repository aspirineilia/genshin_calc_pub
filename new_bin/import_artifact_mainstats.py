from lib.genshin.datafiles.artifacts import ArtifactMainstatData

TYPES_TO_STATS = {
    'FIGHT_PROP_HP': 'hp',
    'FIGHT_PROP_ATTACK': 'atk',
    'FIGHT_PROP_ATTACK_PERCENT': 'atk_percent',
    'FIGHT_PROP_DEFENSE_PERCENT': 'def_percent',
    'FIGHT_PROP_HP_PERCENT': 'hp_percent',
    'FIGHT_PROP_ELEMENT_MASTERY': 'mastery',
    'FIGHT_PROP_CHARGE_EFFICIENCY': 'recharge',
    'FIGHT_PROP_HEAL_ADD': 'healing',
    'FIGHT_PROP_CRITICAL': 'crit_rate',
    'FIGHT_PROP_CRITICAL_HURT': 'crit_dmg',
    'FIGHT_PROP_PHYSICAL_ADD_HURT': 'dmg_phys',
    'FIGHT_PROP_ELEC_ADD_HURT': 'dmg_electro',
    'FIGHT_PROP_WIND_ADD_HURT': 'dmg_anemo',
    'FIGHT_PROP_ROCK_ADD_HURT': 'dmg_geo',
    'FIGHT_PROP_FIRE_ADD_HURT': 'dmg_pyro',
    'FIGHT_PROP_ICE_ADD_HURT': 'dmg_cryo',
    'FIGHT_PROP_WATER_ADD_HURT': 'dmg_hydro',
    'FIGHT_PROP_GRASS_ADD_HURT': 'dmg_dendro',
}

NORMAL_STATS = ['hp', 'atk', 'mastery']
MAX_LEVEL = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
}

stats = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
}

for item in ArtifactMainstatData().data:
    rank = item.get('rank')
    if not rank:
        continue

    level = item['level'] - 1
    max_level = MAX_LEVEL[rank]
    if level > max_level:
        continue

    for data in item['addProps']:
        stat = TYPES_TO_STATS.get(data['propType'])
        if stat not in stats[rank]:
            stats[rank][stat] = []
        value = data['value']
        if stat not in NORMAL_STATS:
            value = round(value * 1000) / 10
        stats[rank][stat].append(str(value))

for stat in TYPES_TO_STATS.values():
    print(stat)
    for rank in stats.keys():
        data = stats[rank][stat]
        print('new StatTableArtifact([' + ', '.join(data) + ']),')
