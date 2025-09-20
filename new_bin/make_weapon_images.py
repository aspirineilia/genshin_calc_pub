import os

from lib.genshin.datafiles.weapons import IGNORED_WEAPONS, WeaponData
from lib.genshin.datafiles.lang import LangData
from lib.genshin.utils import convert_id
from lib.genshin.sprite import ImageGenerator

dirname = os.path.dirname(__file__)
img_path = os.path.join(dirname, '../data/images/')

weapon_data = WeaponData()
lang = LangData('EN')
weapons = {}
images = {}

weapon_types = {
    'WEAPON_SWORD_ONE_HAND': 'sword',
    'WEAPON_CLAYMORE': 'claymore',
    'WEAPON_POLE': 'polearm',
    'WEAPON_CATALYST': 'catalyst',
    'WEAPON_BOW': 'bow',
}

weapons = {
    'sword': ['weapon-icon-sword-unknown'],
    'claymore': ['weapon-icon-claymore-unknown'],
    'polearm': ['weapon-icon-polearm-unknown'],
    'catalyst': ['weapon-icon-catalyst-unknown'],
    'bow': ['weapon-icon-bow-unknown'],
}
images = {
    'sword': [f'{img_path}chars/UI_Icon_Unknown.png'],
    'claymore': [f'{img_path}chars/UI_Icon_Unknown.png'],
    'polearm': [f'{img_path}chars/UI_Icon_Unknown.png'],
    'catalyst': [f'{img_path}chars/UI_Icon_Unknown.png'],
    'bow': [f'{img_path}chars/UI_Icon_Unknown.png'],
}

for weapon in weapon_data.get_list():
    if weapon['id'] in IGNORED_WEAPONS:
        continue

    rank = weapon.get('rankLevel', 0)
    if rank < 3:
        continue

    weapon_id = convert_id(lang.get(weapon['nameTextMapHash'])).replace('_', '-')
    wtype = weapon_types.get(weapon['weaponType'])
    if wtype not in weapons:
        weapons[wtype] = []
        images[wtype] = []
    weapons[wtype].append(f'weapon-icon-{wtype}-{weapon_id}')
    images[wtype].append(f"{img_path}weapons/{weapon['icon']}.png")


weapons['polearm'].append('weapon-icon-polearm-fractured-halo')
weapons['claymore'].append('weapon-icon-claymore-flame-forged-insight')
images['polearm'].append(f'{img_path}weapons/UI_EquipIcon_Pole_Perdix.png')
images['claymore'].append(f'{img_path}weapons/UI_EquipIcon_Claymore_Polilith.png')

for wtype in weapons:
    image_gen = ImageGenerator(
        items=weapons[wtype],
        images=images[wtype],
        pack_name=f'weapons/{wtype}',
    )

    rules = [
        {'size': 24, 'class': f'sprite-weapon-{wtype}.sprite-24'},
        {'size': 40, 'class': f'sprite-weapon-{wtype}.sprite-40'},
        {'size': 60, 'class': f'sprite-weapon-{wtype}.sprite-60'},
    ]

    image_gen.generate_individual((80, 80))

    for rule in rules:
        image_gen.generate_sprite(
            prefix=f'weapon_{wtype}_',
            sprite_class=rule['class'],
            size=(rule['size'], rule['size']),
        )

    image_gen.save()
