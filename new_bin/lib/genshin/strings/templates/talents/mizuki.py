from ...template import Template, TemplateList


char_mizuki = TemplateList(
    default_rus=Template(
        names=[
            'Юмэмидзуки Мидзуки', 'Мидзуки',
            'Парящей по сновидениям', 'Двадцать три ночи ожидания', 'Двадцати трёх ночей ожидания',
            'Закуску Юмэмикадзэ', 'Закуску в стиле юмэми', 'Тайной родниковой терапии анраку',
        ],
        skills={
            'skill': ['Парящей по сновидениям'],
            'burst': ['Тайная родниковая терапия анраку'],
        },
    ),
    default_eng=Template(
        names=[
            'Yumemizuki Mizuki',
            'Dreamdrifter state', 'Dreamdrifter\'s',
            'Twenty-Three Nights\' Awaiting', 'Yumemikaze Specialty Snack',
        ],
        skills={
            'skill': [],
            'burst': ['Anraku Secret Spring Therapy'],
        },
    ),
    bright_moons_restless_voice=Template(
        sentences=[
            ['2.5:ignore'],
            ['0.3:ignore', '2:ignore'],
        ],
    ),
    thoughts_by_day_bring_dreams_by_night=Template(
        sentences=[
            ['100:mastery', '4:ignore'],
        ],
    ),
    in_mist_like_waters=Template(
        sentences=[
            ['3:ignore', '3.5:ignore'],
            ['900:text_percent_dmg'],
        ],
    ),
    your_echo_i_meet_in_dreams=Template(
        sentences=[
            ['0.04:text_percent_dmg|0|2'],
        ],
    ),
    buds_warm_lucid_springs_rus=Template(
        sentences=[
            ['5:ignore'],
            ['4:ignore'],
        ],
    ),
    buds_warm_lucid_springs_eng=Template(
        sentences=[
            ['5:ignore', '4:ignore'],
        ],
    ),
    the_heart_lingers_long=Template(
        sentences=[
            ['30:crit_rate_swirl', '100:crit_dmg_swirl'],
        ],
    ),
)
