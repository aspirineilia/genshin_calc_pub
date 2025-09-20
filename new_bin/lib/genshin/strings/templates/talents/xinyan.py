from ...template import Template, TemplateList


char_xinyan = TemplateList(
    default_rus=Template(
        names=[
            'Синь Янь',
            'Щит 2 ур.', '«Вступление»', 'Щит 3 ур.', '«Рейв»', 'щит 3 ур.',
            'скорость обычной', 'физ. сопротивление', 'защиты',
        ],
        skills={
            'skill': ['Решительный жар'],
            'burst': ['Струны протеста'],
        },
    ),
    default_eng=Template(
        names=[
            'Xinyan',
            'Shield Level 2', 'Shield Level 3', 'Lead-In', 'Rave',
            'Physical RES', 'ATK Bonus',
        ],
        skills={
            'skill': ['Sweeping Fervor'],
            'burst': ['Riff Revolution'],
        },
    ),
    the_show_goes_on_even_without_an_audience_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    the_show_goes_on_even_without_an_audience_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    now_thats_rock_n_roll=Template(
        sentences=[
            ['dmg_phys'],
        ],
    ),
    fatal_acceleration=Template(
        sentences=[
            ['atk_speed_normal', 'ignore', 'ignore'],
        ],
    ),
    impromptu_opening=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    wildfire_rhythm=Template(
        sentences=[
            ['enemy_res_phys', 'ignore'],
        ],
    ),
    rockin_in_a_flaming_world=Template(
        sentences=[
            ['text_percent'],
            ['ignore'],
        ],
    ),
)
