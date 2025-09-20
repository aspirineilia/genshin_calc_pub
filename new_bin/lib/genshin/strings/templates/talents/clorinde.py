from ...template import Template, TemplateList


char_clorinde = TemplateList(
    default_rus=Template(
        names=[
            'Клоринды', 'Клоринду', 'Клоринда', 'Клориндой',
            'Последних лучей света', 'Долг жизни', 'Долга жизни', 'Пронзание ночи: Пакт',
            'Тень ночного дозора', 'Ночного дозора', 'Ночной дозор',
            'Разрывающее мрак пламя', 'Тень яркой свечи', 'Тени яркой свечи',
        ],
        skills={
            'skill': ['Охота на тьму', 'Охоты на тьму'],
            'burst': ['Последние лучи света', 'Последних лучей света'],
        },
    ),
    default_eng=Template(
        names=[
            'Clorinde',
            'Bond of Life', 'Night Vigil', 'Nightvigil Shade',
            'Dark-Shattering Flame', 'Glimbright Shades', 'Glimbright Shade', 'Impale the Night: Pact',
        ],
        skills={
            'skill': ['Hunter\'s Vigil'],
            'burst': ['Last Lightfall'],
        },
    ),
    dark_shattering_flame_rus=Template(
        sentences=[
            ['15:ignore', '20:dmg_electro_clorinde'],
            ['3:ignore'],
            ['1800:text_value_max'],
        ],
    ),
    dark_shattering_flame_eng=Template(
        sentences=[
            ['20:dmg_electro_clorinde', '15:ignore'],
            ['3:ignore'],
            [],
            ['1800:text_value_max'],
        ],
    ),
    lawful_remuneration_rus=Template(
        sentences=[
            ['100:ignore'],
            ['15:ignore', '10:crit_rate'],
            ['2:ignore', '100:ignore'],
        ],
    ),
    lawful_remuneration_eng=Template(
        sentences=[
            ['100:ignore', '10:crit_rate', '15:ignore'],
            ['2:ignore'],
            ['100:ignore'],
        ],
    ),
    from_this_day_i_pass_the_candles_shadow_veil_rus=Template(
        sentences=[
            [],
            ['30:text_percent_dmg', '1.2:ignore'],
            [],
        ],
    ),
    from_this_day_i_pass_the_candles_shadow_veil_eng=Template(
        sentences=[
            ['2:ignore', '30:text_percent_dmg', '1.2:ignore'],
            [],
        ],
    ),
    now_as_we_face_the_perils_of_the_long_night_rus=Template(
        sentences=[
            ['15:ignore', '30:text_percent'],
            ['3:ignore'],
            ['3:ignore'],
            ['2700:text_value'],
        ],
    ),
    now_as_we_face_the_perils_of_the_long_night_eng=Template(
        sentences=[
            ['30:text_percent', '15:ignore'],
            ['3:ignore'],
            [],
            ['3:ignore'],
            ['2700:text_value'],
        ],
    ),
    to_enshrine_tears_life_and_love=Template(
        sentences=[
            [],
            ['1:ignore', '2:text_percent'],
            ['200:text_percent_max'],
        ],
    ),
    and_so_shall_i_never_despair_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['12:ignore', '10:crit_rate', '70:crit_dmg'],
            ['200:text_percent_dmg'],
            ['1:ignore'],
            ['6:ignore'],
            ['80:ignore'],
            ['1:ignore', '6:ignore'],
        ],
        results=[
            [0],
            [1, 2, 3, 4, 5],
        ],
    ),
    and_so_shall_i_never_despair_eng=Template(
        patterns=[
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['12:ignore', '10:crit_rate', '70:crit_dmg'],
            ['200:text_percent_dmg'],
            ['1:ignore', '1:ignore', '6:ignore', '80:ignore'],
            ['1:ignore', '6:ignore'],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
)
