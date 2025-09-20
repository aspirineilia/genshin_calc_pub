from ...template import Template, TemplateList


char_hu_tao = TemplateList(
    default_rus=Template(
        names=[
            'Ху Тао',
            'Танец бабочки', 'Кровавого цветка',
            'элементальные сопротивления', 'физическое сопротивление',
        ],
        skills={
            'skill': ['Танец бабочки', 'Путеводитель по загробной жизни', 'Кровавого цветка'],
            'burst': ['Упокоение духов'],
        },
    ),
    default_eng=Template(
        names=[
            'Hu Tao',
            'Paramita Papilio', 'Blood Blossom',
            'All Elemental', 'Physical RES',
        ],
        skills={
            'skill': ['Guide to Afterlife', 'Blood Blossom', 'Paramita Papilio'],
            'burst': ['Spirit Soother'],
        },
    ),
    flutter_by=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    sanguine_rouge_rus=Template(
        sentences=[
            ['dmg_pyro', 'ignore'],
        ],
    ),
    sanguine_rouge_eng=Template(
        sentences=[
            ['ignore', 'dmg_pyro'],
        ],
    ),
    crimson_bouquet=Template(
        sentences=[
            [],
        ],
    ),
    ominous_rainfall_rus=Template(
        sentences=[
            ['text_percent'],
            [],
        ],
    ),
    ominous_rainfall_eng=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    garden_of_eternal_rest=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    butterflys_embrace=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'res_phys', 'crit_rate', 'ignore', 'ignore'],
        ],
    ),
)
