import json
import os
import re
from decimal import Decimal
import static # type: ignore

dirname  = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')

rounded_stats = ['atk', 'hp', 'def', 'mastery']

stats = ['atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent', 'mastery', 'recharge', 'crit_rate', 'crit_dmg']

def parse_rolls():
    file   = open(data_dir + 'ReliquaryAffixExcelConfigData.json', 'r')
    result = {}

    for item in json.load(file):
        type = item.get('PropType')
        stat = static.getStatByName(type)
        if not stat:
            continue
        value = static.getStatValue(type, item.get('PropValue', 0))

        id = str(item['DepotId'])
        stat = re.sub(r'_base$', '', stat)

        if not id in result:
            result[id] = {}

        if not stat in result[id]:
            result[id][stat] = []

        result[id][stat].append(value)

    return result

def genAllValuesList(stat, rolls, rarity):
    result = set()
    size = len(rolls)

    for i in range(1, 2 + rarity):
        max = size ** i
        indices = []

        for j in range(max):
            number = j
            item = []

            for k in range(i):
                val = number % size
                item.append(val)
                number = (number - val) // size

            indices.append(item)

        for item in indices:
            s = 0
            for ind in item:
                s += float(rolls[ind])

            result.add(s)

    values = {}

    for i in result:
        num = i + 0.0001 # fix rounding
        if stat in rounded_stats:
            rounded = str(round(num))
        else:
            rounded = str(round(num, 1))

        if not rounded in values:
            values[rounded] = []

        values[rounded].append(i)

    for key in values.keys():
        values[key] = static.trimValue('%.3f' % (sum(values[key]) / len(values[key])))

    return values

result = parse_rolls()

for stat in stats:
    print(stat +': [');
    for rarity in range(1, 6):
        table = result.get('%d01' % rarity)
        print('    ['+ ', '.join(sorted(table.get(stat))) +'],')
    print(']')

for stat in stats:
    print(stat)
    print('preciseValues: [');
    for rarity in range(1, 6):
        table = result.get('%d01' % rarity)
        steps = genAllValuesList(stat, table.get(stat), rarity)

        values_str = []
        for key in steps.keys():
            values_str.append(key +": "+ steps[key])
        print('    {'+ ', '.join(values_str) +'},')
    print('],')
