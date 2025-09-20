from ...template import Template, TemplateList


char_nilou = TemplateList(
    default_rus=Template(
        names=[
            'Нилу',
            'Ядер изобилия', 'Изобилия золотого кубка', 'Изобилием золотого кубка',
            'Сияющей иллюзии', 'Ауры покоя', 'Зал кружащих лепестков',
            'Танец Хафткаршвар', 'Танца Хафткаршвар',
            'Танца Абзендеги: Далёкие мечты',
        ],
        skills={
            'skill': ['Танец Хафткаршвар', 'Танца Хафткаршвар'],
            'burst': ['Танца Абзендеги: Далёкие мечты, внемлющий ручей'],
        },
    ),
    default_eng=Template(
        names=[
            'Nilou',
            'Bountiful Cores', 'Golden Chalice\'s Bounty',
            'Luminous Illusion', 'Tranquility Aura', 'Court of Dancing Petals',
            'Dance of Haftkarsvar',
        ],
        skills={
            'skill': ['Dance of Haftkarsvar'],
            'burst': ['Dance of Abzendegi: Distant Dreams, Listening Spring'],
        },
    ),
    court_of_dancing_petals_rus=Template(
        patterns=[
            (r'Если персонажи под воздействием', '\\nЕсли персонажи под воздействием'),
        ],
        sentences=[
            ['ignore'],
            ['mastery', 'ignore'],
            [],
            [],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    court_of_dancing_petals_eng=Template(
        patterns=[
            (r'Если персонажи под воздействием', '\\nЕсли персонажи под воздействием'),
        ],
        sentences=[
            ['ignore', 'ignore', 'ignore'],
            [],
            [],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    dreamy_dance_of_aeons_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
            [None, None],
        ],
    ),
    dreamy_dance_of_aeons_eng=Template(
        sentences=[
            ['ignore', 'ignore', None, None],
        ],
    ),
    dance_of_the_waning_moon=Template(
        sentences=[
            ['dmg_skill_nilou', 'ignore'],
        ],
    ),
    the_starry_skies_their_flowers_rain_rus=Template(
        patterns=[
            (r'dendro{Дендро сопротивление}', '\\ndendro{Дендро сопротивление}'),
            (r'Требуется разблокировать', '\\nТребуется разблокировать'),
        ],
        sentences=[
            ['enemy_res_hydro', 'ignore'],
            ['enemy_res_dendro', 'ignore'],
            [],
        ],
        results=[
            [0, 2],
            [1, 2],
        ],
    ),
    the_starry_skies_their_flowers_rain_eng=Template(
        sentences=[
            ['enemy_res_hydro', 'ignore'],
            ['enemy_res_dendro', 'ignore'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    fricative_pulse_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'dmg_burst'],
        ],
    ),
    fricative_pulse_eng=Template(
        sentences=[
            ['ignore', 'dmg_burst', 'ignore'],
        ],
    ),
    frostbreakers_melody_rus=Template(
        sentences=[
            ['ignore'],
            ['text_percent_rate', 'text_percent_dmg', 'text_percent_rate_max', 'text_percent_dmg_max'],
        ],
    ),
    frostbreakers_melody_eng=Template(
        sentences=[
            ['ignore', 'text_percent_rate', 'text_percent_dmg', 'text_percent_rate_max', 'text_percent_dmg_max'],
        ],
    ),
)
