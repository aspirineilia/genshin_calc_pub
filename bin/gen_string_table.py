import csv
import glob
import json
import os
import sys

dirname = os.path.dirname(__file__)
input_files = os.path.join(dirname, '../data/strings/**/*.csv')
out_dir = os.path.join(dirname, '../src/js/lang/')
langs = ['eng', 'rus']

packs = [
    {
        'name': 'base',
        'input': os.path.join(dirname, '../data/strings/**/*.csv'),
        'output': os.path.join(dirname, '../src/js/lang/%.js'),
    },
    {
        'name': 'casino',
        'input': os.path.join(dirname, '../data/strings_casino/*.csv'),
        'output': os.path.join(dirname, '../src/js/lang/casino_%.js'),
    },
    {
        'name': 'draft',
        'input': os.path.join(dirname, '../data/strings_draft/*.csv'),
        'output': os.path.join(dirname, '../draft/client/js/lang/%.js'),
    },
]

for pack in packs:
    if pack['name'] not in sys.argv:
        continue
    files = glob.glob(pack['input'])
    items = []

    for filename in files:
        print(filename)
        with open(filename, encoding='utf-8') as csvfile:
            csv_file = csv.DictReader(
                csvfile,
                escapechar='~',
                quotechar='"',
                delimiter=';',
            )
            for row in csv_file:
                items.append(row)

    result = {}
    for lang in langs:
        result[lang] = {}

    for item in items:
        for lang in langs:
            if not item['category'] in result[lang]:
                result[lang][item['category']] = {}

            result[lang][item['category']][item['name']] = item[lang]

    for lang in langs:
        out_name = pack['output'].replace('%', lang)
        f = open(out_name, 'w', encoding='utf-8')
        f.write('window.lang_name = "' + lang + '";\n')
        f.write('window.lang_strings = ')
        f.write(json.dumps(result[lang], sort_keys=True, indent=1, ensure_ascii=False))
        f.close()
