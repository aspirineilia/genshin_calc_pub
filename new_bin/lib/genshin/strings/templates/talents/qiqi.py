from ...template import Template, TemplateList


char_qiqi = TemplateList(
    default_rus=Template(
        names=[
            'Ци Ци',
            'обычной', 'Вестник стужи',
            'талисман Фортуны', 'талисманом Фортуны',
        ],
        skills={
            'skill': ['Искусство Адепта: Вестник стужи'],
            'burst': ['Искусство Адепта: Хранитель Фортуны'],
        },
    ),
    default_eng=Template(
        names=[
            'Qiqi',
            'Fortune-Preserving Talisman',
            'Charge Attack', 'Herald of Frost',
        ],
        skills={
            'skill': ['Adeptus Art: Herald of Frost'],
            'burst': ['Adeptus Art: Preserver of Fortune'],
        },
    ),
    life_prolonging_methods=Template(
        sentences=[
            ['healing_recv', 'ignore'],
        ],
    ),
    a_glimpse_into_arcanum=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    ascetics_of_frost=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    frozen_to_the_bone=Template(
        sentences=[
            ['dmg_normal'],
        ],
    ),
    divine_suppression=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    rite_of_resurrection=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
)
