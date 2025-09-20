from ...template import Template, TemplateList


char_fischl = TemplateList(
    default_rus=Template(
        names=[
            'Фишль',
            'Озу', 'Оза', 'Оз',
            'заряженной стрелой', 'грозу', 'божественная молния',
        ],
        skills={
            'skill': ['Тень расправленных крыльев'],
            'burst': ['Ночная иллюзия'],
        },
    ),
    default_eng=Template(
        names=[
            'Fischl', 'Oz',
            'Aimed Shot', 'Thundering Retribution',
        ],
        skills={
            'skill': ['Nightrider'],
            'burst': ['Midnight Phantasmagoria'],
        },
    ),
    stellar_predator=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    undone_be_thy_sinful_hex=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    gaze_of_the_deep=Template(
        sentences=[
            [],
            ['text_percent_dmg'],
        ],
    ),
    devourer_of_all_sins=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    her_pilgrimage_of_bleak=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_hp'],
        ],
    ),
    evernight_raven_rus=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    evernight_raven_eng=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
)
