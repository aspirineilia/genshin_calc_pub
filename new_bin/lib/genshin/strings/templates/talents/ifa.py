from ...template import Template, TemplateList


char_ifa = TemplateList(
    default_rus=Template(
        names=[
            'Ифа', 'Ифы',
            'Основ спасения', 'Основы спасения', 'Лекарственный выстрел',
            'сковывающего ветряного потока',
        ],
        skills={
            'skill': ['Огневую поддержку'],
            'burst': ['Составное поле успокоения'],
        },
    ),
    default_eng=Template(
        names=[
            'Ifa',
            'Rescue Essentials',
            'Field Medic\'s Vision',
        ],
        skills={
            'skill': ['Supporting Fire'],
            'burst': ['Compound Sedation Field'],
        },
    ),
    field_medics_vision_rus=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
    field_medics_vision_eng=Template(
        sentences=[
            ['1:ignore', '1:ignore'],
        ],
    ),
    mutual_aid_agreement=Template(
        sentences=[
            ['80:mastery', '10:ignore'],
        ],
    ),
    vitiferous_elixirs_concoction_rus=Template(
        sentences=[
            ['6:ignore'],
            ['1:ignore', '8:ignore'],
        ],
    ),
    vitiferous_elixirs_concoction_eng=Template(
        sentences=[
            ['6:ignore'],
            ['8:ignore'],
        ],
    ),
    guiding_spirit_of_ballistic_prayer=Template(
        sentences=[
            ['60:ignore', '4:ignore', '50:ignore'],
        ],
    ),
    decayed_vessels_permutation_rus=Template(
        sentences=[
            ['3:ignore', '15:ignore', '100:mastery'],
        ],
    ),
    decayed_vessels_permutation_eng=Template(
        sentences=[
            ['3:ignore', '100:mastery', '15:ignore'],
        ],
    ),
    oath_on_a_feathered_knot=Template(
        sentences=[
            ['50:ignore', '120:text_percent_dmg'],
            ['20:ignore'],
        ],
    ),
)
