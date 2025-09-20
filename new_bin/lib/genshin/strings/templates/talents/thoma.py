from ...template import Template, TemplateList


char_thoma = TemplateList(
    default_rus=Template(
        names=[
            'Томы',
            'Пылающего щита', 'Пылающий щит', 'Огненным разрывом',
        ],
        skills={
            'skill': ['Пылающего покрова', 'Пылающего щита', 'Пылающий щит'],
            'burst': ['Багрового оёроя', 'Багровый оёрой'],
        },
    ),
    default_eng=Template(
        names=[
            'Thoma',
            'Fiery Collapse',
        ],
        skills={
            'skill': ['Blazing Barrier', 'Blazing Blessing'],
            'burst': ['Crimson Ooyoroi'],
        },
    ),
    imbricated_armor_rus=Template(
        sentences=[
            ['shield', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    imbricated_armor_eng=Template(
        sentences=[
            ['shield', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    flaming_assault_rus=Template(
        sentences=[
            ['text_percent'],
            [],
        ],
    ),
    flaming_assault_eng=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    a_comrades_duty_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    a_comrades_duty_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    a_subordinates_skills=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    long_term_planning=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    burning_heart_rus=Template(
        sentences=[
            ['ignore', 'dmg_normal'],
        ],
    ),
    burning_heart_eng=Template(
        sentences=[
            ['dmg_normal', 'ignore'],
        ],
    ),
)
