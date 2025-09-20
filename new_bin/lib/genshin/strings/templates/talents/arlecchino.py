from ...template import Template, TemplateList


char_arlecchino = TemplateList(
    default_rus=Template(
        names=[
            'Арлекино',
            'Веление кровавого долга', 'Велением кровавого долга',
            'Кровавого долга: Взыскание', 'Кровавый долг: Взыскание', 'Кровавым долгом: Взыскание',
            'Долгом жизни', 'Долг жизни', 'Долга жизни',
            'Всё превращается в прах', 'Маска Красной Смерти', 'Маски Красной Смерти', 'Пламя роковой луны',
            'Лишь страдания искупят',
        ],
        skills={
            'skill': ['Веление кровавого долга', 'Всё превращается в прах'],
            'burst': ['Восхождения роковой луны', 'Восхождение роковой луны'],
        },
    ),
    default_eng=Template(
        names=[
            'Arlecchino',
            'Blood-Debt Directives', 'Blood-Debt Directive', 'Directive', 'Blood-Debt Due', 'Due',
            'All Is Ash', 'Masque of the Red Death',
            'Bond of Life', 'Bonds of Life', 'Balemoon Bloodfire', 'Agony Alone May Be Repaid',
        ],
        skills={
            'skill': ['All Is Ash', 'Blood-Debt Directives'],
            'burst': ['Balemoon Rising'],
        },
    ),
    agony_alone_may_be_repaid_rus=Template(
        sentences=[
            ['130:text_percent'],
            ['5:ignore', '130:text_percent'],
        ],
    ),
    agony_alone_may_be_repaid_eng=Template(
        sentences=[
            ['130:text_percent', '5:ignore'],
            ['130:text_percent'],
        ],
    ),
    strength_alone_can_defend_rus=Template(
        sentences=[
            ['100:ignore', '1000:ignore', '1:text_percent'],
            ['20:text_percent_max'],
        ],
    ),
    strength_alone_can_defend_eng=Template(
        sentences=[
            ['1:text_percent', '100:ignore', '1000:ignore'],
            ['20:text_percent_max'],
        ],
    ),
    all_reprisals_and_arrears_mine_to_bear=Template(
        sentences=[
            ['100:text_percent_dmg'],
            [],
        ],
    ),
    all_rewards_and_retribution_mine_to_bestow_rus=Template(
        sentences=[
            ['900:text_percent_dmg', '15:ignore', '20:text_percent'],
            ['10:ignore'],
        ],
    ),
    all_rewards_and_retribution_mine_to_bestow_eng=Template(
        sentences=[
            ['900:text_percent_dmg', '20:text_percent', '15:ignore'],
            ['10:ignore'],
        ],
    ),
    you_shall_love_and_protect_each_other_henceforth=Template(
        sentences=[
            ['2:ignore', '15:ignore'],
            ['10:ignore'],
        ],
    ),
    from_this_day_on_we_shall_delight_in_new_life_together=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['700:text_percent_dmg'],
            ['20:ignore', '10:crit_rate_normal_arlecchino', '70:crit_dmg_normal_arlecchino'],
            ['15:ignore'],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
)
