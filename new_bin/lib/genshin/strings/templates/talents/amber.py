from ...template import Template, TemplateList


char_amber = TemplateList(
    default_rus=Template(
        names=[
            'Эмбер',
            'Шанс критического попадания', 'уязвимым местам',
            'Барон Зайчик', 'атаку',
        ],
        skills={
            'skill': ['Барон Зайчик'],
            'burst': ['Огненный дождь'],
        },
    ),
    default_eng=Template(
        names=[
            'Amber',
            'Baron Bunny', 'weak points',
        ],
        skills={
            'skill': ['Explosive Puppet'],
            'burst': ['Fiery Rain'],
        },
    ),
    every_arrow_finds_its_target=Template(
        sentences=[
            ['crit_rate_amber', 'text_percent_radius'],
        ],
    ),
    precise_shot=Template(
        sentences=[
            ['atk_percent', 'ignore'],
        ],
    ),
    one_arrow_to_rule_them_all_rus=Template(
        sentences=[
            [],
            ['text_percent_dmg'],
        ],
    ),
    one_arrow_to_rule_them_all_eng=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
    bunny_triggered=Template(
        sentences=[
            ['dmg_skill_amber'],
        ],
    ),
    its_not_just_any_doll_rus=Template(
        sentences=[
            ['text_percent_cd'],
            [],
        ],
    ),
    its_not_just_any_doll_eng=Template(
        sentences=[
            ['text_percent_cd'],
            ['ignore'],
        ],
    ),
    wildfire_rus=Template(
        sentences=[
            ['atk_percent', 'ignore'],
        ],
    ),
    wildfire_eng=Template(
        sentences=[
            ['move_speed', 'atk_percent', 'ignore'],
        ],
    ),
)
