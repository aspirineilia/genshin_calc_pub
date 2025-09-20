from ...template import Template, TemplateList


char_kaeya = TemplateList(
    default_rus=Template(
        names=[
            'Кэйе', 'Кэйи',
            'Выпад холода',
        ],
        skills={
            'skill': ['Выпад холода'],
            'burst': ['Ледниковый вальс'],
        },
    ),
    default_eng=Template(
        names=[
            'Kaeya',
            'Elemental Particles', 'Glacial Waltz',
        ],
        skills={
            'skill': ['Frostgnaw'],
            'burst': ['Glacial Waltz'],
        },
    ),
    cold_blooded_strike=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    glacial_heart=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    excellent_blood=Template(
        sentences=[
            ['crit_rate_kaeya'],
        ],
    ),
    never_ending_performance_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    never_ending_performance_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    frozen_kiss_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent'],
            ['ignore', 'ignore'],
        ],
    ),
    frozen_kiss_eng=Template(
        sentences=[
            ['ignore', 'text_percent'],
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    glacial_whirlwind_rus=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    glacial_whirlwind_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
)
