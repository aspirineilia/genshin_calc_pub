from ...template import Template, TemplateList


char_jean = TemplateList(
    default_rus=Template(
        names=[
            'Джинн',
            'элементальную сферу', 'частицу',
            'поля одуванчиков', 'поле',
        ],
        skills={
            'skill': ['Клинок ветра'],
            'burst': ['Одуванчиковый бриз'],
        },
    ),
    default_eng=Template(
        names=[
            'Jean',
            'Elemental Orb', 'Particle', 'Dandelion Field', 'Field',
        ],
        skills={
            'skill': ['Gale Blade'],
            'burst': ['Dandelion Breeze'],
        },
    ),
    wind_companion=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    let_the_wind_lead=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    spiraling_tempest=Template(
        sentences=[
            ['ignore', 'dmg_skill_jean'],
        ],
    ),
    peoples_aegis=Template(
        sentences=[
            ['atk_speed_normal', 'ignore'],
        ],
    ),
    lands_of_dandelion=Template(
        sentences=[
            ['enemy_res_anemo'],
        ],
    ),
    lions_fang_fair_protector_of_mondstadt_rus=Template(
        sentences=[
            ['dmg_reduction', 'ignore', 'ignore'],
        ],
    ),
    lions_fang_fair_protector_of_mondstadt_eng=Template(
        sentences=[
            ['dmg_reduction'],
            ['ignore', 'ignore'],
        ],
    ),
)
