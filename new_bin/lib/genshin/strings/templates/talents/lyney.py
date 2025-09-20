from ...template import Template, TemplateList


char_lyney = TemplateList(
    default_rus=Template(
        names=[
            'Лини',
            'стрела-реквизит', 'стрелу-реквизит', 'базовую атаку', 'Избыточного реквизита', 'Предельного внимания',
            'Шляпа - Хохочущий кот', 'Шляп - Хохочущих котов', 'Шляпы - Хохочущих котов',
            'Пиротехническим снарядом: Реприза',
        ],
        skills={
            'attack': ['стрела-реквизит', 'Шляп - Хохочущих котов'],
            'skill': ['Ошарашивающий свет'],
            'burst': ['Великий фокус: Парад чудес'],
        },
    ),
    default_eng=Template(
        names=[
            'Lyney',
            'Prop Arrows', 'Prop Arrow', 'Grin-Malkin hat', 'Grin-Malkin Hats', 'Prop Surplus', 'Crisp Focus',
            'Pyrotechnic Strike: Reprised', 'Pyrotechnic Strike',
        ],
        skills={
            'attack': ['Prop Arrow', 'Grin-Malkin Hats'],
            'skill': [],
            'burst': [],
        },
    ),
    perilous_performance=Template(
        sentences=[
            ['3:ignore', '80:text_percent_dmg'],
        ],
    ),
    conclusive_ovation=Template(
        sentences=[
            ['60:text_percent_dmg', '20:text_percent_bonus', '100:text_percent_max'],
        ],
    ),
    whimsical_wonders_rus=Template(
        sentences=[
            ['2:ignore', '1:ignore'],
            ['15:ignore'],
        ],
    ),
    whimsical_wonders_eng=Template(
        sentences=[
            ['2:ignore', '2:ignore', '1:ignore'],
            ['15:ignore'],
        ],
    ),
    locquacious_cajoling_rus=Template(
        sentences=[
            ['2:ignore', '20:crit_dmg'],
            ['3:ignore'],
        ],
    ),
    locquacious_cajoling_eng=Template(
        sentences=[
            ['2:ignore'],
            ['20:crit_dmg'],
            ['3:ignore'],
            [],
        ],
    ),
    well_versed_well_rehearsed=Template(
        sentences=[
            ['20:enemy_res_pyro', '6:ignore'],
        ],
    ),
    guarded_smile=Template(
        sentences=[
            ['80:text_percent_dmg'],
            [],
        ],
    ),
)
