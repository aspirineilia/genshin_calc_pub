from ...template import Template, TemplateList


char_barbara = TemplateList(
    default_rus=Template(
        names=[
            'Барбара', 'Барбары',
            'Кольце мелодии', 'Кольца мелодии',
            'элементальные сферы и частицы', 'единицу энергии',
        ],
        skills={
            'skill': ['Да начнётся шоу♪'],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
            'Barbara',
            'Melody Loop', 'Elemental Orb/Particle', 'energy',
        ],
        skills={
            'skill': ['Let the Show Begin♪'],
            'burst': [],
        },
    ),
    glorious_season=Template(
        sentences=[
            ['stamina_consume'],
        ],
    ),
    encore=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    gleeful_songs=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    vitality_burst=Template(
        sentences=[
            ['text_percent_cd', 'dmg_hydro'],
        ],
    ),
    attentiveness_be_my_power=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    dedicating_everything_to_you=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
)
