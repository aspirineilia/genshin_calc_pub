import os
from posixpath import basename

from lib.genshin.utils import convert_id
from lib.genshin.sprite import ImageGenerator, img_out_path

dirname = os.path.dirname(__file__)
img_path = os.path.join(dirname, '../data/images/')
input_files = os.path.join(dirname, '../data/images/enemy/*.png')
input_dir = os.path.join(dirname, '../data/images/enemy/')

items = {}
images = {}

for dir_name, subdirs, files in os.walk(input_dir):
    section = convert_id(basename(dir_name))
    if not section:
        continue

    items[section] = []
    images[section] = []

    try:
        os.mkdir(img_out_path + '/enemies/' + section)
    except FileExistsError:
        pass

    for file in files:
        base = basename(file)[:-4]
        base = base.replace('UI_MonsterIcon_', '')
        base = base.replace('UI_AnimalIcon_', '')
        item_id = convert_id(base).replace('_', '-')

        items[section].append(f'type-{section}.enemy-icon-{item_id}')
        images[section].append(dir_name + '/' + file)

for section in items.keys():
    image_gen = ImageGenerator(
        items=items[section],
        images=images[section],
        pack_name=f'enemies/{section}',
    )

    rules = [
        {'size': 24, 'class': f'type-{section}.sprite-enemy.sprite-24'},
        {'size': 60, 'class': f'type-{section}.sprite-enemy.sprite-60'},
    ]

    image_gen.generate_individual((80, 80))

    for rule in rules:
        image_gen.generate_sprite(
            prefix=f'enemy_{section}_',
            sprite_class=rule['class'],
            size=(rule['size'], rule['size']),
        )

    image_gen.save()
