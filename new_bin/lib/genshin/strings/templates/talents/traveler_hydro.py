from ...template import Template, TemplateList


char_traveler_hydro = TemplateList(
    default_rus=Template(
        names=[
            'Капля росы', 'Капля источника', 'Капли источника', 'Капель источника',
            'Клинка водной эмблемы', 'Затопление', 'Бурные воды', 'Затоплением',
            'Капли источника', 'Чистые воды', 'Капель росы', 'Щита водной эмблемы',
        ],
        skills={
            'skill': ['Клинка водной эмблемы', 'Клинок водной эмблемы'],
            'burst': ['Прибывающая вода'],
        },
    ),
    default_eng=Template(
        names=[
            'Traveler',
            'Dewdrop', 'Sourcewater Droplet', 'Droplets', 'Droplet', 'Suffusion',
            'Torrent Surge', 'Spotless Waters', 'Aquacrest Aegis', 'Aegis', 'Aquacrest Saber',
        ],
        skills={
            'skill': ['Aquacrest Saber'],
            'burst': ['Rising Waters'],
        },
    ),
    spotless_waters_rus=Template(
        sentences=[
            [],
            ['7:text_percent_heal', '1:ignore'],
            ['4:ignore'],
        ],
    ),
    spotless_waters_eng=Template(
        sentences=[
            [],
            ['7:text_percent_heal', '1:ignore', '4:ignore'],
        ],
    ),
    clear_waters=Template(
        sentences=[
            ['45:text_percent_dmg', '5000:text_value_max'],
        ],
    ),
    swelling_lake=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    trickling_purity=Template(
        sentences=[
            ['30:ignore', '3:ignore'],
        ],
    ),
    pouring_descent_rus=Template(
        sentences=[
            ['10:text_percent_hp'],
            ['250:ignore'],
            ['2:ignore', '10:text_percent_hp_2'],
            [],
            [],
        ],
    ),
    pouring_descent_eng=Template(
        sentences=[
            ['10:text_percent_hp', '250:ignore'],
            ['2:ignore', '10:text_percent_hp_2'],
            [],
        ],
    ),
    tides_of_justice_rus=Template(
        sentences=[
            ['6:text_percent_hp'],
            [],
        ],
    ),
    tides_of_justice_eng=Template(
        sentences=[
            ['6:text_percent_hp'],
        ],
    ),
)
