from ...template import Template, TemplateList


char_kuki_shinobu = TemplateList(
    default_rus=Template(
        names=[
            'Куки Синобу', 'Синобу',
            'Метка громовой травы',
        ],
        skills={
            'skill': ['Освящающего кольца', 'Травяного кольца освящения'],
            'burst': ['Обряд Гёэй Наруками Карияма'],
        },
    ),
    default_eng=Template(
        names=[
            'Kuki Shinobu', 'Shinobu',
            'Thundergrass Mark',
        ],
        skills={
            'skill': ['Sanctifying Ring', 'Grass Ring of Sanctification'],
            'burst': ['Gyoei Narukami Kariyama Rite'],
        },
    ),
    breaking_free_rus=Template(
        sentences=[
            ['healing', 'ignore'],
        ],
    ),
    breaking_free_eng=Template(
        sentences=[
            ['ignore', 'healing'],
        ],
    ),
    hearts_repose=Template(
        sentences=[
            ['text_percent_healing', 'text_percent_dmg'],
        ],
    ),
    to_cloister_compassion=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    to_forsake_fortune=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    to_sever_sealing_rus=Template(
        names=['обычные атаки', 'заряженные атаки'],
        sentences=[
            ['text_percent'],
            ['ignore'],
        ],
    ),
    to_sever_sealing_eng=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    to_ward_weakness_rus=Template(
        sentences=[
            [],
            ['ignore'],
            ['ignore', 'ignore', 'mastery', 'ignore'],
            ['ignore'],
        ],
    ),
    to_ward_weakness_eng=Template(
        sentences=[
            [],
            ['ignore', 'ignore', 'ignore', 'mastery', 'ignore'],
            ['ignore'],
        ],
    ),
)
