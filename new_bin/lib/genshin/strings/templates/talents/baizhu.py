from ...template import Template, TemplateList


char_baizhu = TemplateList(
    default_rus=Template(
        names=[
            'Бай Чжу',
            'Бесшовного щита', 'Год зелёного благодеяния', 'Бесшовный щит',
            'Летучего духа: Разрез', 'Летучий дух: Разрез', 'Летучим духом: Разрез', 'Летучего духа', 'Летучим духом',
            'Универсальной диагностики', 'Целостного восстановления', 'Призрачных артерий',
        ],
        skills={
            'skill': ['Универсальная диагностика', 'Универсальной диагностики'],
            'burst': [
                'Целостное восстановление', 'Целостного восстановления', 'Целостность выздоровления',
                'Бесшовного щита', 'Летучего духа',
            ],
        },
    ),
    default_eng=Template(
        names=[
            'Baizhu',
            'Seamless Shields', 'Year of Verdant Favor',
            'Gossamer Sprite: Splice', 'Gossamer Sprite', 'Spiritveins',
        ],
        skills={
            'skill': ['Universal Diagnosis'],
            'burst': ['Holistic Revivification', 'Seamless Shields', 'Gossamer Sprite'],
        },
    ),
    five_fortunes_forever=Template(
        patterns=[
            (r'<br>·', '\\n'),
        ],
        sentences=[
            [],
            ['ignore', 'healing'],
            ['ignore', 'dmg_dendro'],
        ],
        results=[
            [0, 1],
            [0, 2],
        ],
    ),
    all_things_are_of_the_earth_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore', 'ignore', None, None],
        ],
    ),
    all_things_are_of_the_earth_eng=Template(
        sentences=[
            ['ignore', 'ignore', None, None],
            ['ignore'],
        ],
    ),
    attentive_observation=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    incisive_discernment_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore', None, 'ignore'],
        ],
    ),
    incisive_discernment_eng=Template(
        sentences=[
            ['ignore', 'ignore', None, 'ignore'],
        ],
    ),
    ancient_art_of_perception=Template(
        sentences=[
            ['ignore', 'mastery'],
        ],
    ),
    elimination_of_malicious_qi_rus=Template(
        sentences=[
            ['text_percent'],
            ['ignore'],
            [],
        ],
    ),
    elimination_of_malicious_qi_eng=Template(
        sentences=[
            ['text_percent', 'ignore'],
            [],
        ],
    ),
)
