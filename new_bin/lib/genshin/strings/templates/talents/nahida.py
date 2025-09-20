from ...template import Template, TemplateList


char_nahida = TemplateList(
    default_rus=Template(
        names=[
            'Нахида', 'Нахиды',
            'Очищения трикармы: Кармическое небытие', 'Очищение трикармы: Кармическое небытие', 'Очищения трикармы',
            'Пелены знаний', 'Семена скандхи', 'Семенем скандхи',
            'Призрачного сердца', 'Святилище Майи',
        ],
        skills={
            'skill': ['Пелены знаний', 'Пелена знаний'],
            'burst': ['Призрачного сердца'],
        },
    ),
    default_eng=Template(
        names=[
            'Nahida',
            'Tri-Karma Purification: Karmic Oblivion',
            'Shrine of Maya', 'Tri-Karma Purification', 'Seeds of Skandha',
        ],
        skills={
            'skill': ['All Schemes to Know'],
            'burst': ['Illusory Heart'],
        },
    ),
    compassion_illuminated=Template(
        sentences=[
            ['25:text_percent', '250:text_value_max'],
        ],
    ),
    awakening_elucidated=Template(
        sentences=[
            ['200:ignore', '0.1:text_percent_skill|0|2', '0.03:text_percent_crit|0|2', '80:text_percent_skill_max', '24:text_percent_crit_max'],
        ],
    ),
    the_seed_of_stored_knowledge=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    the_root_of_all_fullness_rus=Template(
        patterns=[
            (r'\s*· Полученный урон', '\\nПолученный урон'),
            (r'\s*· В течени', '\\nВ течени'),
        ],
        sentences=[
            [],
            ['crit_rate_bloom', 'crit_dmg_bloom'],
            ['ignore', 'enemy_def_reduce'],
        ],
        results=[
            [1],
            [2],
        ],
    ),
    the_root_of_all_fullness_eng=Template(
        patterns=[
            (r'\s*·pyro{Burning}', '\\n·pyro{Burning}'),
            (r'\s*·Within', '\\nWithin'),
        ],
        sentences=[
            [],
            ['crit_rate_bloom', 'crit_dmg_bloom'],
            ['ignore', 'enemy_def_reduce'],
        ],
        results=[
            [1],
            [2],
        ],
    ),
    the_fruit_of_reasons_culmination=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_dmg2', 'ignore', 'ignore', 'ignore'],
        ],
    ),
)
