from ...template import Template, TemplateList


char_sethos = TemplateList(
    default_rus=Template(
        names=[
            'Сетоса', 'Сетос',
            'Пронзающий тени выстрел', 'Пронзающих тени выстрелов', 'Пронзающих тени выстрела', 'Пронзающего тени выстрела',
            'Тени палящих песков', 'Загадка чёрного коршуна', 'Болт сумрака',
        ],
        skills={
            'attack': ['Пронзающий тени выстрел', 'Пронзающего тени выстрела'],
            'skill': ['Древний обряд: Громогласный рёв песка'],
            'burst': ['Тайный ритуал: Сумеречный пронзитель теней', 'Болт сумрака'],
        },
    ),
    default_eng=Template(
        names=[
            'Sethos',
            'Scorching Sandshade', 'Shadowpiercing Shots', 'Shadowpiercing Shot',
            'Black Kite\'s Enigma',
        ],
        skills={
            'attack': ['Shadowpiercing Shots', 'Shadowpiercing Shot'],
            'skill': ['Ancient Rite: The Thundering Sands'],
            'burst': ['Secret Rite: Twilight Shadowpiercer', 'Dusk Bolt'],
        },
    ),
    black_kites_enigma=Template(
        patterns=[
            ('0,285', '0.285'),
        ],
        sentences=[
            ['0.285:ignore'],
            ['0.3:ignore', '20:ignore'],
            ['1:ignore', '50:ignore'],
        ],
    ),
    the_sand_kings_boon=Template(
        sentences=[
            ['700:text_percent', '5:ignore', '4:ignore', '15:ignore'],
        ],
    ),
    sealed_shrines_spiritsong=Template(
        sentences=[
            ['15:crit_rate_sethos'],
        ],
    ),
    papyrus_scripture_of_silent_secrets_rus=Template(
        sentences=[
            ['10:ignore', '15:dmg_electro', '2:ignore'],
            [],
        ],
    ),
    papyrus_scripture_of_silent_secrets_eng=Template(
        sentences=[
            ['15:dmg_electro', '10:ignore'],
        ],
    ),
    beneficent_plumage_rus=Template(
        sentences=[
            ['2:ignore', '10:ignore', '80:mastery'],
        ],
    ),
    beneficent_plumage_eng=Template(
        sentences=[
            ['2:ignore', '80:mastery', '10:ignore'],
        ],
    ),
    pylon_of_the_sojourning_sun_temple=Template(
        sentences=[
            [],
            ['15:ignore'],
            [],
        ],
    ),
)
