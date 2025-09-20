from ...template import Template, TemplateList


char_diluc = TemplateList(
    default_rus=Template(
        names=[
            'Дилюка', 'Дилюк',
            'скорость атаки', 'Огненный натиск', 'обычных атак',
        ],
        skills={
            'skill': ['Огненный натиск'],
            'burst': ['Рассвет'],
        },
    ),
    default_eng=Template(
        names=[
            'Diluc',
            'Searing Onslaught',
        ],
        skills={
            'skill': ['Searing Onslaught'],
            'burst': ['Dawn'],
        },
    ),
    relentless=Template(
        sentences=[
            ['stamina_consume_charged', 'ignore'],
        ],
    ),
    blessing_of_phoenix=Template(
        sentences=[
            ['ignore'],
            ['dmg_pyro'],
        ],
    ),
    conviction_rus=Template(
        sentences=[
            ['ignore', 'dmg_all'],
        ],
    ),
    conviction_eng=Template(
        sentences=[
            ['dmg_all', 'ignore'],
        ],
    ),
    searing_ember=Template(
        sentences=[
            ['atk_percent', 'atk_speed_normal'],
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    flowing_flame_rus=Template(
        sentences=[
            ['ignore', 'dmg_skill_diluc_bonus', 'ignore'],
        ],
    ),
    flowing_flame_eng=Template(
        sentences=[
            ['ignore', 'dmg_skill_diluc_bonus'],
            ['ignore'],
        ],
    ),
    flaming_sword_nemesis_of_the_dark_rus=Template(
        sentences=[
            ['ignore', 'atk_speed_normal'],
        ],
    ),
    flaming_sword_nemesis_of_the_dark_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'atk_speed_normal'],
        ],
    ),
)
