from ...template import Template, TemplateList


char_klee = TemplateList(
    default_rus=Template(
        names=[
            'Кли',
            'Взрывную искру', 'Взрывная искра',
        ],
        skills={
            'skill': ['Прыг-скок бомба'],
            'burst': ['Грохот и искры'],
        },
    ),
    default_eng=Template(
        names=[
            'Klee',
            'Explosive Spark',
        ],
        skills={
            'skill': ['Jumpy Dumpty'],
            'burst': ['Sparks \'n\' Splash'],
        },
    ),
    pounding_surprise=Template(
        names=['заряженной атаке'],
        sentences=[
            ['ignore', 'dmg_charged'],
        ],
    ),
    sparkling_burst=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    chained_reactions=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    explosive_frags=Template(
        sentences=[
            ['enemy_def_reduce', 'ignore'],
        ],
    ),
    sparkly_explosion=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    blazing_delight=Template(
        sentences=[
            ['ignore', 'ignore', 'dmg_pyro', 'ignore'],
        ],
    ),
)
