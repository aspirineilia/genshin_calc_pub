from ...template import Template, TemplateList


char_kaedehara_kazuha = TemplateList(
    default_rus=Template(
        names=[
            'Кадзуха', 'Кадзухи',
            'Тихаяфуру', 'Осеннего вихря', 'атака в падении: Мидарэ рандзан',
        ],
        skills={
            'skill': ['Тихаяфуру'],
            'burst': ['Удар Кадзухи'],
        },
    ),
    default_eng=Template(
        names=[
            'Kaedehara Kazuha',
            'Plunging Attack: Midare Ranzan', 'Chihayaburu', 'Autumn Whirlwind',
        ],
        skills={
            'skill': ['Chihayaburu'],
            'burst': ['Kazuha Slash'],
        },
    ),
    soumon_swordsmanship_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
            [],
        ],
    ),
    soumon_swordsmanship_eng=Template(
        patterns=[
            (r'name{Plunging Attack}: Midare Ranzan', 'name{Plunging Attack: Midare Ranzan}'),
        ],
        sentences=[
            ['text_percent_dmg'],
            [],
        ],
    ),
    poetics_of_fuubutsu=Template(
        sentences=[
            [None, 'ignore'],
            [],
        ],
    ),
    scarlet_hills=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    yamaarashi_tailwind=Template(
        patterns=[
            (r'<br><br>', '<br>'),
        ],
        sentences=[
            ['mastery', 'mastery'],
        ],
    ),
    oozora_genpou=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    crimson_momiji=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
)
