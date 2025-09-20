from ...template import Template, TemplateList


char_chasca = TemplateList(
    default_rus=Template(
        names=[
            'Часку', 'Часка', 'Часки', 'Часке', 'Чаской',
            'Огонь по множеству целей', 'Огня по множеству целей', 'Поводья охоты за тенью', 'Обращение духовной связи',
            'Пулю охотника на тени', 'Сияющую пулю охотника на тени', 'Духа сияющей тени', 'Сияющих пуль охотника на тени',
            'Горящей пулей охотника на тени', 'Пули охотника на тени', 'Горящая пуля охотника на тени',
            'Трюк с пулей', 'Обращения духовной связи',
            'Сверкающих пуль ловца душ', 'Роковых выстрелов', 'Роковой выстрел ловца душ',
        ],
        skills={
            'skill': [
                'Огонь по множеству целей', 'Огня по множеству целей',
                'Поводья охоты за тенью', 'Сияющую пулю охотника на тени', 'Сияющих пуль охотника на тени',
                'Пули охотника на тени', 'Пуля охотника на тени', 'Пулю охотника на тени',
            ],
            'burst': [
                'Сверкающих пуль ловца душ', 'Сверкающей пули ловца душ', 'Роковой выстрел ловца душ', 'Рокового выстрела ловца душ',
            ],
        },
    ),
    default_eng=Template(
        patterns=[
            ('pyro{Burning}', 'Burning'),
        ],
        names=[
            'Chasca',
            'Spiritbinding Conversion', 'Shadowhunt Shell', 'Shining Shadowhunt Shell',
            'Spirit of the Radiant Shadow', 'Multitarget Fire', 'Burning Shadowhunt Shot',
            'Bullet Trick', 'Soul Reaper\'s Fatal Round', 'Fatal Rounds',
        ],
        skills={
            'skill': [
                'Spirit Reins, Shadow Hunt', 'Multitarget Fire', 'Shadowhunt Shell',
                'Shining Shadowhunt Shells', 'Shining Shadowhunt Shell',
            ],
            'burst': ['Radiant Soulseeker Shells', 'Soul Reaper\'s Fatal Round'],
        },
    ),
    bullet_trick_rus=Template(
        sentences=[
            ['33.3:ignore', '66.7:ignore', '100:ignore', '1:ignore', '15:text_percent_dmg_1', '35:text_percent_dmg_2', '65:text_percent_dmg_3'],
            ['3:ignore'],
        ],
    ),
    bullet_trick_eng=Template(
        sentences=[
            ['33.3:ignore', '66.7:ignore', '100:ignore', '3:ignore', '1:ignore', '15:text_percent_dmg_1', '35:text_percent_dmg_2', '65:text_percent_dmg_3'],
            [],
            ['3:ignore'],
        ],
    ),
    intent_to_cover=Template(
        sentences=[
            ['150:text_percent_anemo'],
            ['150:text_percent_elemental'],
        ],
    ),
    cylinder_the_restless_roulette_rus=Template(
        sentences=[
            ['33.3:ignore', '100:ignore', '30:ignore'],
        ],
    ),
    cylinder_the_restless_roulette_eng=Template(
        sentences=[
            ['2:ignore', '33.3:ignore', '100:ignore', '30:ignore'],
        ],
    ),
    muzzle_the_searing_smoke_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['1:ignore'],
            [],
            ['400:text_percent_dmg'],
            [],
            [],
        ],
        results=[
            [0, 1],
            [2, 3, 4],
        ],
    ),
    muzzle_the_searing_smoke_eng=Template(
        patterns=[
            ('<br>In addition', '\\nIn addition'),
        ],
        sentences=[
            ['1:ignore'],
            ['400:text_percent_dmg'],
            [],
            [],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
    sparks_the_sudden_shot=Template(
        sentences=[
            ['1.5:ignore', '400:text_percent_dmg'],
            [],
        ],
    ),
    showdown_the_glory_of_battle_rus=Template(
        sentences=[
            [],
            ['3:ignore', '120:crit_dmg_chasca'],
            ['3:ignore'],
        ],
    ),
    showdown_the_glory_of_battle_eng=Template(
        sentences=[
            ['3:ignore', '120:crit_dmg_chasca', '1:ignore', '3:ignore'],
        ],
    ),
)
