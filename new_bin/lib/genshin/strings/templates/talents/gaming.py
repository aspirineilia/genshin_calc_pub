from ...template import Template, TemplateList


char_gaming = TemplateList(
    default_rus=Template(
        patterns=[
            (r'name{атаки в падении}', 'атаки в падении'),
        ],
        names=[
            'Ка Мином', 'Ка Мина', 'Ка Мину', 'Ка Мин',
            'атаки в падении: Ступающий по облакам', 'Ман Чай',
        ],
        skills={
            'skill': ['Восхождение благовещего зверя'],
            'burst': ['Золотого танца суаньни'],
        },
    ),
    default_eng=Template(
        patterns=[
            (r'name{Plunging Attack}', 'Plunging Attack'),
        ],
        names=[
            'Gaming',
            'Suanni Man Chai',
            'Plunging Attack: Charmed Cloudstrider',
        ],
        skills={
            'skill': ['Bestial Ascent'],
            'burst': ['Suanni\'s Gilded Dance'],
        },
    ),
    dance_of_amity_rus=Template(
        sentences=[
            ['0.2:ignore', '1.5:text_percent_heal'],
            [],
            ['0.8:ignore'],
        ],
    ),
    dance_of_amity_eng=Template(
        sentences=[
            ['1.5:text_percent_heal', '0.2:ignore', '0.8:ignore'],
        ],
    ),
    air_of_prosperity=Template(
        sentences=[
            ['50:ignore', '20:healing_recv'],
            ['50:ignore', '20:dmg_skill_gaming'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    bringer_of_blessing=Template(
        sentences=[
            ['15:text_percent_heal'],
        ],
    ),
    plum_blossoms_underfoot=Template(
        sentences=[
            ['20:atk_percent', '5:ignore'],
        ],
    ),
    soar_across_mountains=Template(
        sentences=[
            ['2:ignore'],
            ['0.2:ignore'],
        ],
    ),
    to_tame_all_beasts=Template(
        sentences=[
            ['20:crit_rate_gaming', '40:crit_dmg_gaming'],
        ],
    ),
)
