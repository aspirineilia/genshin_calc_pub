from ...template import Template, TemplateList


char_albedo = TemplateList(
    default_rus=Template(
        names=[
            'Альбедо', 'Цветки мимолётности', 'Роковым расчётом', 'Рокового расчёта',
            'Ритуал рождения: Тектоническая волна', 'Цветков неизбежности', 'Цветка солнца',
            'защиты', 'энергии',
        ],
        skills={
            'skill': ['Абиогенез: Цветок солнца'],
            'burst': ['Ритуал рождения: Тектоническая волна'],
        },
    ),
    default_eng=Template(
        names=[
            'Albedo', 'Transient Blossoms', 'Fatal Reckoning', 'Fatal Blossoms',
            'Abiogenesis: Solar Isotoma', 'Rite of Progeniture: Tectonic Tide', 'Solar Isotoma',
        ],
        skills={
            'skill': ['Abiogenesis: Solar Isotoma'],
            'burst': ['Rite of Progeniture: Tectonic Tide'],
        },
    ),
    calcite_might_eng=Template(
        sentences=[
            ['dmg_skill_albedo', None],
        ],
    ),
    calcite_might_rus=Template(
        sentences=[
            [None, 'dmg_skill_albedo'],
        ],
    ),
    homuncular_nature=Template(
        sentences=[
            ['mastery', 'ignore'],
        ],
    ),
    flower_of_eden=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    opening_of_phanerozoic_rus=Template(
        sentences=[
            ['ignore', 'text_percent_dmg', 'ignore'],
        ],
    ),
    opening_of_phanerozoic_eng=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    descent_of_divinity=Template(
        sentences=[
            ['dmg_plunge'],
        ],
    ),
    dust_of_purification=Template(
        sentences=[
            ['dmg_all'],
        ],
    ),
)
