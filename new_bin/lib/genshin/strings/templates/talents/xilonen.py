from ...template import Template, TemplateList


char_xilonen = TemplateList(
    default_rus=Template(
        names=[
            'Шилонен',
            'Исходных сэмплов', 'Исходных сэмпла', 'Исходные сэмплы',
            'Цветущей милостью', 'Цветущая милость',
            'защиты',
            'Благословение непреходящей ночи',
        ],
        skills={
            'skill': ['Скретч Йоуаль'],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
            'Xilonen',
            'Source Samples', 'Sample Source', 'Source Sample',
            'Blooming Blessing',
            'Imperishable Night\'s Blessing',
        ],
        skills={
            'skill': ['Yohual\'s Scratch'],
            'burst': [],
        },
    ),
    netotiliztlis_echoes_rus=Template(
        patterns=[
            ('<br>· ', '\\n<br>'),
            ('<br>·', '\\n<br>'),
        ],
        sentences=[
            [],
            ['35:ignore'],
            ['0.1:ignore'],
            ['30:dmg_normal'],
        ],
        results=[
            [0, 1, 2],
            [0, 3],
        ]
    ),
    netotiliztlis_echoes_eng=Template(
        patterns=[
            ('<br>·', '\\n<br>'),
        ],
        sentences=[
            [],
            ['2:ignore', '35:ignore'],
            ['0.1:ignore'],
            ['2:ignore', '30:dmg_normal'],
        ],
        results=[
            [0, 1, 2],
            [0, 3],
        ]
    ),
    portable_armored_sheath=Template(
        sentences=[
            [],
            ['14:ignore', '20:def_percent', '15:ignore'],
        ],
    ),
    sabbatical_phrase=Template(
        sentences=[
            ['30:ignore', '45:ignore'],
        ],
    ),
    chiucue_mix_rus=Template(
        sentences=[
            [],
            ['50:text_percent_geo', '45:text_percent_pyro'],
            ['45:text_percent_hydro', '60:text_percent_cryo', '25:ignore', '6:ignore'],
        ],
    ),
    chiucue_mix_eng=Template(
        sentences=[
            [],
            ['50:text_percent_geo', '45:text_percent_pyro', '45:text_percent_hydro', '60:text_percent_cryo', '25:ignore', '6:ignore'],
        ],
    ),
    suchitls_trance_rus=Template(
        sentences=[
            ['15:ignore', '65:text_percent_dmg'],
            ['6:ignore'],
        ],
    ),
    suchitls_trance_eng=Template(
        sentences=[
            ['15:ignore', '65:text_percent_dmg'],
            ['6:ignore'],
            [],
        ],
    ),
    imperishable_night_carnival_rus=Template(
        sentences=[
            ['5:ignore'],
            ['300:normal_base_def_percent', '1.5:ignore', '120:text_percent_heal', '1:ignore', '15:ignore'],
        ],
    ),
    imperishable_night_carnival_eng=Template(
        sentences=[
            ['5:ignore', '300:normal_base_def_percent', '120:text_percent_heal', '1.5:ignore', '1:ignore', '15:ignore'],
        ],
    ),
)
