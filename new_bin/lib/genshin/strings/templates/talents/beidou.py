from ...template import Template, TemplateList


char_beidou = TemplateList(
    default_rus=Template(
        names=[
            'Бэй Доу',
            'обычной',
        ],
        skills={
            'skill': ['Призыв волны'],
            'burst': ['Крушитель бури'],
        },
    ),
    default_eng=Template(
        names=[
            'Beidou',
        ],
        skills={
            'skill': ['Tidecaller'],
            'burst': ['Stormbreaker'],
        },
    ),
    retribution=Template(
        sentences=[
            [],
        ],
    ),
    lightning_storm=Template(
        sentences=[
            ['ignore', 'dmg_normal', 'atk_speed'],
        ],
    ),
    sea_beasts_scourge_rus=Template(
        sentences=[
            ['ignore', 'text_percent_shield'],
            ['ignore'],
        ],
    ),
    sea_beasts_scourge_eng=Template(
        sentences=[
            ['text_percent_shield', 'ignore', 'ignore'],
        ],
    ),
    upon_the_turbulent_sea_the_thunder_arises_rus=Template(
        sentences=[
            [],
        ],
    ),
    upon_the_turbulent_sea_the_thunder_arises_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    stunning_revenge=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    bane_of_evil=Template(
        sentences=[
            ['enemy_res_electro'],
        ],
    ),
)
