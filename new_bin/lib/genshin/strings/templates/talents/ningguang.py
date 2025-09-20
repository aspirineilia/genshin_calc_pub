from ...template import Template, TemplateList


char_ningguang = TemplateList(
    default_rus=Template(
        names=[
            'Нин Гуан',
            'Звёздного нефрита', 'элементальное сопротивление',
        ],
        skills={
            'skill': ['Нефритовую ширму', 'Нефритовой ширмы', 'Нефритовая ширма'],
            'burst': ['Осколки звёзд'],
        },
    ),
    default_eng=Template(
        names=[
            'Ningguang',
            'Star Jades',
        ],
        skills={
            'skill': ['Jade Screen'],
            'burst': ['Starshatter'],
        },
    ),
    backup_plan=Template(
        names=['заряженная атака'],
        sentences=[
            [],
        ],
    ),
    strategic_reserve=Template(
        sentences=[
            ['dmg_geo', 'ignore'],
        ],
    ),
    piercing_fragments=Template(
        names=['обычная атака'],
        sentences=[
            [],
        ],
    ),
    shock_effect=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    exquisite_be_the_jade_outshining_all_beneath=Template(
        sentences=[
            ['res_anemo'],
        ],
    ),
    grandeur_be_the_seven_stars=Template(
        sentences=[
            ['ignore'],
        ],
    ),
)
