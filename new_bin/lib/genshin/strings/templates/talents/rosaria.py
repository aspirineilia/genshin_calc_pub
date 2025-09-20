from ...template import Template, TemplateList


char_rosaria = TemplateList(
    default_rus=Template(
        names=[
            'Розарии',
            'Ледяного копья', 'физ. сопротивление', 'Казнящая исповедь',
        ],
        skills={
            'skill': ['Казнящая исповедь'],
            'burst': ['Обряд кончины'],
        },
    ),
    default_eng=Template(
        names=[
            'Rosaria',
            'Ice Lance', 'Ravaging Confession', 'Physical RES',
        ],
        skills={
            'skill': ['Ravaging Confession'],
            'burst': ['Rites of Termination'],
        },
    ),
    regina_probationum=Template(
        sentences=[
            ['crit_rate', 'ignore'],
        ],
    ),
    shadow_samaritan=Template(
        sentences=[
            ['text_percent', 'ignore', 'text_percent'],
        ],
    ),
    unholy_revelation_rus=Template(
        sentences=[
            ['atk_speed_normal', 'ignore'],
        ],
    ),
    unholy_revelation_eng=Template(
        sentences=[
            ['atk_speed_normal', 'dmg_normal', 'ignore'],
        ],
    ),
    land_without_promise=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    painful_grace_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    painful_grace_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    divine_retribution=Template(
        sentences=[
            ['enemy_res_phys', 'ignore'],
        ],
    ),
)
