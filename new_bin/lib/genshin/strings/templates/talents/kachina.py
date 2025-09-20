from ...template import Template, TemplateList


char_kachina = TemplateList(
    default_rus=Template(
        names=[
            'Качины', 'Качина',
            'Турбовихря', 'Турбовихрь', 'Турбобура', 'защита',
        ],
        skills={
            'skill': ['Турбовихря', 'Турбобура', 'Турбовихрь'],
            'burst': ['Ну теперь всё!'],
        },
    ),
    default_eng=Template(
        names=[
            'Kachina',
            'Turbo Drill Field', 'Turbo Twirly',
        ],
        skills={
            'skill': ['Turbo Twirly', 'Turbo Twirly\'s'],
            'burst': ['"Time to Get Serious!"'],
        },
    ),
    mountain_echoes=Template(
        sentences=[
            ['20:dmg_geo', '12:ignore'],
        ],
    ),
    the_weight_of_stone=Template(
        sentences=[
            ['20:text_percent'],
        ],
    ),
    shards_are_gems_too_rus=Template(
        sentences=[
            ['3:ignore'],
            ['5:ignore'],
        ],
    ),
    shards_are_gems_too_eng=Template(
        sentences=[
            ['3:ignore', '5:ignore'],
        ],
    ),
    never_leave_home_without_turbo_twirly=Template(
        sentences=[
            ['20:ignore'],
            [],
        ],
    ),
    more_foes_more_caution=Template(
        sentences=[
            [
                '1:ignore', '2:ignore', '3:ignore', '4:ignore',
                '8:ignore', '12:ignore', '16:ignore', '20:ignore',
            ],
        ],
    ),
    this_time_ive_gotta_win=Template(
        sentences=[
            ['200:text_percent_dmg'],
            ['5:ignore'],
        ],
    ),
)
