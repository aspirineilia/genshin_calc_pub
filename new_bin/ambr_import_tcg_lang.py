import requests
import re

from collections import OrderedDict
from lib.genshin.strings.csv import CsvDumper

DATA_URL = "https://gi.yatta.moe/api/v2/en/gcg"

data = {
    'rus': requests.get(DATA_URL.replace('/en/', '/ru/')).json()['data']['items'],
    'eng': requests.get(DATA_URL).json()['data']['items'],
}
result = []

for char in sorted(data['eng'].values(), key=lambda item: item['name']):
    if char['type'] != 'characterCard' or 'Char_Avatar' in char['icon']:
        continue
    id_name = re.sub(r'[^\w]', '', re.sub(r'\s+', '_', char["name"].lower()))

    res_item = OrderedDict(
        category='char_name',
        name=id_name,
    )
    for lang_name in data:
        res_item[lang_name] = data[lang_name][str(char['id'])]['name']
    result.append(res_item)


CsvDumper().dump(result, '../../strings_draft/char_tcg.csv')
