import json
from lib.genshin.datafiles.lang import LangData
from lib.genshin.datafiles.weapons import IGNORED_WEAPONS, WeaponData, WeaponSkillData, WeaponPromoteData
from lib.genshin.strings.templates.names import names_eng, names_rus, keywords_eng, keywords_rus, color_patterns


weapon_data = WeaponData()
weapon_skill_data = WeaponSkillData()
weapon_promote_data = WeaponPromoteData()

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'patterns': color_patterns,
        'names': names_rus,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
        'patterns': color_patterns,
        'names': names_eng,
        'keywords': keywords_eng,
    },
}

curve_value = {
    'GROW_CURVE_ATTACK_101': 7.346,
    'GROW_CURVE_ATTACK_102': 8.314,
    'GROW_CURVE_ATTACK_103': 9.229,
    'GROW_CURVE_ATTACK_104': 6.320,
    'GROW_CURVE_ATTACK_105': 5.229,
    'GROW_CURVE_ATTACK_201': 8.349,
    'GROW_CURVE_ATTACK_202': 9.356,
    'GROW_CURVE_ATTACK_203': 10.305,
    'GROW_CURVE_ATTACK_204': 7.275,
    'GROW_CURVE_ATTACK_205': 6.130,
    'GROW_CURVE_ATTACK_301': 9.173,
    'GROW_CURVE_ATTACK_302': 10.258,
    'GROW_CURVE_ATTACK_303': 11.272,
    'GROW_CURVE_ATTACK_304': 8.010,
    'GROW_CURVE_ATTACK_305': 6.760,
    'GROW_CURVE_CRITICAL_101': 4.594,
    'GROW_CURVE_CRITICAL_201': 4.594,
    'GROW_CURVE_CRITICAL_301': 4.594,
}


stat_info = {
    # 'FIGHT_PROP_BASE_HP': {
    #     'name': 'hp_base',
    # },
    # 'FIGHT_PROP_HP': {
    #     'name': 'hp',
    # },
    'FIGHT_PROP_HP_PERCENT': {
        'name': 'HP',
        'scale': 100,
    },
    # 'FIGHT_PROP_BASE_DEFENSE': {
    #     'name': 'def_base',
    # },
    # 'FIGHT_PROP_DEFENSE': {
    #     'name': 'def',
    # },
    'FIGHT_PROP_DEFENSE_PERCENT': {
        'name': 'Защита',
        'scale': 100,
    },
    'FIGHT_PROP_BASE_ATTACK': {
        'name': 'Базовая атака',
    },
    # 'FIGHT_PROP_ATTACK': {
    #     'name': 'atk',
    # },
    'FIGHT_PROP_ATTACK_PERCENT': {
        'name': 'Сила атаки',
        'scale': 100,
    },
    'FIGHT_PROP_CRITICAL': {
        'name': 'Шанс крит. попадания',
        'scale': 100,
    },
    'FIGHT_PROP_CRITICAL_HURT': {
        'name': 'Крит. урон',
        'scale': 100,
    },
    'FIGHT_PROP_ELEMENT_MASTERY': {
        'name': 'Мастерство стихий',
    },
    'FIGHT_PROP_CHARGE_EFFICIENCY': {
        'name': 'Восст. энергии',
        'scale': 100,
    },
    # 'FIGHT_PROP_ICE_ADD_HURT': {
    #     'name': 'dmg_cryo_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_WATER_ADD_HURT': {
    #     'name': 'dmg_hydro_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_ROCK_ADD_HURT': {
    #     'name': 'dmg_geo_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_FIRE_ADD_HURT': {
    #     'name': 'dmg_pyro_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_FIRE_SUB_HURT': {
    #     'name': 'dmg_pyro',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_WIND_ADD_HURT': {
    #     'name': 'dmg_anemo_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_WIND_SUB_HURT': {
    #     'name': 'dmg_anemo',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_ELEC_ADD_HURT': {
    #     'name': 'dmg_electro_base',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_ELEC_SUB_HURT': {
    #     'name': 'dmg_electro',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_GRASS_ADD_HURT': {
    #     'name': 'dmg_dendro_base',
    #     'scale': 100,
    # },
    'FIGHT_PROP_PHYSICAL_ADD_HURT': {
        'name': 'Бонус физ. урона',
        'scale': 100,
    },
    # 'FIGHT_PROP_PHYSICAL_SUB_HURT': {
    #     'name': 'dmg_phys',
    #     'scale': 100,
    # },
    # 'FIGHT_PROP_HEAL_ADD': {
    #     'name': 'healing_base',
    #     'scale': 100,
    # },
}


