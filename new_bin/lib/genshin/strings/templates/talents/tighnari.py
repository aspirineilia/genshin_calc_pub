from ...template import Template, TemplateList


char_tighnari = TemplateList(
    default_rus=Template(
        names=[
            'Тигнари',
            'виджняны-кханды', 'стрелу соцветия',
        ],
        skills={
            'attack': ['стрела-венец', 'стрелы-венца'],
            'skill': ['Мина виджняны-пхалы', 'Миной виджняны-пхалы'],
            'burst': ['Стрела-лиана жизни', 'Стрелы-лианы', 'Стрела лианы жизни', 'Стрелы-лианы'],
        },
    ),
    default_eng=Template(
        names=[
            'Tighnari',
            'Vijnana-Khanda Field', 'Clusterbloom Arrow', 'Fashioner\'s Tanglevine Shaft',
        ],
        skills={
            'attack': ['Wreath Arrow'],
            'skill': ['Vijnana-Phala Mine'],
            'burst': ['Fashioner\'s Tanglevine Shaft'],
        },
    ),
    keen_sight=Template(
        sentences=[
            ['mastery', 'ignore'],
        ],
    ),
    scholarly_blade=Template(
        sentences=[
            [None, None],
        ],
    ),
    beginnings_determined_at_the_roots=Template(
        sentences=[
            ['crit_rate_charged'],
        ],
    ),
    origins_known_from_the_stem=Template(
        sentences=[
            ['dmg_dendro', 'ignore'],
        ],
    ),
    withering_glimpsed_in_the_leaves_eng=Template(
        sentences=[
            ['mastery', 'ignore'],
            ['mastery'],
            [],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    withering_glimpsed_in_the_leaves_rus=Template(
        sentences=[
            ['mastery', 'ignore'],
            ['mastery'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    karma_adjudged_from_the_leaden_fruit=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['text_percent_dmg'],
        ],
    ),
)
