from ...template import Template, TemplateList


char_sayu = TemplateList(
    default_rus=Template(
        names=[
            'Саю',
            'Мудзи-Мудзи Дарума', 'Мудзи-Мудзи Дарумы', 'Мудзи-Мудзи Дарумой',
            'Удара вихря Фуфу', 'Ветряного колеса Фуфу',
        ],
        skills={
            'skill': ['Искусство Юху: Рывок Фуин'],
            'burst': ['Искусство Юху: Сумасшествие Мудзина'],
        },
    ),
    default_eng=Template(
        names=[
            'Sayu',
            'Muji-Muji Daruma', 'Fuufuu Whirlwind Kick', 'Fuufuu Windwheel',
        ],
        skills={
            'skill': ['Yoohoo Art: Fuuin Dash'],
            'burst': ['Yoohoo Art: Mujina Flurry'],
        },
    ),
    someone_more_capable=Template(
        sentences=[
            ['text_value'],
            ['text_value_hp', 'ignore'],
        ],
    ),
    no_work_today=Template(
        sentences=[
            ['text_percent_hp'],
        ],
    ),
    multi_task_no_jutsu=Template(
        sentences=[
            [],
        ],
    ),
    egress_prep_rus=Template(
        sentences=[
            ['dmg_skill_sayu_hold', 'ignore', 'dmg_skill_sayu_hold', 'ignore'],
          ],
    ),
    egress_prep_eng=Template(
        sentences=[
            ['dmg_skill_sayu_hold', 'ignore', 'dmg_skill_sayu_hold'],
            ['ignore'],
        ],
    ),
    new_and_improved=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    sleep_oclock_rus=Template(
        sentences=[
            [],
            [None, None, None, None],
        ],
    ),
    sleep_oclock_eng=Template(
        sentences=[
            [],
            [None],
            [None, None],
            [None],
        ],
    ),
)
