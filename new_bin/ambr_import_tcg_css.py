import requests
import re

DATA_URL = "https://gi.yatta.moe/api/v2/en/gcg"

data = requests.get(DATA_URL).json()['data']['items']
domain = 'draft.aspirine.su'
# domain = 'draft.genshin.test'

def replace_icon(icon):
    icon = icon.replace('UI_Gcg_CardFace_Char_Avatar_', 'UI_Gcg_Char_AvatarIcon_')
    icon = icon.replace('UI_Gcg_CardFace_Char_Monster_', 'UI_Gcg_Char_MonsterIcon_')
    icon = icon.replace('Albedo', 'ALbedo')
    icon = icon.replace('Ambor', 'Amber')
    icon = icon.replace('DeaconFire', 'InvokerDeaconFire')
    icon = icon.replace('Muscleman', 'EremiteOracle')
    icon = icon.replace('FatuusMageice', 'FatuusMageIce')
    icon = icon.replace('Effigyelectric', 'EffigyElectric')
    return icon

for char in sorted(data.values(), key=lambda item: item['name']):
    if char['type'] != 'characterCard':
        continue

    id_name = re.sub(r'[^\w]', '', re.sub(r'\s+', '_', char["name"].lower()))
    clname = id_name.replace('_', '-')
    avatar_icon = replace_icon(char['icon'])
    card_icon = char['icon']

    print(f'.tcg-avatar.char-icon-{clname} {{background-image: url("https://{domain}/images/tcg/{avatar_icon}.png")}}')
    print(f'.tcg-card.char-icon-{clname} {{background-image: url("https://{domain}/images/tcg/{card_icon}.png")}}')


