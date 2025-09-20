import json
import os
import re
import static # type: ignore

dirname  = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')

# rounded_stats = ['atk', 'hp', 'def', 'mastery']
# stats = ['atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent', 'mastery', 'recharge', 'crit_rate', 'crit_dmg']

def parse_rolls():
    file   = open(data_dir + 'ReliquaryLevelExcelConfigData.json', 'r')
    result = {}

    for item in json.load(file):
        result[item['Level']] = {}

        for prop in item['AddProps']:
            type  = prop['PropType']
            stat  = static.getStatByName(type)
            value = static.getStatValue(type, prop['Value'])

            stat = re.sub(r'_base', '', stat)

            result[item['Level']][stat] = static.trimValue(value)

    print(result)
    return result

parse_rolls()
