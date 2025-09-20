from ...template import Template, TemplateList


char_dahlia = TemplateList(
    default_rus=Template(
        names=[
            'Далия', 'Далию', 'Далии',
            'Милости Фавония', 'Бенедикции', 'Щит священной милости',
        ],
        skills={
            'skill': [],
            'burst': ['Сияющий молебен'],
        },
    ),
    default_eng=Template(
        names=[
            'Dahlia',
            'Favonian Favor', 'Benison', 'Shield of Sacred Favor',
        ],
        skills={
            'skill': [],
            'burst': ['Radiant Psalter'],
        },
    ),
    the_winds_gentle_grace=Template(
        sentences=[
            ['2:ignore'],
            ['8:ignore'],
        ],
    ),
    prayer_of_well_wrought_joy_rus=Template(
        sentences=[
            [],
            ['1000:ignore'],
            ['0.5:text_percent'],
            ['20:text_percent_max'],
        ],
    ),
    prayer_of_well_wrought_joy_eng=Template(
        sentences=[
            ['1000:ignore', '0.5:text_percent', '20:text_percent_max'],
        ],
    ),
    infallible_procession=Template(
        sentences=[
            ['1:ignore', '2.5:ignore'],
        ],
    ),
    revelation_of_mercy=Template(
        sentences=[
            ['25:shield', '12:ignore'],
        ],
    ),
    collect_of_the_assembly=Template(
        sentences=[
            ['3:ignore'],
        ],
    ),
    you_shall_go_out_with_joy=Template(
        sentences=[
            ['10:atk_speed', '100:ignore', '15:ignore'],
        ],
    ),
)
