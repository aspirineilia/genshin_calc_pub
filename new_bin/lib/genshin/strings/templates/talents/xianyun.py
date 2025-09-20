from ...template import Template, TemplateList


char_xianyun = TemplateList(
    default_rus=Template(
        names=[
            'Сянь Юнь',
            'Волной плывущих облаков', 'Перо на ветру', 'Пера на ветру',
            'Небесной лестницы', 'Небесная лестница', 'Небесную лестницу',
            'Сплетение звёзд', 'Поддержкой Адептов',
            'Адепт в своей обители', 'Волны плывущих облаков', 'Превращения облаков',
            'Белые облака на заре', 'Белых облаков на заре', 'Сумеречного собрания звёзд',
        ],
        skills={
            'skill': ['Белые облака на заре'],
            'burst': ['Сумеречного собрания звёзд'],
        },
    ),
    default_eng=Template(
        names=[
            'Xianyun',
            'Driftcloud Waves', 'Driftcloud Wave', 'Storm Pinion', 'Starwicker',
            'Adeptal Assistance', 'Skyladder', 'Cloud Transmogrification',
            'Consider, the Adeptus in Her Realm',
            'White Clouds at Dawn', 'Stars Gather at Dusk',
        ],
        skills={
            'skill': ['White Clouds at Dawn'],
            'burst': ['Stars Gather at Dusk'],
        },
    ),
    galefeather_pursuit_rus=Template(
        sentences=[
            ['20:ignore', '1:ignore'],
            ['4:ignore', '4:text_percent_1', '6:text_percent_2', '8:text_percent_3', '10:text_percent_4'],
        ],
    ),
    galefeather_pursuit_eng=Template(
        sentences=[
            ['1:ignore', '20:ignore'],
            ['4:ignore'],
            ['4:text_percent_1', '6:text_percent_2', '8:text_percent_3', '10:text_percent_4'],
        ],
    ),
    consider_the_adeptus_in_her_realm=Template(
        sentences=[
            ['200:text_percent_atk'],
            ['9000:text_value_max'],
            ['0.4:ignore'],
        ],
    ),
    purifying_wind=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
    aloof_from_the_world=Template(
        patterns=[
            (r'<br>Кроме того', '\\nКроме того'),
            (r'18 000', '18000'),
            (r'<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['20:atk_percent', '15:ignore'],
            ['400:text_percent_atk'],
            ['18000:text_value_max'],
            ['0.4:ignore'],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
    mystery_millet_gourmet=Template(
        sentences=[
            ['1:ignore', '2:ignore', '3:ignore', '50:text_percent_1', '80:text_percent_2', '150:text_percent_3'],
            ['5:ignore'],
        ],
    ),
    they_call_her_cloud_retainer=Template(
        sentences=[
            ['1:ignore', '2:ignore', '3:ignore', '15:text_percent_1', '35:text_percent_2', '70:text_percent_3', '16:ignore'],
            ['8:ignore'],
        ],
    ),
)
