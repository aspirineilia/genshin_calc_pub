from ...template import Template, TemplateList


char_diona = TemplateList(
    default_rus=Template(
        names=[
            'Дионе', 'Дионы',
        ],
        skills={
            'skill': ['Морозные коготочки'],
            'burst': ['Авторский коктейль'],
        },
    ),
    default_eng=Template(
        names=[
            'Diona',
            'DMG Absorption',
        ],
        skills={
            'skill': ['Icy Paws'],
            'burst': ['Signature Mix'],
        },
    ),
    cats_tail_secret_menu=Template(
        sentences=[
            ['move_speed', 'stamina_consume'],
        ],
    ),
    drunkards_farce=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    a_lingering_flavor=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    shaken_not_purred_rus=Template(
        sentences=[
            ['dmg_skill_diona', 'ignore', 'text_percent'],
        ],
    ),
    shaken_not_purred_eng=Template(
        sentences=[
            ['dmg_skill_diona', 'diona_shield', 'text_percent', 'ignore'],
        ],
    ),
    wine_industry_slayer=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    cats_tail_closing_time_rus=Template(
        patterns=[
            (r'<br>·', '\\n'),
        ],
        sentences=[
            [],
            ['ignore', 'healing_recv'],
            ['ignore', 'mastery'],
        ],
        results=[
            [0, 2],
            [1],
        ],
    ),
    cats_tail_closing_time_eng=Template(
        patterns=[
            (r'<br>·', '\\n'),
        ],
        sentences=[
            [],
            ['healing_recv', 'ignore'],
            ['mastery', 'ignore'],
        ],
        results=[
            [0, 2],
            [1],
        ],
    ),
)
