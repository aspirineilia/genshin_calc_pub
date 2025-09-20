from ...template import Template, TemplateList


char_kinich= TemplateList(
    default_rus=Template(
        names=[
            'Кинича', 'Киничу', 'Кинич',
            'Опыта охотника', 'Пробивающую чешую пушку', 'Пробивающей чешую пушки', 'Пробивающей чешую пушки',
            'кольцевой атаки', 'Запустения', 'Чешуебоя', 'Чешуебой', 'Ладонь жука-скакуна',
            'Договор огненного духа',
        ],
        skills={
            'skill': ['Охотник Крон: Верхом на высотах'],
            'burst': ['Слава драконьему величеству'],
        },
    ),
    default_eng=Template(
        names=[
            'Kinich',
            'Desolation', 'Hunter\'s Experience', 'Scalespiker Cannon', 'Scalespiker Cannon', 'Cannon',
            'Loop Shots', 'Flame Spirit Pact', 'Tiger Beetle\'s Palm',
        ],
        skills={
            'skill': ['Canopy Hunter: Riding High'],
            'burst': ['Hail to the Almighty Dragonlord'],
        },
    ),
    the_price_of_desolation_rus=Template(
        sentences=[
            [],
            ['7:ignore'],
            ['0.8:ignore'],
            [],
        ],
    ),
    the_price_of_desolation_eng=Template(
        sentences=[
            ['7:ignore', '0.8:ignore'],
            [],
        ],
    ),
    flame_spirit_pact_rus=Template(
        sentences=[
            ['1:ignore'],
            ['15:ignore', '2:ignore'],
            ['320:text_percent'],
        ],
    ),
    flame_spirit_pact_eng=Template(
        sentences=[
            ['1:ignore', '15:ignore'],
            ['2:ignore'],
            ['320:text_percent'],
        ],
    ),
    parrots_beak=Template(
        sentences=[
            ['30:move_speed', '6:ignore', '100:crit_dmg_skill_kinich'],
        ],
    ),
    tiger_beetles_palm=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['30:enemy_res_dendro', '6:ignore'],
            ['100:dmg_skill_kinich'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    hummingbirds_feather_rus=Template(
        sentences=[
            ['5:ignore'],
            ['2.8:ignore', 'dmg_burst_kinich'],
        ],
    ),
    hummingbirds_feather_eng=Template(
        sentences=[
            ['5:ignore', '2.8:ignore', '70:dmg_burst_kinich'],
        ],
    ),
    auspicious_beasts_shape=Template(
        sentences=[
            ['700:text_percent_dmg'],
        ],
    ),
)
