from ...template import Template, TemplateList


char_traveler = TemplateList(
    default_rus=Template(
        names=[
            'путешественника', 'путешественнику',
            'Лучезарного лотоса', 'Преобращения света', 'Ползучая поросль', 'Преобращения света', 'Лотосовый светильник',
            'Лучезарным лотосом', 'Преобращение света', 'Лотосового светильника',
        ],
        skills={
            'skill': ['Травяной клинок', 'Травяным клинком'],
            'burst': ['Лотосовый светильник', 'Пригибающий траву ветер', 'Пригибающим траву ветром', 'Лотосового светильника'],
        },
    ),
    default_eng=Template(
        names=[
            'Traveler',
            'Overflowing Lotuslight', 'Lotuslight Transfiguration', 'Verdant Overgrowth',
        ],
        skills={
            'skill': ['Razorgrass Blade'],
            'burst': ['Lea Lotus Lamp', 'Surgent Manifestation'],
        },
    ),
    verdant_overgrowth_rus=Template(
        sentences=[
            ['mastery'],
            ['ignore'],
        ],
    ),
    verdant_overgrowth_eng=Template(
        sentences=[
            ['mastery', 'ignore'],
        ],
    ),
    verdant_luxury=Template(
        sentences=[
            [None, None],
        ],
    ),
    symbiotic_creeper=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    green_resilience=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    treacle_grass=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    withering_aggregation=Template(
        sentences=[
            ['dmg_dendro'],
            [None],
        ],
        results=[
            [0],
            [1],
        ],
    ),
)
