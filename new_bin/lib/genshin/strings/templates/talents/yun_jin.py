from ...template import Template, TemplateList


char_yun_jin = TemplateList(
    default_rus=Template(
        names=[
            'Юнь Цзинь',
        ],
        skills={
            'skill': ['Вихревое представление'],
            'burst': ['Строй облачных флагов', 'Стяга разрушителя скал'],
        },
    ),
    default_eng=Template(
        patterns=[
            ('name{Charged}', 'Charged'),
        ],
        names=[
            'Yun Jin',
            'Level 2 Charged', 'Opening Flourish',
        ],
        skills={
            'skill': ['Opening Flourish\'s', 'Opening Flourish'],
            'burst': ['Flying Cloud Flag Formation', 'Cliffbreaker\'s Banner'],
        },
    ),
    true_to_oneself_rus=Template(
        sentences=[
            [],
        ],
    ),
    true_to_oneself_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    breaking_conventions=Template(
        patterns=[
            (r'1/2/3/4', 'format{yunjin_traditionalist_stacks=1|1}/format{yunjin_traditionalist_stacks=2|2}/format{yunjin_traditionalist_stacks=3|3}/format{yunjin_traditionalist_stacks=4|4}'),
            (r'2,5%/5%/7,5%/11,5%', 'format{yunjin_traditionalist_stacks=1|2.5}/format{yunjin_traditionalist_stacks=2|5}/format{yunjin_traditionalist_stacks=3|7.5}/format{yunjin_traditionalist_stacks=4|11.5}%'),
            (r'2.5%/5%/7.5%/11.5%', 'format{yunjin_traditionalist_stacks=1|2.5}/format{yunjin_traditionalist_stacks=2|5}/format{yunjin_traditionalist_stacks=3|7.5}/format{yunjin_traditionalist_stacks=4|11.5}%'),
        ],
        sentences=[
            [
                'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore',
                'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore',
            ],
        ],
    ),
    thespian_gallop=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    myriad_mise_en_scene=Template(
        sentences=[
            ['dmg_normal', 'ignore'],
        ],
    ),
    flower_and_a_fighter_rus=Template(
        sentences=[
            ['ignore', 'def_percent'],
        ],
    ),
    flower_and_a_fighter_eng=Template(
        sentences=[
            ['def_percent', 'ignore'],
        ],
    ),
    decorous_harmony=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
)
