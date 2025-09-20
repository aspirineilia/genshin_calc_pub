from ..template import Template

mountain_bracing_bolt = Template(
    sentences=[
        ['15:ignore', '12:dmg_skill'],
        ['12:dmg_skill', '8:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

sturdy_bone = Template(
    sentences=[
        ['15:ignore'],
        ['16:normal_base_atk_percent'],
        ['18:ignore', '7:ignore'],
    ],
)

fruitful_hook = Template(
    patterns=[
        ('; After', '. After'),
    ],
    sentences=[
        ['16:crit_rate_plunge'],
        ['16:dmg_normal', '10:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

peak_patrol_song_rus = Template(
    names=['защиту', 'защиты'],
    sentences=[
        ['8:def_percent', '10:dmg_pyro'],
        ['6:ignore', '2:ignore', '0.1:ignore'],
        ['1000:ignore', '8:text_percent|8', '15:ignore'],
        ['25.6:text_percent_max|25.6'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ],
)

peak_patrol_song_eng = Template(
    sentences=[
        ['8:def_percent', '10:dmg_pyro', '6:ignore'],
        ['2:ignore'],
        ['0.1:ignore'],
        ['2:ignore', '2:ignore', '8:text_percent|8', '1000:ignore', '25.6:text_percent_max|25.6', '15:ignore'],
    ],
    results=[
        [0, 1, 2],
        [3],
    ],
)
