from ..template import Template


berserker_4 = Template(
    sentences=[
        ['crit_rate', None],
    ]
)

adventurer_2 = Template(
    sentences=[
        [],
        ['hp'],
    ]
)

crimson_witch_of_flames_4 = Template(
    sentences=[
        ['dmg_reaction_overloaded', 'dmg_reaction_vaporize'],
        ['ignore', None, 'ignore'],
        ['ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

thundering_fury_4 = Template(
    sentences=[
        ['dmg_reaction_overloaded'],
        ['dmg_reaction_aggravate'],
        ['ignore'],
        ['ignore'],
    ]
)

bloodstained_chivalry_4 = Template(
    sentences=[
        ['dmg_charged', 'ignore'],
    ]
)

tenacity_of_the_millelith_4 = Template(
    sentences=[
        ['text_percent2', 'text_percent'],
        ['ignore', 'ignore', 'ignore'],
        [],
    ]
)

husk_of_opulent_dreams_4 = Template(
    names=['Любопытства', 'Любопытство', 'защите'],
    sentences=[
        ['ignore', 'ignore', 'ignore'],
        ['ignore'],
        ['ignore', None, None],
        ['ignore', 'ignore'],
    ],
)

ocean_hued_clam_4 = Template(
    replace={'30 000': '30,000'},
    names=['Пузырь морских красок', 'Пузырь', 'Пузыря морских красок'],
    sentences=[
        ['ignore'],
        [],
        [],
        [None],
        [None],
        ['ignore'],
        [],
        [],
    ],
)

pale_flame_4 = Template(
    names=['атака'],
    sentences=[
        ['atk_percent', 'ignore'],
        ['ignore', 'ignore', 'ignore'],
        ['ignore', 'ignore', None],
    ]
)

vermillion_hereafter_4 = Template(
    names=['Сила атаки', 'Скрытое сияние'],
    sentences=[
        ['ignore', 'atk_percent'],
        ['atk_percent'],
        ['ignore', 'ignore'],
        [],
        [],
    ],
    results=[
        [0],
        [1, 2, 3, 4],
    ],
)

gilded_dreams_4 = Template(
    replace={
        'следующие усиления: сила': ' усиления. Cила',
        'персонажа; мастерство': 'персонажа. Мастерство',
        'как у экипированного персонажа.': 'как у экипированного персонажа (%{text_value}).',
        'с иным элементом.': 'с иным элементом (%{text_value2}).',
    },
    sentences=[
        ['8:ignore'],
        ['14:text_percent'],
        ['50:text_value'],
        ['3:ignore'],
        ['8:ignore'],
        [],
    ],
    results=[
        [0, 3, 4],
        [1],
        [2],
    ],
)

desert_pavilion_chronicle_4 = Template(
    sentences=[
        ['ignore', 'atk_speed_normal', 'dmg_normal'],
    ],
)

flower_of_paradise_lost_4 = Template(
    sentences=[
        ['dmg_reaction_bloom'],
        ['ignore'],
        ['ignore'],
        ['ignore', 'ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

nighttime_whispers_in_the_echoing_woods_4 = Template(
    sentences=[
        ['10:ignore', '20:dmg_geo'],
        ['150:ignore'],
        ['1:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

nymphs_dream_4 = Template(
    sentences=[
        ['8:ignore', '1:ignore'],
        ['1:ignore', '2:ignore', '3:ignore', None, None, None, None, None, None],
        [],
    ],
)

song_of_days_past_4 = Template(
    replace={
        '15 000': '15000',
    },
    sentences=[
        ['6:ignore'],
        ['8:text_percent_dmg'],
        ['5:ignore', '10:ignore'],
        ['15000:text_value_hp'],
        [],
        [],
        [],
    ],
)

obsidian_codex_4 = Template(
    sentences=[
        ['1:ignore', "40:crit_rate", '6:ignore'],
        ['1:ignore'],
    ],
)

scroll_of_the_hero_of_cinder_city_4 = Template(
    sentences=[
        ['12:text_percent', '15:ignore'],
        ['28:text_percent', '20:ignore'],
        [],
        [],
    ],
    results=[
        [0, 2, 3],
        [1, 2, 3],
    ]
)

finale_of_the_deep_galleries_4 = Template(
    sentences=[
        ['0:ignore', '60:text_percent'],
        ['6:ignore'],
        ['6:ignore'],
        [],
    ],
)

long_nights_oath_4 = Template(
    sentences=[
        ['1:ignore', '2:ignore', '2:ignore'],
        ['1:ignore'],
        ['15:dmg_plunge'],
        ['6:ignore', '5:ignore'],
        [],
    ],
)
