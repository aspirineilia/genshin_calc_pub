from ...template import Template, TemplateList


char_kujou_sara = TemplateList(
    default_rus=Template(
        names=[
            'Кудзё Сара',
            'Укрытия вороньего пера', 'Тэнгу дзюрай', 'Воронье перо',
            'Тэнгу дзюрай: Громокластер',
        ],
        skills={
            'skill': ['Призыв грозы тэнгу', 'Тэнгу дзюрай: Засада'],
            'burst': ['Подчинение: Коко сэндо'],
        },
    ),
    default_eng=Template(
        names=[
            'Kujou Sara',
            'Crowfeather Cover', 'Crowfeather',
            'Tengu Juurai: Stormcluster', 'Tengu Juurai: Ambush', 'Tengu Juurai',
        ],
        skills={
            'skill': ['Tengu Stormcall', 'Tengu Juurai: Ambush'],
            'burst': ['Subjugation: Koukou Sendou'],
        },
    ),
    immovable_will=Template(
        names=['Aimed Shot', 'прицельного выстрела'],
        sentences=[
            ['text_percent'],
        ],
    ),
    decorum_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    decorum_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    crows_eye_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    crows_eye_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    dark_wings=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    conclusive_proof=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    sin_of_pride=Template(
        sentences=[
            ['crit_dmg_electro'],
        ],
    ),
)
