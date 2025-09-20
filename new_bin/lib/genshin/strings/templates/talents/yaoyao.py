from ...template import Template, TemplateList


char_yaoyao = TemplateList(
    default_rus=Template(
        names=[
            'Яо Яо',
            'Наследия Адептов', 'Редьку белого нефрита', 'Редька белого нефрита', 'Редьки белого нефрита',
            'Небесного скопления редьки', 'Сошествие лунной яшмы', 'Бросающий Юэгуй', 'Мегаредьку', 'Мегаредек',
        ],
        skills={
            'skill': ['Небесного скопления редьки', 'Редька белого нефрита'],
            'burst': ['Сошествие лунной яшмы', 'Сошествия лунной яшмы', 'Бросающий Юэгуй'],
        },
    ),
    default_eng=Template(
        names=[
            'Yaoyao', 'Adeptal Legacy', 'White Jade Radishes', 'White Jade Radish',
            'Yuegui: Throwing Mode', 'Mega Radish', 'Mega Radishes',
        ],
        skills={
            'skill': ['Raphanus Sky Cluster', 'Yuegui: Throwing Mode', 'White Jade Radishes'],
            'burst': ['Moonjade Descent', 'Rite of Progeniture: Tectonic Tide'],
        },
    ),
    starscatter=Template(
        sentences=[
            [],
            ['ignore', 'ignore'],
        ],
    ),
    in_others_shoes_rus=Template(
        sentences=[
            ['ignore', 'text_percent_hp'],
            [],
            ['ignore'],
        ],
    ),
    in_others_shoes_eng=Template(
        sentences=[
            ['ignore', 'text_percent_hp'],
            ['ignore'],
        ],
    ),
    adeptus_tutelage_rus=Template(
        sentences=[
            ['dmg_dendro', 'ignore', 'ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    adeptus_tutelage_eng=Template(
        sentences=[
            ['dmg_dendro', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    innocent_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    innocent_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    winsome_rus=Template(
        sentences=[
            ['text_percent_hp'],
            ['ignore'],
            ['text_value_max'],
        ],
    ),
    winsome_eng=Template(
        sentences=[
            ['text_percent_hp', 'ignore'],
            ['text_value_max'],
        ],
    ),
    beneficent_rus=Template(
        sentences=[
            ['ignore', 'text_percent_atk', 'text_percent_heal'],
            ['ignore'],
        ],
    ),
    beneficent_eng=Template(
        sentences=[
            ['ignore', 'text_percent_atk', 'text_percent_heal', 'ignore'],
        ],
    ),
)
