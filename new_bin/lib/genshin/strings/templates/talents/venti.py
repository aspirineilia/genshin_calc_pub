from ...template import Template, TemplateList


char_venti = TemplateList(
    default_rus=Template(
        names=[
            'Венти',
            'физ. сопротивление'
        ],
        skills={
            'attack': ['прицельный выстрел'],
            'skill': ['Небесная поэзия'],
            'burst': ['Великая ода ветру'],
        },
    ),
    default_eng=Template(
        names=[
            'Venti',
            'Physical RES',
        ],
        skills={
            'attack': ['Aimed Shot'],
            'skill': ['Skyward Sonnet'],
            'burst': ['Wind\'s Grand Ode'],
        },
    ),
    embrace_of_winds=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    stormeye=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    splitting_gales_rus=Template(
        sentences=[
            [],
            ['text_percent_dmg'],
        ],
    ),
    splitting_gales_eng=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    breeze_of_reminiscence=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['enemy_res_anemo', 'ignore'],
            ['enemy_res_anemo'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    hurricane_of_freedom=Template(
        sentences=[
            ['dmg_anemo', 'ignore'],
        ],
    ),
    storm_of_defiance=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['enemy_res_anemo'],
            [None],
        ],
        results=[
            [0],
            [1],
        ],
    ),
)
