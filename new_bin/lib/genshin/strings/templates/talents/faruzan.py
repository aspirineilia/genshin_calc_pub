from ...template import Template, TemplateList


char_faruzan = TemplateList(
    default_rus=Template(
        names=[
            'Фарузан',
            'Проявления бури', 'Царство ветров насамджнин', 'воронки Обвала под давлением', 'Бич коварных ветров',
            'Тайные тропы ветров', 'Дара молитвенного ветра', 'Покровительство ураганов',
            'базовой атаки', 'стрел урагана', 'Ослепительный многогранник', 'Обвал под давлением',
        ],
        skills={
            'skill': ['Царство ветров насамджнин', 'Обвал под давлением'],
            'burst': ['Тайные тропы ветров'],
        },
    ),
    default_eng=Template(
        names=[
            'Faruzan',
            'Manifest Gale', 'Wind Realm of Nasamjnin', 'The Wind\'s Secret Ways',
            'Perfidious Wind\'s Bale', 'Pressurized Collapse', 'Prayerful Wind\'s Gift', 'Hurricane Guard',
            'Prayerful Wind\'s Benefit', 'Hurricane Arrows', 'Dazzling Polyhedron', 'Pressurized Collapses',
        ],
        skills={
            'skill': ['Wind Realm of Nasamjnin', 'Pressurized Collapses'],
            'burst': ['The Wind\'s Secret Ways'],
        },
    ),
    impetuous_flow=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    lost_wisdom_of_the_seven_caverns_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore'],
        ],
    ),
    lost_wisdom_of_the_seven_caverns_eng=Template(
        sentences=[
            ['text_percent_dmg', 'ignore', 'ignore'],
            [],
        ],
    ),
    truth_by_any_means=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    overzealous_intellect=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    divine_comprehension_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    divine_comprehension_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    the_wondrous_path_of_truth_rus=Template(
        sentences=[
            ['crit_dmg_anemo'],
            ['ignore'],
            [],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    the_wondrous_path_of_truth_eng=Template(
        sentences=[
            ['crit_dmg_anemo'],
            [],
            ['ignore'],
            [],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
)
