from ...template import Template, TemplateList


char_furina = TemplateList(
    default_rus=Template(
        names=[
            'Фурина', 'Фурины',
            'Певец Потоков', 'Центра внимания', 'Центр внимания',
            'фанфар', 'обычные атаки', 'заряженные атаки',
            'Архэ: Усия', 'Архэ: Пневма',
        ],
        skills={
            'skill': ['Салона одиноких сердец', 'Салон одиноких сердец'],
            'burst': ['Да возрадуются люди'],
        },
    ),
    default_eng=Template(
        names=[
            'Furina',
            'Salon Member', 'Singer of Many Waters', 'Fanfare', 'Center of Attention',
            'Arkhe: Ousia', 'Arkhe: Pneuma',
        ],
        skills={
            'skill': ['Salon Solitaire'],
            'burst': ['Let the People Rejoice'],
        },
    ),
    endless_waltz_rus=Template(
        sentences=[
            ['4:ignore', '2:ignore', '2:text_percent_heal'],
            [],
        ],
    ),
    endless_waltz_eng=Template(
        sentences=[
            ['2:text_percent_heal', '2:ignore', '4:ignore'],
        ],
    ),
    unheard_confession_rus=Template(
        sentences=[
            ['1000:ignore'],
            ['0.7:text_percent_dmg', '28:text_percent_dmg_max', '0.4:text_percent_heal'],
            ['16:text_percent_heal_max'],
        ],
    ),
    unheard_confession_eng=Template(
        sentences=[
            ['1000:ignore', '0.7:text_percent_dmg', '28:text_percent_dmg_max', '0.4:text_percent_heal', '16:text_percent_heal_max'],
        ],
    ),
    love_is_a_rebellious_bird_that_none_can_tame=Template(
        sentences=[
            ['150:text_value', '100:text_value_max'],
         ],
    ),
    a_woman_adapts_like_duckweed_in_water_rus=Template(
        sentences=[
            ['250:ignore'],
            [],
            ['0.35:text_percent|0|2'],
            [],
            ['140:text_percent_max'],
        ],
    ),
    a_woman_adapts_like_duckweed_in_water_eng=Template(
        sentences=[
            ['250:ignore'],
            ['0.35:text_percent|0|2'],
            ['140:text_percent_max'],
        ],
    ),
    they_know_not_life_who_dwelt_in_the_netherworld_not=Template(
        sentences=[
            ['4:ignore'],
            ['5:ignore'],
        ],
    ),
    hear_me_let_us_raise_the_chalice_of_love_rus=Template(
        patterns=[
            (r' \(как называется эта часть атаки坠地冲击\)', ''),
        ],
        sentences=[
            ['10:ignore'],
            [],
            ['18:text_percent_dmg_1'],
            ['1:ignore', '0.1:ignore', '4:text_percent_heal'],
            [],
            ['2.9:ignore'],
            ['25:text_percent_dmg_2'],
            [],
            ['1:ignore', '6:ignore', '6:ignore'],
        ],
    ),
    hear_me_let_us_raise_the_chalice_of_love_eng=Template(
        sentences=[
            ['10:ignore'],
            ['18:text_percent_dmg_1', '0.1:ignore', '1:ignore', '4:text_percent_heal', '2.9:ignore'],
            ['25:text_percent_dmg_2'],
            ['1:ignore', '6:ignore', '6:ignore'],
        ],
    ),
)
