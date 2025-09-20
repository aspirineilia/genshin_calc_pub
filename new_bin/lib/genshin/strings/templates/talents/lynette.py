from ...template import Template, TemplateList


char_lynette = TemplateList(
    default_rus=Template(
        names=[
            'Линетт',
            'Изумительная кошачья коробка', 'Изумительной кошачьей коробки', 'Таинственный трюк',
            'Выпада тени', 'Выпад тени', 'Знаком тени', 'Яркие выстрелы', 'Яркий выстрел',
        ],
        skills={
            'skill': ['Таинственный трюк с исчезновением', 'Таинственный трюк'],
            'burst': ['Фокус: Удивительное превращение', 'Удивительное превращение'],
        },
    ),
    default_eng=Template(
        names=[
            'Lynette',
            'Bogglecat Box', 'Enigma Thrust', 'Shadowsign', 'Vivid Shot',
        ],
        skills={
            'skill': ['Enigmatic Feint'],
            'burst': ['Magic Trick: Astonishing Shift'],
        },
    ),
    sophisticated_synergy_rus=Template(
        patterns=[
            (r'1/2/3/4', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}/format{text_number=4|4}'),
            (r'8%/12%/16%/20%', 'format{text_number=1|8}/format{text_number=2|12}/format{text_number=3|16}/format{text_number=4|20}%'),
        ],
        sentences=[
            [
                '1:ignore', '1:ignore', '2:ignore', '2:ignore', '3:ignore', '3:ignore', '4:ignore', '4:ignore',
                '1:ignore', '8:ignore', '2:ignore', '12:ignore', '3:ignore', '16:ignore', '4:ignore', '20:ignore',
                '10:ignore',
            ],
        ],
    ),
    sophisticated_synergy_eng=Template(
        patterns=[
            (r'1/2/3/4', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}/format{text_number=4|4}'),
            (r'8%/12%/16%/20%', 'format{text_number=1|8}/format{text_number=2|12}/format{text_number=3|16}/format{text_number=4|20}%'),
        ],
        sentences=[
            [
                '10:ignore',
                '1:ignore', '1:ignore', '2:ignore', '2:ignore', '3:ignore', '3:ignore', '4:ignore', '4:ignore',
                '1:ignore', '8:ignore', '2:ignore', '12:ignore', '3:ignore', '16:ignore', '4:ignore', '20:ignore',
            ],
        ],
    ),
    props_positively_prepped=Template(
        sentences=[
            ['15:dmg_burst_lynette'],
            [],
        ],
    ),
    a_cold_blade_like_a_shadow=Template(
        sentences=[
            [],
        ],
    ),
    endless_mysteries=Template(
        sentences=[
            [],
        ],
    ),
    tacit_coordination=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
    watchful_eye=Template(
        sentences=[
            ['20:dmg_anemo', '6:ignore'],
        ],
    ),
)
