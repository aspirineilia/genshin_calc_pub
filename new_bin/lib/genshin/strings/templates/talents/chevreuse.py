from ...template import Template, TemplateList


char_chevreuse = TemplateList(
    default_rus=Template(
        names=[
            'Шеврёз',
            'Согласованной тактики авангарда', 'Согласованная тактика авангарда',
            'Согласованной тактикой', 'Согласованной тактики', 'Согласованная тактика',
            'Перегруженным зарядом', 'Быстрый преграждающий выстрел вблизи', 'Быстрого преграждающего выстрела вблизи',
        ],
        skills={
            'skill': [
                'Быстрый преграждающий выстрел вблизи',
                'Быстрый преграждающий выстрел вблизи',
                'Быстрого преграждающего выстрела вблизи',
            ],
            'burst': ['Кольца разрывных гранат'],
        },
    ),
    default_eng=Template(
        names=[
            'Chevreuse',
            'Vanguard\'s Coordinated Tactics', 'Coordinated Tactics',
            'Overcharged Ball', 'Short-Range Rapid Interdiction Fire',
        ],
        skills={
            'skill': ['Short-Range Rapid Interdiction Fire'],
            'burst': ['Ring of Bursting Grenades'],
        },
    ),
    vanguards_coordinated_tactics=Template(
        sentences=[
            ['enemy_res_pyro', 'ignore'],
        ],
    ),
    vertical_force_coordination_rus=Template(
        sentences=[
            ['ignore', 'text_percent', 'text_value'],
            [],
            ['text_percent_max'],
        ],
    ),
    vertical_force_coordination_eng=Template(
        sentences=[
            ['text_percent', 'text_value', 'ignore', 'text_percent_max'],
        ],
    ),
    stable_front_lines_resolve=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    sniper_induced_explosion_rus=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
            ['ignore'],
            [],
        ],
    ),
    sniper_induced_explosion_eng=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
            ['ignore'],
        ],
    ),
    the_secret_to_rapid_fire_multishots=Template(
        sentences=[
            [],
            ['ignore'],
        ],
    ),
    in_pursuit_of_ending_evil_rus=Template(
        sentences=[
            ['ignore', 'text_percent_heal'],
            ['ignore', 'dmg_pyro'],
            ['ignore'],
            [],
        ],
    ),
    in_pursuit_of_ending_evil_eng=Template(
        sentences=[
            ['ignore', 'text_percent_heal', 'ignore', 'dmg_pyro'],
            ['ignore'],
            [],
        ],
    ),
)
