from ...template import Template, TemplateList


char_yae_miko = TemplateList(
    default_rus=Template(
        names=[
            'Яэ Мико',
            'Сакура сэссё', 'Сакуры сэссё', 'Сакур сэссё',
            'Небесной кицунэ', 'защиты',
        ],
        skills={
            'skill': ['Проклятие якан: Сакура сэссё', 'Сакура сэссё', 'Сакуры сэссё', 'Сакур сэссё'],
            'burst': ['Великое тайное искусство: Тэнко кэнсин'],
        },
    ),
    default_eng=Template(
        names=[
            'Yae Miko',
            'Sesshou Sakura', 'Tenko Thunderbolt',
        ],
        skills={
            'skill': ['Yakan Evocation: Sesshou Sakura', 'The Sesshou Sakura\'s', 'Sesshou Sakura'],
            'burst': ['Great Secret Art: Tenko Kenshin'],
        },
    ),
    the_shrines_sacred_shade_rus=Template(
        sentences=[
            [],
        ],
    ),
    the_shrines_sacred_shade_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    enlightened_blessing=Template(
        sentences=[
            ['text_percent|0|2'],
        ],
    ),
    yakan_offering=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    foxs_mooncall_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'text_percent'],
        ],
    ),
    foxs_mooncall_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent'],
        ],
    ),
    sakura_channeling=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
        ],
    ),
    daisesshou=Template(
        sentences=[
            ['enemy_def_ignore_skill'],
        ],
    ),
)
