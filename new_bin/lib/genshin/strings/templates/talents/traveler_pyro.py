from ...template import Template, TemplateList


char_traveler_pyro = TemplateList(
    default_rus=Template(
        patterns=[
            (r'<hr .*', ''),
        ],
        names=[
            'Пылающего порога', 'Испепеляющего порога', 'Пылающий порог', 'Испепеляющий порог',
            'Клинка текучего пламени',
        ],
        skills={
            'skill': [
                'Клинок текущего пламени', 'Клинка текучего пламени',
                'Пылающего порога', 'Испепеляющего порога', 'Пылающий порог', 'Испепеляющий порог',
            ],
            'burst': ['Испепеляющий равнины'],
        },
    ),
    default_eng=Template(
        patterns=[
            (r'<hr .*', ''),
        ],
        names=[
            'Blazing', 'Scorching Thresholds',
        ],
        skills={
            'skill': ['Flowfire Blade', 'Blazing Threshold', 'Scorching Threshold'],
            'burst': ['Plains Scorcher'],
        },
    ),
    true_flame_of_incineration=Template(
        sentences=[
            ['20:ignore'],
        ],
    ),
    embers_unspent=Template(
        sentences=[
            ['5:ignore'],
            ['12:ignore'],
            ['4:ignore'],
        ],
    ),
    starfires_flowing_light=Template(
        sentences=[
            ['6:dmg_all'],
            ['9:dmg_all'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    ever_lit_candle=Template(
        sentences=[
            ['12:ignore', '14:ignore'],
            ['28:ignore'],
        ],
    ),
    ravaging_flame_rus=Template(
        sentences=[
            ['9:ignore', '20:dmg_pyro'],
        ],
    ),
    ravaging_flame_eng=Template(
        sentences=[
            ['20:dmg_pyro', '9:ignore'],
        ],
    ),
    the_sacred_flame_imperishable_rus=Template(
        sentences=[
            [],
            ['40:crit_dmg_normal'],
        ],
    ),
    the_sacred_flame_imperishable_eng=Template(
        sentences=[
            ['40:crit_dmg_normal'],
        ],
    ),
)
