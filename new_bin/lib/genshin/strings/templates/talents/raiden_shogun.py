from ...template import Template, TemplateList


char_raiden_shogun = TemplateList(
    default_rus=Template(
        names=[
            'сёгуна Райдэн', 'сёгун Райдэн',
            'Чакра вожделения', 'Решимости', 'Решимость', 'Мусо иссин',
            'взрывов стихии', 'взрыв стихии', 'Мусо но хитотати',
        ],
        skills={
            'skill': ['Чакра вожделения'],
            'burst': ['Мусо иссин', 'Тайное искусство: Мусо синсэцу'],
        },
    ),
    default_eng=Template(
        names=[
            'Chakra Desiderata', 'Resolve', 'Musou Isshin',
            'Musou no Hitotachi', 'Raiden Shogun',
        ],
        skills={
            'skill': ['Chakra Desiderata'],
            'burst': ['Musou Isshin', 'Secret Art: Musou Shinsetsu'],
        },
    ),
    wishes_unnumbered=Template(
        sentences=[
            ['ignore', 'ignore'],
          ],
    ),
    enlightened_one=Template(
        sentences=[
            ['ignore', 'ignore', None, None],
        ],
    ),
    ominous_inscription=Template(
        sentences=[
            [],
            ['ignore'],
            ['ignore'],
        ],
    ),
    steelbreaker=Template(
        sentences=[
            ['enemy_def_ignore_burst'],
        ],
    ),
    pledge_of_propriety=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    wishbearer=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
)
