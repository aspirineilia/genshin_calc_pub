from ...template import Template, TemplateList


char_citlali = TemplateList(
    default_rus=Template(
        names=[
            'Ситлали', 'Ицпапа', 'Ицпапы',
            'Морозного урагана Ицпапы повышается', 'ледяного шторма', 'Одеяния опаловой звезды',
            'Звёздных клинков', 'Опаловым щитом', 'Морозного урагана',
            'Холодного дождя Мамалоако', 'Холодный дождь Мамалоако', 'Белого пламени',
            'Духовный сосуд-череп: Обсидиановая звезда', 'Духовного сосуда-черепа',
            'Свода тайных законов', 'Свода тайных законов',
        ],
        skills={
            'skill': ['Тёмная звезда утреннего инея'],
            'burst': ['Указ светил'],
        },
    ),
    default_eng=Template(
        names=[
            'Citlali', 'Itzpapa',
            'Frostfall Storm', 'Ice Storm', 'Opalstar Vestments', 'Stellar Blades', 'Stellar Blade', 'Blade', 'Opal Shield',
            'Mamaloaco\'s Frigid Rain', 'Obsidian Spiritvessel Skull', 'Spiritvessel Skull', 'Cifra of the Secret Law', 'Opal Fire',
        ],
        skills={
            'skill': ['Dawnfrost Darkstar'],
            'burst': ['Edict of Entwined Splendor'],
        },
    ),
    mamaloacos_frigid_rain_rus=Template(
        sentences=[
            ['20:enemy_res_pyro', '12:ignore'],
            ['16:ignore'],
            ['8:ignore'],
        ],
    ),
    mamaloacos_frigid_rain_eng=Template(
        sentences=[
            ['20:enemy_res_pyro', '12:ignore'],
            ['16:ignore', '8:ignore'],
        ],
    ),
    itzpapalotls_star_garments=Template(
        sentences=[
            ['90:text_percent_1'],
            ['1200:text_percent_2', '4:ignore'],
        ],
    ),
    radiant_blades_of_centzon_mimixcoah_rus=Template(
        sentences=[
            ['10:ignore'],
            ['1:ignore', '200:text_percent', '3:ignore'],
            ['8:ignore', '45:ignore'],
        ],
    ),
    radiant_blades_of_centzon_mimixcoah_eng=Template(
        sentences=[
            [],
            ['10:ignore'],
            ['1:ignore', '200:text_percent', '3:ignore'],
            ['8:ignore', '45:ignore'],
        ],
    ),
    heart_devourers_travail=Template(
        patterns=[
            ('<br><br>Кроме того', '\\nКроме того'),
            ('<br><br>Also', '\\nAlso'),
        ],
        sentences=[
            ['125:text_value_self', '250:text_value_other'],
            ['20:enemy_res_pyro', '12:ignore'],
            [],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    death_defiers_spirit_skull=Template(
        sentences=[
            [],
            ['1800:text_percent_dmg', '16:ignore', '8:ignore'],
            ['8:ignore'],
            [],
        ],
    ),
    teoiztacs_secret_pact_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            [],
            [],
            ['1:ignore', '40:ignore'],
            ['1.5:text_percent_1', '2.5:text_percent_2'],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
    teoiztacs_secret_pact_eng=Template(
        patterns=[
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            [],
            [],
            ['1:ignore', '40:ignore', '1.5:text_percent_1', '2.5:text_percent_2'],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
)
