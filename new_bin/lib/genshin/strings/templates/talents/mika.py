from ...template import Template, TemplateList


char_mika = TemplateList(
    default_rus=Template(
        names=[
            'Мика', 'Мики',
            'Ветер духа', 'Ветра духа',
            'Выслеживания', 'стрела потока инея', 'Осколок ледяной звезды', 'Сигнала ледяной звезды',
            'Орлиного пера', 'Орлиное перо', 'Подавляющий обстрел', 'Вихря звёздного инея', 'Песни небесного пера',
        ],
        skills={
            'skill': ['Вихрь звёздного инея', 'Вихря звёздного инея'],
            'burst': ['Песни небесного пера', 'Песнь небесного пера'],
        },
    ),
    default_eng=Template(
        names=[
            'Mika',
            'Soulwind', 'Starfrost Swirl', 'Detector', 'Flowfrost Arrow', 'Rimestar Shard',
            'Suppressive Barrage', 'Skyfeather Song', 'Eagleplume', 'ATK SPD', 'Rimestar Flare',
        ],
        skills={
            'skill': ['Starfrost Swirl'],
            'burst': ['Skyfeather Song'],
        },
    ),
    suppressive_barrage_rus=Template(
        sentences=[
            ['dmg_phys', 'ignore', 'ignore', 'ignore'],
            ['ignore', 'ignore'],
            [],
        ],
    ),
    suppressive_barrage_eng=Template(
        patterns=[
            (r'Starfrost anemo{Swirl}', 'name{Starfrost Swirl}'),
        ],
        sentences=[
            ['dmg_phys', 'ignore', 'ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    topographical_mapping=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    factor_confluence=Template(
        sentences=[
            [],
            [],
        ],
    ),
    companions_ingress=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    sunfrost_encomium_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    sunfrost_encomium_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    companions_counsel=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['ignore'],
            [],
            ['crit_dmg_phys'],
        ],
        results=[
            [0, 1],
            [2],
        ],
    ),
)
