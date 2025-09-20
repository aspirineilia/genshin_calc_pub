from ...template import Template, TemplateList


char_xiangling = TemplateList(
    default_rus=Template(
        names=[
            'Сян Лин',
            'Гобы', 'Возгорание', 'перец',
        ],
        skills={
            'skill': ['Атака Гобы'],
            'burst': ['Огневихрь', 'Огневихре'],
        },
    ),
    default_eng=Template(
        names=[
            'Xiangling',
            'Guoba', 'chili pepper', 'Implode',
        ],
        skills={
            'skill': ['Guoba Attack'],
            'burst': ['Pyronado'],
        },
    ),
    crossfire=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    beware_its_super_hot=Template(
        sentences=[
            [],
            ['atk_percent', 'ignore'],
        ],
    ),
    crispy_outside_tender_inside=Template(
        sentences=[
            ['enemy_res_pyro', 'ignore'],
        ],
    ),
    oil_meets_fire=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
    slowbake=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    condensed_pyronado=Template(
        sentences=[
            ['dmg_pyro'],
        ],
    ),
)
