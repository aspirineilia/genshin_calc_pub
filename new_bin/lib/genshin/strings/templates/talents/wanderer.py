from ...template import Template, TemplateList


char_wanderer = TemplateList(
    default_rus=Template(
        names=[
            'Странник', 'Странника',
            'Ханэга: Песнь ветра', 'Избранника ветра', 'куго-рёку', 'Избранника ветра',
            'Куго: Фусёдан', 'Куго: Тофукай', 'Бури грёз', 'Кёгэн: Пять церемониальных актов',
            'Сошествие: ускорение в воздухе', 'стрел ветра', 'Цветок нефрита',
        ],
        skills={
            'skill': ['Ханэга: Песнь ветра', 'Избранника ветра'],
            'burst': ['Кёгэн: Пять церемониальных актов'],
        },
    ),
    default_eng=Template(
        names=[
            'Wanderer',
            'Windfavored', 'Kuugo: Fushoudan', 'Kuugo: Toufukai', 'Descent', 'Kuugoryoku Points', 'Kuugoryoku',
            'Gales of Reverie', 'Kyougen: Five Ceremonial Plays', 'Jade-Claimed Flower',
        ],
        skills={
            'skill': ['Windfavored'],
            'burst': ['Kyougen: Five Ceremonial Plays'],
        },
    ),
    jade_claimed_flower_rus=Template(
        sentences=[
            [None, None, None, 'ignore'],
            ['ignore',  'ignore'],
        ],
    ),
    jade_claimed_flower_eng=Template(
        sentences=[
            [None, None, None, 'ignore', 'ignore',  'ignore'],
        ],
    ),
    gales_of_reverie=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent_dmg', 'ignore'],
            ['ignore'],
        ],
    ),
    ostentatious_plumage=Template(
        sentences=[
            ['atk_speed_normal', 'text_percent_dmg'],
            [],
        ],
    ),
    isle_amidst_white_waves=Template(
        sentences=[
            [None, None],
        ],
    ),
    set_adrift_into_spring_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    set_adrift_into_spring_eng=Template(
        sentences=[
            [],
            ['ignore'],
        ],
    ),
    the_curtains_melancholic_sway_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    the_curtains_melancholic_sway_eng=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
)
