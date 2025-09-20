import json
import os
import static # type: ignore

dirname  = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')
out_dir  = os.path.join(dirname, '../../src/js/db/generated/')

MAX_LEVEL = 90

def split_list(data):
    result = []
    accum = []

    while len(data):
        if len(accum) >= 10:
            result.append(accum)
            accum = []

        accum.append(data.pop(0))

    if len(accum):
        result.append(accum)

    return result

def parse_curves():
    file   = open(data_dir + 'ElementCoeffExcelConfigData.json', 'r')
    out    = open(out_dir + 'ElementScale.js', 'w', encoding='utf-8')
    curves = {
        'reaction': {},
        'shield': {},
    }

    for item in json.load(file):
        level = item.get('Level')
        if not level: continue
        if level > MAX_LEVEL: continue

        curves['reaction'][level] = static.trimValue(item['PlayerElementLevelCo'])
        curves['shield']  [level] = static.trimValue(item['PlayerShieldLevelCo'])

    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n\n')


    damage = [curves['reaction'][lvl] for lvl in sorted(curves['reaction'].keys())]
    shiled = [curves['shield'][lvl] for lvl in sorted(curves['shield'].keys())]

    out.write("export const reactionDamageValues = new StatTable('', [\n")
    for portion in split_list(damage):
        out.write("\t" + ", ".join(portion) + ",\n")
    out.write("]);\n\n")

    out.write("export const reactionShieldValues = new StatTable('', [\n")
    for portion in split_list(shiled):
        out.write("\t" + ", ".join(portion) + ",\n")
    out.write("]);\n")

    out.close()

    return curves

parse_curves()
