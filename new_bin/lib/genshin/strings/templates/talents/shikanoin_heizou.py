from ...template import Template, TemplateList


char_shikanoin_heizou = TemplateList(
    default_rus=Template(
        names=[
            'Сиканоин Хэйдзо', 'Сиканоина Хэйдзо', 'Сиканоину Хэйдзо', 'Хэйдзо',
            'Убиение сердца', 'Убиения сердца', 'Ураганный удар', 'Ока урагана',
            'Отклонения', 'Ураганного туннеля', 'Верным мнением',
        ],
        skills={
            'skill': ['Убиение сердца', 'Убиения сердца', 'Убиения сердца'],
            'burst': ['Ураганный удар', 'Ураганном ударе'],
        },
    ),
    default_eng=Template(
        names=[
            'Shikanoin Heizou', 'Heizou',
            'Heartstopper Strike', 'Windmuster Kick', 'Windmuster Iris',
            'Declension', 'Arresting Windtunnel', 'Conviction',
        ],
        skills={
            'skill': ['Heartstopper Strike'],
            'burst': ['Windmuster Kick'],
        },
    ),
    paradoxical_practice=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    penetrative_reasoning=Template(
        sentences=[
            ['text_value', 'ignore'],
        ],
    ),
    named_juvenile_casebook=Template(
        sentences=[
            ['ignore', 'atk_speed_normal'],
            ['ignore'],
            ['ignore'],
        ],
    ),
    investigative_collection=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    tome_of_lies=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    curious_casefiles=Template(
        sentences=[
            ['crit_rate_heizou1'],
            ['crit_dmg_heizou4'],
        ],
    ),
)
