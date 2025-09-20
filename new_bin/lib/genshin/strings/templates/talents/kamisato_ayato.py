from ...template import Template, TemplateList


char_kamisato_ayato = TemplateList(
    default_rus=Template(
        names=[
            'Камисато Аято', 'Аято', 'Намисэн',
            'Искусство Камисато: Кёка', 'Искусство Камисато: Суйю', 'Сюнсуйкэн',
            'энергия',
        ],
        skills={
            'skill': ['Искусство Камисато: Кёка', 'Искусства Камисато: Кёка', 'Сюнсуйкэн', 'Намисэн'],
            'burst': ['Искусство Камисато: Суйю', 'Искусства Камисато: Суйю'],
        },
    ),
    default_eng=Template(
        names=[
            'Kamisato Ayato', 'Ayato', 'Namisen',
            'Kamisato Art: Kyouka', 'Kamisato Art: Suiyuu', 'Shunsuiken',
        ],
        skills={
            'skill': ['Kamisato Art: Kyouka', 'Shunsuiken', 'Namisen'],
            'burst': ['Kamisato Art: Suiyuu'],
        },
    ),
    mine_wo_matoishi_kiyotaki_rus=Template(
        sentences=[],
    ),
    mine_wo_matoishi_kiyotaki_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    michiyuku_hagetsu=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    kyouka_fuushi=Template(
        sentences=[
            ['dmg_normal_ayato', 'ignore'],
        ],
    ),
    world_source_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
            ['hp_percent'],
        ],
        results=[
            [0],
            [1, 2],
        ]
    ),
    world_source_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'hp_percent'],
        ],
        results=[
            [0],
            [1],
        ]
    ),
    endless_flow=Template(
        sentences=[
            ['atk_speed_normal', 'ignore'],
        ],
    ),
    boundless_origin=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
)
