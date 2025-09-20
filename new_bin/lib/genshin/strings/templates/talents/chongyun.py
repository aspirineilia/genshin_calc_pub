from ...template import Template, TemplateList


char_chongyun = TemplateList(
    default_rus=Template(
        names=[
            'Чун Юнь', 'Чун Юня',
            'скорость', 'одноручным', 'двуручным', 'древковым оружием',
            'Духовное лезвие: Холод Чунхуа', 'Духовного лезвия', 'Духовное лезвие',
            'ледяных клинка',
        ],
        skills={
            'skill': ['Духовное лезвие: Холод Чунхуа', 'Холода Чунхуа'],
            'burst': ['Духовное лезвие: Падение с небес'],
        },
    ),
    default_eng=Template(
        names=[
            'Chongyun',
            'Chonghua\'s Layered Frost',
            'spirit blade', 'ice blades', 'Frost Field',
        ],
        skills={
            'skill': ['Spirit Blade: Chonghua\'s Layered Frost'],
            'burst': ['Spirit Blade: Cloud-Parting Star'],
        },
    ),
    steady_breathing=Template(
        sentences=[
            ['atk_speed_normal'],
        ],
    ),
    rimechaser_blade=Template(
        sentences=[
            ['text_percent_dmg'],
            ['enemy_res_cryo', 'ignore'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    ice_unleashed=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
    atmospheric_revolution=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    frozen_skies=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    rally_of_four_blades_rus=Template(
        sentences=[
            ['dmg_burst_chongyun'],
        ],
    ),
    rally_of_four_blades_eng=Template(
        sentences=[
            ['dmg_burst_chongyun', 'ignore'],
        ],
    ),
)
