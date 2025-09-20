from ...template import Template, TemplateList


char_razor = TemplateList(
    default_rus=Template(
        names=[
            'Рэйзора', 'Рэйзор',
            'защиту',
        ],
        skills={
            'skill': ['Гром и когти', 'Гром и Когти'],
            'burst': ['Громовой клык'],
        },
    ),
    default_eng=Template(
        names=[
            'Razor',
            'Claw and Thunder',
        ],
        skills={
            'skill': ['Claw and Thunder'],
            'burst': ['Lightning Fang'],
        },
    ),
    awakening=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    hunger=Template(
        sentences=[
            ['recharge', 'text_percent'],
        ],
    ),
    wolfs_instinct=Template(
        sentences=[
            ['dmg_all', 'ignore'],
        ],
    ),
    suppression=Template(
        sentences=[
            ['text_percent_hp', 'crit_rate_enemy'],
        ],
    ),
    bite=Template(
        sentences=[
            ['enemy_def_reduce', 'ignore'],
        ],
    ),
    lupus_fulguris=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
)
