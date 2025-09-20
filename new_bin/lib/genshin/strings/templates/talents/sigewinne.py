from ...template import Template, TemplateList


char_sigewinne = TemplateList(
    default_rus=Template(
        names=[
            'Сиджвин',
            'Прыгучую гидротерапию', 'Полупринудительного покоя', 'Выздоровления', 'Прыгучей гидротерапии',
            'элементальные навыки', 'Долга жизни', 'Бодрящий бальзам-пузырь', 'Бодрящий пузырёк', 'Сверхнасыщенная инъекция',
            'Требуется полноценный отдых', 'бальзам-пузыря', 'щит-пузырь',
        ],
        skills={
            'skill': ['Прыгучую гидротерапию', 'Прыгучей гидротерапии', 'Бодрящий бальзам-пузырь'],
            'burst': ['Сверхнасыщенную инъекцию', 'Сверхнасыщенной инъекции', 'Сверхнасыщенная инъекция'],
        },
    ),
    default_eng=Template(
        patterns=[
            ('Convalesence', 'Convalescence'),
        ],
        names=[
            'Sigewinne',
            'Semi-Strict Bedrest', 'Convalescence', 'Bonds of Life', 'Bubbly Shield',
            'Rebound Hydrotherapy', 'Bolstering Bubblebalm', 'Requires Appropriate Rest', 'Bubblebalms', 'Bubblebalm',
            'Super Saturated Syringing',
        ],
        skills={
            'skill': ['Rebound Hydrotherapy', 'Bolstering Bubblebalm'],
            'burst': ['Super Saturated Syringing'],
        },
    ),
    requires_appropriate_rest_rus=Template(
        patterns=[
            ('30 000', '30000'),
        ],
        sentences=[
            ['18:ignore', '8:dmg_hydro', '10:ignore'],
            ['1:ignore'],
            ['1000:ignore'],
            ['30000:text_value_hp'],
            ['80:text_value_dmg'],
            ['2800:text_value_max'],
        ],
        results=[
            [0],
            [1, 2, 3, 4, 5],
        ],
    ),
    requires_appropriate_rest_eng=Template(
        patterns=[
            ('30 000', '30000'),
        ],
        sentences=[
            ['18:ignore', '8:dmg_hydro', '10:ignore'],
            ['1:ignore'],
            ['1000:ignore', '30000:text_value_hp', '80:text_value_dmg'],
            ['2800:text_value_max'],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
    detailed_diagnosis_thorough_treatment=Template(
        sentences=[
            ['1000:ignore', '3:text_percent'],
            ['30:text_percent_max'],
        ],
    ),
    can_the_happiest_of_spirits_understand_anxiety_rus=Template(
        patterns=[
            ('30 000', '30000'),
        ],
        sentences=[
            ['3:ignore', '1:ignore'],
            ['1000:ignore'],
            ['30000:text_value_hp', '100:text_value_dmg'],
            ['3500:text_value_max'],
            [],
        ],
    ),
    can_the_most_merciful_of_spirits_defeat_its_foes_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['30:text_percent'],
            ['250:ignore'],
            [],
            ['8:ignore', '35:enemy_res_hydro'],
        ],
        results=[
            [0, 1, 2],
            [3],
        ],
    ),
    can_the_most_merciful_of_spirits_defeat_its_foes_eng=Template(
        patterns=[
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['30:text_percent', '250:ignore'],
            [],
            ['35:enemy_res_hydro', '8:ignore'],
        ],
        results=[
            [0, 1],
            [2],
        ],
    ),
    can_the_loveliest_of_spirits_keep_decay_at_bay=Template(
        sentences=[
            ['3:ignore'],
        ],
    ),
    can_the_most_radiant_of_spirits_pray_for_me_rus=Template(
        sentences=[
            [],
            ['1000:ignore'],
            ['0,4:text_percent_1', '2,2:text_percent_2', '15:ignore'],
            ['20:text_percent_1_max', '110:text_percent_2_max'],
        ],
    ),
    can_the_most_radiant_of_spirits_pray_for_me_eng=Template(
        sentences=[
            [],
            ['1000:ignore', '0,4:text_percent_1', '2,2:text_percent_2', '15:ignore'],
            ['20:text_percent_1_max', '110:text_percent_2_max'],
        ],
    ),
)
