from ...template import Template, TemplateList


char_sangonomiya_kokomi = TemplateList(
    default_rus=Template(
        names=[
            'Сангономии Кокоми', 'Сангономия Кокоми',
            'Бакэ-курагэ', 'Церемониальное одеяние',
        ],
        skills={
            'skill': ['Клятва курагэ'],
            'burst': ['Вознесение нереиды'],
        },
    ),
    default_eng=Template(
        names=[
            'Sangonomiya Kokomi', 'Kokomi',
            'Bake-Kurage', 'Ceremonial Garment',
            'Healing Bonuses',
        ],
        skills={
            'skill': ['Kurage\'s Oath'],
            'burst': ['Nereid\'s Ascension'],
        },
    ),
    tamakushi_casket=Template(
        sentences=[
            [],
        ],
    ),
    song_of_pearls_rus=Template(
        names=['обычной'],
        sentences=[
            [],
            ['text_percent'],
        ],
    ),
    song_of_pearls_eng=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    at_waters_edge_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
        ],
    ),
    at_waters_edge_eng=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    the_clouds_like_waves_rippling_rus=Template(
        names=['Обычные', 'заряженные атаки'],
        sentences=[
            ['ignore', 'text_percent_1'],
            ['text_percent_2'],
            [],
        ],
    ),
    the_clouds_like_waves_rippling_eng=Template(
        sentences=[
            ['ignore', 'text_percent_1', 'text_percent_2'],
        ],
    ),
    the_moon_overlooks_the_waters=Template(
        sentences=[
            ['atk_speed_normal', 'ignore', 'ignore'],
        ],
    ),
    sango_isshin=Template(
        names=['обычные', 'заряженные атаки'],
        sentences=[
            ['dmg_hydro', 'ignore', 'ignore'],
        ],
    ),
)
