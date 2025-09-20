from ...template import Template, TemplateList


char_cyno = TemplateList(
    default_rus=Template(
        names=[
            'Сайно',
            'Поклявшегося прокладывать путь', 'Свидетеля истины', 'Вынесения приговора',
            'Молнии бедствия', 'Молний бедствия', 'Суд пера', 'Вынесение приговора',
            'Жертвоприношения шакала', 'Жертвоприношения шакала', 'Жертвоприношение шакала',
            'Молнию бедствия',
            'Тайного обряда: Переправляющий души', 'Священного обряда: Проворство шакала',
        ],
        skills={
            'skill': ['Тайного обряда: Переправляющий души'],
            'burst': ['Священного обряда: Проворство шакала'],
        },
    ),
    default_eng=Template(
        names=[
            'Cyno',
            'Pactsworn Pathclearer', 'Endseer', 'Judication',
            'Duststalker Bolts', 'Duststalker Bolt', 'Featherfall Judgment',
            'Day of the Jackal',
            'Secret Rite: Chasmic Soulfarer', 'Sacred Rite: Wolf\'s Swiftness'
        ],
        skills={
            'skill': ['Secret Rite: Chasmic Soulfarer'],
            'burst': ['Sacred Rite: Wolf\'s Swiftness'],
        },
    ),
    featherfall_judgment=Template(
        sentences=[
            [],
            ['dmg_skill_cyno', 'ignore', 'text_percent_dmg'],
        ],
    ),
    authority_over_the_nine_bows=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_dmg2'],
        ],
    ),
    unceasing_vigil=Template(
        sentences=[
            ['atk_speed_normal', 'ignore'],
            [],
        ],
    ),
    homecoming_of_spirits_rus=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    homecoming_of_spirits_eng=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
            ['ignore'],
            ['ignore'],
        ],
    ),
    forbidding_guard=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    just_scales_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    just_scales_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore'],
            ['ignore'],
            ['ignore', 'ignore'],
        ],
    ),
)
