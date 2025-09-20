from ...template import Template, TemplateList


char_yelan = TemplateList(
    default_rus=Template(
        names=[
            'Е Лань',
            'Изысканных игральных костей', 'Стратега', 'Прорывными стрелами', 'Прорывных стрел',
        ],
        skills={
            'skill': ['Переплетённая нить жизни', 'Нити жизни'],
            'burst': ['Изысканный бросок', 'Изысканные игральные кости'],
        },
    ),
    default_eng=Template(
        names=[
            'Yelan',
            'Exquisite Throw', 'Lifeline', 'Mastermind', 'Breakthrough Barbs', 'Depth-Clarion Dice',
        ],
        skills={
            'skill': ['Lingering Lifeline', 'Lifeline'],
            'burst': ['Exquisite Throw', 'Depth-Clarion Dice'],
        },
    ),
    turn_control_rus=Template(
        patterns=[
            (r'1/2/3/4', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}/format{text_number=4|4}'),
            (r'6%/12%/18%/30%', 'format{text_number=1|6}/format{text_number=2|12}/format{text_number=3|18}/format{text_number=4|30}%'),
        ],
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore'],
            ['ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    turn_control_eng=Template(
        patterns=[
            (r'1/2/3/4', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}/format{text_number=4|4}'),
            (r'6%/12%/18%/30%', 'format{text_number=1|6}/format{text_number=2|12}/format{text_number=3|18}/format{text_number=4|30}%'),
        ],
        sentences=[
            [
                'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore',
                'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore', 'ignore',
            ],
        ],
    ),
    adapt_with_ease_rus=Template(
        sentences=[
            [None, None],
            ['ignore'],
        ],
    ),
    adapt_with_ease_eng=Template(
        sentences=[
            [None],
            [None],
            ['ignore'],
        ],
    ),
    enter_the_plotters=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    taking_all_comers_rus=Template(
        sentences=[
            ['text_percent'],
            ['ignore'],
        ],
    ),
    taking_all_comers_eng=Template(
        sentences=[
            ['text_percent', 'ignore'],
        ],
    ),
    bait_and_switch_rus=Template(
        sentences=[
            ['ignore'],
            ['hp_percent'],
            ['text_percent_max'],
        ],
    ),
    bait_and_switch_eng=Template(
        sentences=[
            ['hp_percent', 'ignore'],
            ['text_percent_max'],
        ],
    ),
    winner_takes_all=Template(
        patterns=[
            ('<br><br>', '<br>'),
        ],
        sentences=[
            [],
            ['text_percent', 'ignore', 'ignore'],
        ],
    ),
)
