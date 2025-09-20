from ...template import Template, TemplateList


char_freminet = TemplateList(
    default_rus=Template(
        names=[
            'Фремине',
            'Давления дрейфующего льда', 'Таймера Пера', 'Разбит', 'Дробящее давление',
            'уровней давления', 'уровне давления',
        ],
        skills={
            'skill': ['Давление дрейфующего льда: Дробящее давление'],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
            'Freminet',
            'Pers Timer', 'Pressure', 'CD', 'Pressurized Floe', 'Shatter',
        ],
        skills={
            'skill': ['Pressurized Floe: Shattering Pressure'],
            'burst': [],
        },
    ),
    saturation_deep_dive=Template(
        sentences=[
            ['4:ignore', '1:ignore'],
        ],
    ),
    parallel_condensers=Template(
        sentences=[
            ['40:dmg_skill_freminet', '5:ignore'],
        ],
    ),
    dreams_of_the_foamy_deep=Template(
        sentences=[
            ['15:crit_rate_freminet'],
        ],
    ),
    penguins_and_the_land_of_plenty=Template(
        sentences=[
            ['2:ignore'],
            ['4:ignore', '3:ignore'],
        ],
    ),
    dance_of_the_snowy_moon_and_flute_rus=Template(
        sentences=[
            ['9:atk_percent', '6:ignore'],
            ['2:ignore', '0.3:ignore'],
        ],
    ),
    dance_of_the_snowy_moon_and_flute_eng=Template(
        sentences=[
            ['9:atk_percent', '6:ignore'],
            ['2:ignore'],
            ['0.3:ignore'],
        ],
    ),
    moment_of_waking_and_resolve_rus=Template(
        sentences=[
            ['12:crit_dmg', '6:ignore'],
            ['3:ignore', '0.3:ignore'],

        ],
    ),
    moment_of_waking_and_resolve_eng=Template(
        sentences=[
            ['12:crit_dmg', '6:ignore'],
            ['3:ignore'],
            ['0.3:ignore'],
        ],
    ),
)
