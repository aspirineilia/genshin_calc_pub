from ...template import Template, TemplateList


char_iansan = TemplateList(
    default_rus=Template(
        names=[
            'Иансан',
            'Громовое нисхождение', 'Точных движений', 'Разминки', 'Силы духа', 'Предельной силы',
            'Измерителя кинетической энергии', 'Измеритель кинетической энергии', 'Улучшенная тренировка с отягощением',
        ],
        skills={
            'skill': [],
            'burst': ['Три принципа силы'],
        },
    ),
    default_eng=Template(
        names=[
            'Iansan',
            'Swift Stormflight', 'Precise Movement', 'Kinetic Energy Scale', 'Surging Force',
            'Nightsoul point', 'Warming Up', 'Enhanced Resistance Training', 'Scale', 'Extreme Force',
        ],
        skills={
            'skill': [],
            'burst': ['The Three Principles of Power'],
        },
    ),
    enhanced_resistance_training=Template(
        sentences=[
            ['15:ignore', '20:atk_percent', '1:ignore'],
            ['4:ignore'],
            ['2.8:ignore'],
        ],
    ),
    kinetic_energy_gradient_test=Template(
        sentences=[
            ['10:ignore', '1:ignore', '60:text_percent_heal'],
            ['2.8:ignore'],
        ],
    ),
    startings_never_easy_rus=Template(
        sentences=[
            ['6:ignore', '15:ignore'],
            ['18:ignore'],
        ],
    ),
    startings_never_easy_eng=Template(
        sentences=[
            ['15:ignore', '6:ignore'],
            ['18:ignore'],
        ],
    ),
    laziness_is_the_enemy=Template(
        patterns=[
            ('Кроме того, если', '\\nЕсли'),
            ('Additionally, if', '\\nIf'),
        ],
        sentences=[
            ['15:ignore'],
            ['30:text_percent'],
            [],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    slow_and_steady_wins_the_race=Template(
        sentences=[
            ['2:ignore'],
            [],
            ['1:ignore', '4:ignore', '50:ignore'],
        ],
    ),
    teachings_of_the_collective_of_plenty=Template(
        patterns=[
            ('<br>Кроме того, когда', '\\nКогда'),
            ('<br>Additionally, when', '\\nWhen'),
        ],
        sentences=[
            ['3:ignore'],
            ['25:dmg_all', '3:ignore'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
)
