from ...template import Template, TemplateList


char_dori = TemplateList(
    default_rus=Template(
        names=[
            'Дори',
            'джинном', 'Устраняющих проблемы зарядов',
            'Снарядов гарантийного обслуживания', 'Устраняющими проблемы зарядами',
            'джинн', 'Зарядом джинна',
        ],
        skills={
            'skill': ['Фонарь усмирения духов: Устраняющая проблемы пушка', 'Устраняющими проблемы зарядами'],
            'burst': ['Дотошность Алькасар-сарая', 'джинном'],
        },
    ),
    default_eng=Template(
        names=[
            'Dori',
            'Jinni Toop', 'Jinni', 'CD', 'Troubleshooter Shots', 'After-Sales Service Rounds',
            'Spirit-Warding Lamp: Troubleshooter Cannon',
        ],
        skills={
            'skill': ['Spirit-Warding Lamp: Troubleshooter Cannon', 'Troubleshooter Shots'],
            'burst': ['Alcazarzaray\'s Exactitude', 'Jinni'],
        },
    ),
    an_eye_for_gold=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    compound_interest_rus=Template(
        sentences=[
            [None, 'ignore'],
            [None],
        ],
    ),
    compound_interest_eng=Template(
        sentences=[
            [None, 'ignore', None],
        ],
    ),
    additional_investment=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    special_franchise=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    discretionary_supplement=Template(
        patterns=[
            (r'<br>·\s*', '\\n<br>· '),
        ],
        sentences=[
            [],
            ['ignore', 'healing_recv'],
            ['ignore', 'recharge'],
        ],
        results=[
            [0, 1],
            [0, 2],
        ],
    ),
    sprinkling_weight_rus=Template(
        sentences=[
            ['ignore', 'text_percent'],
            [],
            ['ignore'],
        ],
    ),
    sprinkling_weight_eng=Template(
        sentences=[
            ['ignore', 'text_percent'],
            ['ignore'],
        ],
    ),
)