def shift_number(text: str):
    if not text:
        return ('', '')
    result = ''

    if text[0] in '01234567890.,':
        while text and text[0] in '01234567890.,':
            result += text[0]
            text = text[1:]
    else:
        while text and text[0] not in '01234567890.,':
            result += text[0]
            text = text[1:]

    return result, text


def prepare_string(text):
    text = text.replace('Тысячелетняя симфония: Гимн знамени', '«Тысячелетняя симфония: Гимн знамени»')
    text = text.replace('««Тысячелетняя симфония: Гимн знамени»»', '«Тысячелетняя симфония: Гимн знамени»')
    text = text.replace('уровней Уловки', 'уровня Уловки')
    text = text.replace('Уровни Звезды полярной ночи', 'Уровни эффекта Звезда полярной ночи')
    text = text.replace(', рассчитываются по отдельности', ', существуют независимо')
    text = text.replace('Эффекты действуют независимо друг от друга. Каждый из эффектов длится 10 сек.', 'Эти эффекты действуют независимо друг от друга. Каждый из эффектов длится 10 сек.')
    text = text.replace('Продолжительность действия каждой эмблема рассчитывается индивидуально.', 'Продолжительность действия каждого уровня эмблемы рассчитывается индивидуально.')
    text = text.replace('даже когда персонаж не находится на поле.', 'даже когда персонаж не находится на поле боя.')
    text = text.replace('</color> урона. Может возникнуть не чаще 1 раза за 10 сек.', '</color> урона. Может возникнуть раз в 10 сек.')
    text = text.replace('Увеличивает бонус лечения на <color=#99FFFFFF>20%</color>, также', 'Увеличивает бонус лечения на <color=#99FFFFFF>10%</color>, а также')
    text = text.replace('Нанесённый Элементальный урон увеличивает весь урон н', 'Нанесённый элементальный урон увеличивает весь наносимый урон н')
    text = text.replace('Нанесённый элементальный урон увеличивает весь урон н', 'Нанесённый элементальный урон увеличивает весь наносимый урон н')
    text = text.replace('Может складываться до 2 раз. Может возникнуть раз в 1 сек.', 'Эффект может складываться до 2 раз. Может возникнуть не чаще 1 раза за 1 сек.')
    text = text.replace('</color> на 6 сек. Эффект может', '</color> в течение 6 сек. Эффект может')
    return text


def merge_descr(orig_str1, orig_str2):
    str1 = prepare_string(orig_str1)
    str2 = prepare_string(orig_str2)

    result = ''
    while len(str1) or len(str2):
        (part1, str1) = shift_number(str1)
        (part2, str2) = shift_number(str2)

        if part1 == part2:
            result += part1
        elif not part1 and not part2:
            break
        else:
            if len(part1) > 5:
                print([orig_str1, orig_str2])
            result += f'{part1}-{part2}'
    return result


lang_eng = lang_data['eng']['lang']
lang_rus = lang_data['rus']['lang']
result = []

for weapon in weapon_data.get_list():
    if weapon['id'] in IGNORED_WEAPONS:
        continue

    rank = weapon.get('rankLevel', 0)
    if rank < 3:
        continue

    item = {
        'name': lang_rus.get(weapon['nameTextMapHash']),
        'type': weapon['weaponType'],
        'rarity': rank,
        'icon': weapon['icon'],
    }

    promote_list = weapon_promote_data.get_list_by_field('weaponPromoteId', weapon['weaponPromoteId'])[-1]['addProps']
    promote = {}
    for prom_item in promote_list:
        promote[prom_item['propType']] = prom_item.get('value', 0)

    for num, prop in enumerate(weapon['weaponProp']):
        stat = stat_info.get(prop['propType'])
        if not stat:
            print(prop['propType'])
        scale = curve_value[prop['type']]
        multi = stat.get('scale', 1)

        value = multi * (prop['initValue'] * scale + promote.get(prop['propType'], 0))
        if multi > 1:
            formatted = '%.1f%%' % value
        else:
            formatted = '%d' % value

        item[f'stat_{num + 1}_name'] = stat['name']
        item[f'stat_{num + 1}_value'] = formatted

    for id in weapon['skillAffix']:
        if not id:
            continue

        skills = weapon_skill_data.get_list_by_field('id', id)

        item['talent_name'] = lang_rus.get(skills[0]['nameTextMapHash'])
        if len(skills) > 1:
            item['talent_desc'] = merge_descr(
                lang_rus.get(skills[0]['descTextMapHash']),
                lang_rus.get(skills[4]['descTextMapHash']),
            )
        else:
            item['talent_desc'] = lang_rus.get(skills[0]['descTextMapHash'])
    result.append(item)

print(json.dumps(result, ensure_ascii=False, indent=4))
