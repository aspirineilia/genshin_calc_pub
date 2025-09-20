from ...template import Template, TemplateList


char_ganyu = TemplateList(
    default_rus=Template(
        names=[
            'Гань Юй',
            'стрелы-снежинки', 'стрел-снежинок', 'стрелой-снежинкой', 'стрела-снежинка',
            'цветения', 'цветением',
        ],
        skills={
            'skill': ['След цилиня'],
            'burst': ['Небесный дождь'],
        },
    ),
    default_eng=Template(
        names=[
            'Ganyu',
            'Frostflake Arrow Blooms', 'Frostflake Arrows', 'Frostflake Arrow',
        ],
        skills={
            'skill': ['Trail of the Qilin'],
            'burst': ['Celestial Shower'],
        },
    ),
    undivided_heart_rus=Template(
        sentences=[
            ['ignore', 'crit_rate_ganyu'],
        ],
    ),
    undivided_heart_eng=Template(
        sentences=[
            ['crit_rate_ganyu', 'ignore'],
        ],
    ),
    harmony_between_heaven_and_earth=Template(
        sentences=[
            ['dmg_cryo'],
        ],
    ),
    dew_drinker=Template(
        sentences=[
            ['ignore', 'enemy_res_cryo', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    the_auspicious=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    westward_sojourn=Template(
        sentences=[
            [],
            ['dmg_all', 'dmg_all', 'ignore', None, 'ignore'],
        ],
    ),
    the_clement=Template(
        sentences=[
            ['ignore'],
        ],
    ),
)
