from ...template import Template, TemplateList


char_lisa = TemplateList(
    default_rus=Template(
        names=[
            'Лиза', 'Лизу', 'Лизы',
            'Проводник', 'ударов молнии',
        ],
        skills={
            'skill': ['Пурпурная дуга'],
            'burst': ['Громовая роза'],
        },
    ),
    default_eng=Template(
        names=[
            'Lisa',
            'Conductive', 'lightning bolts',
        ],
        skills={
            'skill': ['Violet Arc'],
            'burst': ['Lightning Rose'],
        },
    ),
    induced_aftershock=Template(
        sentences=[
            [],
        ],
    ),
    static_electricity_field=Template(
        names=['защиту'],
        sentences=[
            ['enemy_def_reduce', 'ignore'],
        ],
    ),
    infinite_circuit=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    electromagnetic_field=Template(
        names=['защиту'],
        sentences=[
            ['def_percent'],
        ],
    ),
    plasma_eruption=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    pulsating_witch=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
)
