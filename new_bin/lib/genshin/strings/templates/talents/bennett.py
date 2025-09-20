from ...template import Template, TemplateList


char_bennett = TemplateList(
    default_rus=Template(
        names=[
            'Беннета', 'Беннет',
            'базовой атаки',
            'одноручным мечом', 'двуручным мечом', 'древковым оружием',
        ],
        skills={
            'skill': ['Чрезмерные стремления'],
            'burst': ['Волнительное приключение'],
        },
    ),
    default_eng=Template(
        names=[
            'Bennett',
        ],
        skills={
            'skill': ['Passion Overload'],
            'burst': ['Fantastic Voyage'],
        },
    ),
    rekindle=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    fearnaught=Template(
        sentences=[
            ['text_percent_cd', 'ignore'],
        ],
    ),
    grand_expectation=Template(
        sentences=[
            ['bonus_bennet_atk'],
        ],
    ),
    impasse_conqueror_rus=Template(
        sentences=[
            ['recharge', 'text_percent_hp'],
        ],
    ),
    impasse_conqueror_eng=Template(
        sentences=[
            ['text_percent_hp', 'recharge'],
        ],
    ),
    unexpected_odyssey=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    fire_ventures_with_me=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
)
