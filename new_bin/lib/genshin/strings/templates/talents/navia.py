from ...template import Template, TemplateList


char_navia = TemplateList(
    default_rus=Template(
        names=[
            'Навия', 'Навии',
            'Кристальной шрапнели', 'Огневая поддержка', 'Огневой поддержки',
            'Церемониальный залп кристалла', 'Словно приветствие чистого неба',
        ],
        skills={
            'skill': ['Церемониальный залп кристалла'],
            'burst': ['Словно приветствие чистого неба'],
        },
    ),
    default_eng=Template(
        names=[
            'Navia',
            'Crystal Shrapnel', 'Cannon Fire Support',
            'Ceremonial Crystalshot', 'As the Sunlit Sky\'s Singing Salute',
        ],
        skills={
            'skill': ['Ceremonial Crystalshot'],
            'burst': ['As the Sunlit Sky\'s Singing Salute'],
        },
    ),
    undisclosed_distribution_channels_rus=Template(
        sentences=[
            ['4:ignore'],
            ['40:dmg_normal'],
        ],
    ),
    undisclosed_distribution_channels_eng=Template(
        sentences=[
            ['4:ignore', '40:dmg_normal'],
        ],
    ),
    mutual_assistance_network=Template(
        sentences=[
            ['20:text_percent'],
            ['2:ignore'],
        ],
    ),
    a_ladys_rules_for_keeping_a_courteous_distance=Template(
        sentences=[
            ['3:ignore', '1:ignore'],
            ['9:ignore', '3:ignore'],
        ],
    ),
    the_presidents_pursuit_of_victory_rus=Template(
        sentences=[
            ['12:text_percent', '36:text_percent_max', '1:ignore'],
            ['1:ignore'],
            [],
        ],
    ),
    the_presidents_pursuit_of_victory_eng=Template(
        sentences=[
            ['12:text_percent', '36:text_percent_max'],
            [],
        ],
    ),
    the_oathsworn_never_capitulate=Template(
        sentences=[
            ['20:enemy_res_geo', '8:ignore'],
        ],
    ),
    the_flexible_finesse_of_the_spinas_president_rus=Template(
        sentences=[
            ['3:ignore', '45:text_percent'],
            [],
        ],
    ),
    the_flexible_finesse_of_the_spinas_president_eng=Template(
        sentences=[
            ['3:ignore', '3:ignore', '45:text_percent', '3:ignore'],
        ],
    ),
)
