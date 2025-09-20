from ...template import Template, TemplateList


char_collei = TemplateList(
    default_rus=Template(
        names=[
            'Коллеи',
            'Цветочного кольца', 'Цветочное кольцо', 'Росток', 'Ростком', 'Ростка', 'Сметающие цветы',
            'Куйлейн-Анбара', 'Кошачьего сокровища', 'Возвращение цветов',
        ],
        skills={
            'skill': ['Сметающие цветы', 'Сметающих цветов'],
            'burst': ['Кошачьего сокровища'],
        },
    ),
    default_eng=Template(
        names=[
            'Collei',
            'Floral Ring', 'Sprout', 'Floral Brush', 'Floral Ring',
            'Cuilein-Anbar', 'Trump-Card Kitty', 'Floral Sidewinder', 'Trump-Card Kitty',
        ],
        skills={
            'skill': ['Floral Brush'],
            'burst': ['Trump-Card Kitty'],
        },
    ),
    floral_sidewinder_rus=Template(
        sentences=[
            [],
            ['text_percent'],
            ['ignore'],
            [],
        ],
    ),
    floral_sidewinder_eng=Template(
        sentences=[
            ['text_percent', 'ignore'],
            [],
        ],
    ),
    the_languid_wood=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    deepwood_patrol=Template(
        sentences=[
            ['recharge'],
        ],
    ),
    through_hill_and_copse_rus=Template(
        sentences=[
            ['text_percent'],
            ['ignore', 'ignore'],
            [],
            [],
        ],
    ),
    through_hill_and_copse_eng=Template(
        sentences=[
            ['text_percent', 'ignore', 'ignore'],
            [],
            [],
        ],
    ),
    gift_of_the_woods=Template(
        sentences=[
            ['text_value', 'ignore'],
        ],
    ),
    forest_of_falling_arrows=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
)
