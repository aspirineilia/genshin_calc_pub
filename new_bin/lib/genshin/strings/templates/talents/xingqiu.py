from ...template import Template, TemplateList


char_xingqiu = TemplateList(
    default_rus=Template(
        names=[
            'Син Цю',
            'Мечей дождя', 'Мечей Дождя',
        ],
        skills={
            'skill': ['Гухуа: Завеса дождя'],
            'burst': ['Гухуа: Радужная стойка'],
        },
    ),
    default_eng=Template(
        patterns=[
            ('name{Sword}', 'Sword'),
        ],
        names=[
            'Xingqiu',
            'Rain Swords', 'Rain Sword', 'sword rain',
        ],
        skills={
            'skill': ['Guhua name{Sword}: Fatal Rainscreen'],
            'burst': ['Guhua name{Sword}: Raincutter'],
        },
    ),
    hydropathic_rus=Template(
        sentences=[
            [None],
            [],
        ],
    ),
    hydropathic_eng=Template(
        sentences=[
            [None],
        ],
    ),
    blades_amidst_raindrops=Template(
        sentences=[
            ['dmg_hydro'],
        ],
    ),
    the_scent_remained=Template(
        sentences=[
            ['ignore'],
          ],
    ),
    rainbow_upon_the_azure_sky=Template(
        patterns=[
            ('на 3 сек;<br>', 'на 3 сек.\n'),
            ('by 3s.<br>', 'by 3s.\n'),
        ],
        sentences=[
            ['ignore'],
            ['enemy_res_hydro', 'ignore'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    evilsoother=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    hence_call_them_my_own_verses_rus=Template(
        sentences=[
            [],
            ['ignore'],
        ],
    ),
    hence_call_them_my_own_verses_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
)
