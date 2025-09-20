from ...template import Template, TemplateList


char_aloy = TemplateList(
    default_rus=Template(
        names=[
            'Элой',
            'Спирали', 'Ледяная пустошь', 'Стремительного льда',
        ],
        skills={
            'skill': ['Ледяная пустошь'],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
            'Aloy',
            'Coil', 'Rushing Ice',
        ],
        skills={
            'skill': ['Frozen Wilds'],
            'burst': [],
        },
    ),
    combat_override=Template(
        sentences=[
            ['text_percent_1', 'text_percent_2'],
            ['ignore'],
        ],
    ),
    strong_strike_rus=Template(
        sentences=[
            ['dmg_cryo'],
            ['text_percent'],
        ],
    ),
    strong_strike_eng=Template(
        sentences=[
            ['dmg_cryo', 'ignore'],
            ['text_percent'],
        ],
    ),
)
