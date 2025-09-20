from ...template import Template, TemplateList


char_layla = TemplateList(
    default_rus=Template(
        names=[
            'Лайлы',
            'Полог сновидений', 'Полога сновидений', 'Пологом сновидений', 'Пологе',
            'Метеоров', 'Метеор', 'Метеоры', 'Сумеречной звездой', 'Сумеречная звезда',
            'Ночной звездой', ' Ночных звёзд', 'Глубокий сон',
            'обычных', 'обычной', 'Ночи почтенного сосредоточения',
        ],
        skills={
            'skill': ['Ночей почтенного сосредоточения', 'Ночи почтенного сосредоточения'],
            'burst': ['Сон колыбели звёзд'],
        },
    ),
    default_eng=Template(
        names=[
            'Layla',
            'Curtain of Slumber', 'Curtain', 'Deep Sleep', 'Night Stars', 'Night Star', 'Dawn Star',
            'Shooting Stars', 'Shooting Star', 'Nights of Formal Focus', 'Starlight Slugs',
        ],
        skills={
            'skill': ['Nights of Formal Focus'],
            'burst': ['Dream of the Star-Stream Shaker'],
        },
    ),
    like_nascent_light_rus=Template(
        sentences=[
            ['shield', 'ignore'],
        ],
    ),
    like_nascent_light_eng=Template(
        sentences=[
            ['ignore', 'shield', 'ignore'],
        ],
    ),
    sweet_slumber_undisturbed_rus=Template(
        sentences=[
            ['text_percent'],
            [],
        ],
    ),
    sweet_slumber_undisturbed_eng=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    fortress_of_fantasy_rus=Template(
        sentences=[
            ['text_percent_bonus', 'ignore', 'text_percent_shield', 'ignore'],
        ],
    ),
    fortress_of_fantasy_eng=Template(
        sentences=[
            ['text_percent_bonus'],
            ['text_percent_shield', 'ignore', 'ignore'],
        ],
    ),
    lights_remit=Template(
        sentences=[
            ['ignore'],
            [],
        ],
    ),
    starry_illumination_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore'],
        ],
    ),
    starry_illumination_eng=Template(
        sentences=[
            ['text_percent_dmg', 'ignore', 'ignore'],
        ],
    ),
    radiant_soulfire_rus=Template(
        sentences=[
            ['dmg_skill_layla', 'ignore'],
        ],
    ),
    radiant_soulfire_eng=Template(
        sentences=[
            ['dmg_skill_layla', 'dmg_burst_layla', 'ignore'],
        ],
    ),
)
