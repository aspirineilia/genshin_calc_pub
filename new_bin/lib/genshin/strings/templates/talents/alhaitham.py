from ...template import Template, TemplateList


char_alhaitham = TemplateList(
    default_rus=Template(
        names=[
            'Аль-Хайтам', 'аль-Хайтам', 'аль-Хайтама', 'аль-Хайтаму',
            'Заряженные атаки', 'Зеркало света', 'Зеркал света', 'Зеркала света', 'Проекционного удара',
            'Особое поле: Взаимосвязь феноменов',
        ],
        skills={
            'skill': ['Универсалия: Совершенствование формы'],
            'burst': ['Особое поле: Взаимосвязь феноменов'],
        },
    ),
    default_eng=Template(
        names=[
            'Alhaitham',
            'Chisel-Light Mirrors', 'Chisel-Light Mirror', 'Projection Attacks', 'Mirror',
            'Particular Field: Fetters of Phenomena',
        ],
        skills={
            'skill': ['Universality: An Elaboration on Form'],
            'burst': ['Particular Field: Fetters of Phenomena'],
        },
    ),
    four_causal_correction=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    mysteries_laid_bare=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_max'],
        ],
    ),
    intuition=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    debate_rus=Template(
        sentences=[
            ['mastery', 'ignore'],
            ['ignore'],
            [],
            [],
        ],
    ),
    debate_eng=Template(
        sentences=[
            ['mastery', 'ignore', 'ignore'],
            [],
            [],
        ],
    ),
    elucidation=Template(
        sentences=[
            ['30:text_value_mastery', 'ignore', '10:text_value_dendro', 'ignore'],
        ],
    ),
    structuration=Template(
        sentences=[
            ['ignore', 'ignore', 'crit_rate', 'crit_dmg', 'ignore'],
            ['ignore'],
        ],
    ),
)
