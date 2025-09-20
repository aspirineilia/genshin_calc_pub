import json
import os
import re

import static  # noqa
from char_common import parse_scales, parse_skills

dirname = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')
out_dir = os.path.join(dirname, '../../src/js/db/generated/')


def parse_curves():
    file = open(data_dir + 'AvatarCurveExcelConfigData.json', 'r')
    out = open(out_dir + 'CharScale.js', 'w', encoding='utf-8')
    curves = {}

    for item in json.load(file):
        level = item['level']

        for info in item['curveInfos']:
            if not info['type'] in curves:
                curves[info['type']] = {}

            curves[info['type']][level] = '%.3f' % (info['value'])

    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n\n')
    out.write("export const charScales = {\n")

    for curve_name in curves:
        stat_name = static.getCurveName(curve_name)
        values = list(curves[curve_name].values())

        out.write("\t%s: new StatTable('', [" % (stat_name))
        out.write(", ".join(values))
        out.write("]),\n")

    out.write("};\n")
    out.close()

    return curves


def parse_ascension():
    file = open(data_dir + 'AvatarPromoteExcelConfigData.json', 'r')
    table = {}
    result = {}

    for item in json.load(file):
        values = {}
        level = item.get('promoteLevel', 0)

        for prop in item['addProps']:
            type = prop.get('propType')

            values[static.getStatByName(type)] = static.getStatValue(type, prop.get('value', 0))

        if not item['avatarPromoteId'] in table:
            table[item['avatarPromoteId']] = {}
        table[item['avatarPromoteId']][level] = values

    for id in table:
        result[id] = {}
        first = table[id][0]
        for stat in first:
            result[id][stat] = []

            for level in range(1, 7):
                item = table[id].get(level)
                if item:
                    result[id][stat].append(item.get(stat))
                else:
                    result[id][stat].append(0)

    return result


def parse_cost():
    file = open(data_dir + '/AvatarSkillExcelConfigData.json', 'r')
    result = {}

    for item in json.load(file):
        cost = item.get('costElemVal')
        if cost:
            result[item['id']] = cost

    return result


def parse_burst():
    file = open(data_dir + 'AvatarSkillDepotExcelConfigData.json', 'r')
    result = {}

    for item in json.load(file):
        id = item.get('energySkill')
        if id:
            result[item['id']] = id

    return result


def parse_chars():
    file = open(data_dir + 'AvatarExcelConfigData.json', 'r')
    out = open(out_dir + 'CharTables.js', 'w', encoding='utf-8')

    result = []

    ascensions = parse_ascension()
    costs = parse_cost()
    skills = parse_burst()

    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n')
    out.write('import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";\n')
    out.write('import { charScales } from "./CharScale";\n\n')
    out.write('export const charTables = {\n')

    for item in json.load(file):
        charId = item['id']
        charName = static.getCharById(charId)
        if not charName:
            continue

        out.write('\t' + charName + ': [\n')

        values = {
            'hp_base':  static.trimValue(item["hpBase"]),
            'atk_base': static.trimValue(item["attackBase"]),
            'def_base': static.trimValue(item["defenseBase"]),
            'recharge_base': 100,
            'crit_rate_base': 5,
            'crit_dmg_base': 50,
        }

        burst_id = skills.get(item.get('skillDepotId'))
        if burst_id:
            burst_cost = costs.get(burst_id)
            if burst_cost:
                values['burst_energy_cost'] = static.trimValue(burst_cost)

        # stamina = static.getStaminaCost(item.get('weaponType'))
        stamina = parse_stamina_cost(item)

        if stamina:
            values['charged_stamina_cost'] = stamina

        grows = {}
        ascension = ascensions.get(item.get('avatarPromoteId'), {})

        # SkillDepotId

        for grow in item.get('propGrowCurves', []):
            stat = static.getStatByName(grow.get('type'))
            grows[stat] = static.getCurveName(grow.get('growCurve'))

        stats = set(values.keys())
        stats = stats.union(list(ascension.keys()))

        for stat in sorted(stats):
            out.write("\t\tnew StatTableAscensionScale({\n")
            out.write("\t\t\tstat: '%s',\n" % (stat))
            out.write("\t\t\tbase: %s,\n" % (values.get(stat, 0)))

            if stat in ascension:
                out.write("\t\t\tascension: new StatTable('', [" + ', '.join(ascension[stat]) + "]),\n")

            if stat in grows:
                out.write("\t\t\tscale: charScales." + grows[stat] + ",\n")
            out.write("\t\t}),\n")

        out.write("\t],\n")

    out.write("};\n")
    return result


def parse_stamina_cost(char):
    depotIds = char.get('candSkillDepotIds', [])
    depotIds.append(char.get('skillDepotId'))

    for depot_id in depotIds:
        skillsIds = skills.get(depot_id)
        for id in sorted(skillsIds):
            scale = scales.get(id)
            st = find_stamina_cost(scale)
            if st is not None:
                return int(st)


def find_stamina_cost(scale):
    for desc in scale['desc']:
        if not desc:
            continue
        if 'Charged Attack Stamina Cost' in desc or 'Saichimonji Slash Stamina' in desc:
            m = re.search(r'param(\d+)', desc)
            return scale['levels'][1][int(m[1]) - 1]


scales = parse_scales()
skills, groupmap = parse_skills()

parse_curves()
parse_chars()
