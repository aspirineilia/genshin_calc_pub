from ...template import Template, TemplateList


char_tartaglia = TemplateList(
    default_rus=Template(
        names=[
            'Тарталья',
            'обычными', 'Отлив-удар', 'Отлив-вспышка', 'Отлив',
        ],
        skills={
            'skill': ['Форма духа: Бушующие волны'],
            'burst': ['Хаос: Опустошение'],
        },
    ),
    default_eng=Template(
        names=[
            'Tartaglia',
            'Riptide Slash', 'Riptide Flash', 'Riptide Slashes', 'Riptide Flashes', 'Riptide',
            'Melee Stance',
        ],
        skills={
            'skill': ['Foul Legacy: Raging Tide'],
            'burst': ['Havoc: Obliteration'],
        },
    ),
    never_ending=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    sword_of_torrents=Template(
        sentences=[
            [],
        ],
    ),
    tide_withholder=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    understream=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    hydrospout_rus=Template(
        sentences=[
            ['ignore'],
            [],
        ],
    ),
    hydrospout_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    annihilation=Template(
        sentences=[
            [],
        ],
    ),
)
