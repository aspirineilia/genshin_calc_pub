from ...template import Template, TemplateList


char_yanfei = TemplateList(
    default_rus=Template(
        names=[
            'Янь Фэй',
            'заряженная атака', 'Багровые печати', 'Багровая печать', 'Багровых печатей',
        ],
        skills={
            'skill': [],
            'burst': ['По рукам'],
        },
    ),
    default_eng=Template(
        names=[
            'Yanfei',
            'Scarlet Seals', 'Scarlet Seal',
        ],
        skills={
            'skill': [],
            'burst': ['Done Deal'],
        },
    ),
    proviso_rus=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
            [],
        ],
    ),
    proviso_eng=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore'],
            [],
        ],
    ),
    blazing_eye=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
        ],
    ),
    the_law_knows_no_kindness=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    right_of_final_interpretation=Template(
        sentences=[
            ['crit_rate_charged', 'text_percent_hp'],
        ],
    ),
    supreme_amnesty_rus=Template(
        sentences=[
            ['ignore', 'text_percent_hp'],
            ['ignore'],
        ],
    ),
    supreme_amnesty_eng=Template(
        sentences=[
            ['text_percent_hp', 'ignore', 'ignore'],
        ],
    ),
    extra_clause=Template(
        sentences=[
            ['ignore'],
        ],
    ),
)
