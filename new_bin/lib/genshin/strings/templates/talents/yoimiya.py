from ...template import Template, TemplateList


char_yoimiya = TemplateList(
    default_rus=Template(
        names=[
            'Ёимии', 'Ёимия',
            'Трюков нарушителя порядка', 'Камнеломка Рюкин', 'Взрыва золотого сияния', 'Взрыв золотого сияния',
        ],
        skills={
            'skill': ['Огненный танец Ниваби'],
            'burst': ['Камнеломка Рюкин', 'Взрыв золотого сияния'],
        },
    ),
    default_eng=Template(
        names=[
            'Yoimiya',
            'ATK Bonus', 'Tricks of the Trouble-Maker', 'Aurous Blaze', 'Blazing Arrow', 'Ryuukin Saxifrage',
        ],
        skills={
            'skill': ['Niwabi Fire-Dance'],
            'burst': ['Ryuukin Saxifrage', 'Aurous Blaze'],
        },
    ),
    tricks_of_the_trouble_maker=Template(
        sentences=[
            ['dmg_pyro'],
            ['ignore', 'ignore'],
        ],
    ),
    summer_nights_dawn=Template(
        sentences=[
            ['text_percent', 'ignore'],
            [],
            ['text_percent_2'],
        ],
        results=[
            [0, 1, 2],
            [0],
            [1, 2],
        ]
    ),
    agate_ryuukin=Template(
        sentences=[
            ['ignore', 'atk_percent', 'ignore'],
        ],
    ),
    a_procession_of_bonfires=Template(
        sentences=[
            ['dmg_pyro', 'ignore'],
        ],
    ),
    pyrotechnic_professional=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    naganohara_meteor_swarm=Template(
        sentences=[
            ['text_percent_chance', 'text_percent_dmg'],
            [],
        ],
    ),
)
