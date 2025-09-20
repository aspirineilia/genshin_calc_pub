from ...template import Template, TemplateList


char_gorou = TemplateList(
    default_rus=Template(
        names=[
            'Горо',
            'защита', 'защиты', 'Крепость', 'Ярость', 'Стойкость',
            'Боевого штандарта генерала', 'Влияния генерала',
        ],
        skills={
            'skill': ['Всесторонняя защита Инудзаки', 'Всесторонней защиты Инудзаки', 'Боевого штандарта генерала'],
            'burst': ['Дзюга: Вперёд к победе', 'Влияния генерала'],
        },
    ),
    default_eng=Template(
        names=[
            'Gorou',
            'Crystal Collapse',
            'Inuzaka All-Round Defense',
            'Impregnable', 'Crunch', 'Standing Firm',
        ],
        skills={
            'skill': ['Inuzaka All-Round Defense', 'General\'s War Banner'],
            'burst': ['Juuga: Forward Unto Victory', 'General\'s Glory'],
        },
    ),
    heedless_of_the_wind_and_weather_rus=Template(
        sentences=[
            ['ignore', 'def_percent'],
        ],
    ),
    heedless_of_the_wind_and_weather_eng=Template(
        sentences=[
            ['def_percent', 'ignore'],
        ],
    ),
    a_favor_repaid=Template(
        sentences=[
            ['text_percent_1', 'text_percent_2'],
        ],
    ),
    swift_as_the_wind=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    steady_as_a_clock=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    warm_as_water_rus=Template(
        sentences=[
            ['ignore', 'text_percent'],
        ],
    ),
    warm_as_water_eng=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    mountainous_fealty=Template(
        sentences=[
            ['ignore', None, None, None],
        ],
    ),
)
