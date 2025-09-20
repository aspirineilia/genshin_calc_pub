from ...template import Template, TemplateList


char_candace = TemplateList(
    default_rus=Template(
        names=[
            'Кандакию', 'Кандакии',
            'Молитвы алой короны', 'Водяной вал',
        ],
        skills={
            'skill': ['Священного обряда: Обитель цапли'],
            'burst': ['Священного обряда: Прилив трясогузки'],
        },
    ),
    default_eng=Template(
        names=[
            'Candace',
            'Prayer of the Crimson Crown',
        ],
        skills={
            'skill': ['Sacred Rite: Heron\'s Sanctum'],
            'burst': ['Sacred Rite: Wagtail\'s Tide'],
        },
    ),
    aegis_of_crossed_arrows=Template(
        sentences=[
            [],
        ],
    ),
    celestial_dome_of_sand_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    celestial_dome_of_sand_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
            [],
        ],
    ),
    returning_heiress_of_the_scarlet_sands=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    moon_piercing_brilliance_rus=Template(
        sentences=[
            [],
            ['hp_percent', 'ignore'],
        ],
    ),
    moon_piercing_brilliance_eng=Template(
        sentences=[
            ['hp_percent', 'ignore'],
        ],
    ),
    sentinel_oath=Template(
        sentences=[
            [],
        ],
    ),
    the_overflow_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore'],
            [],
        ],
    ),
    the_overflow_eng=Template(
        patterns=[
            (r'hydro{AoE ', 'AoE '),
            (r'Hydro} DMG', 'Hydro DMG'),
        ],
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
)
