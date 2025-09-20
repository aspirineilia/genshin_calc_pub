from ...template import Template, TemplateList


char_skirk = TemplateList(
    default_rus=Template(
        names=[
            'Скирк',
            'Разрыв пустоты', 'Разрыва пустоты', 'Разрывов пустоты', 'Разрывы пустоты', 'Семифазной вспышки',
            'Переправы смерти', 'Разум за гранью разума', 'Возвращение в небытие', 'Хаос: Отсечение',
        ],
        skills={
            'skill': ['Хаос: Искажение'],
            'burst': ['Хаос: Опустошение'],
        },
    ),
    default_eng=Template(
        names=[
            'Skirk',
            'Void Rifts', 'Void Rift', 'Seven-Phase Flash mode', 'Death\'s Crossing',
            'Reason Beyond Reason', 'Return to Oblivion', 'Havoc: Sever',
        ],
        skills={
            'skill': ['Havoc: Warp'],
            'burst': ['Havoc: Ruin', 'Havoc: Extinction'],
        },
    ),
    reason_beyond_reason_rus=Template(
        sentences=[
            [],
            ['2.5:ignore'],
            ['3:ignore', '8:ignore'],
        ],
    ),
    reason_beyond_reason_eng=Template(
        sentences=[
            [],
            ['2.5:ignore', '3:ignore', '8:ignore'],
        ],
    ),
    return_to_oblivion=Template(
        sentences=[
            ['20:ignore'],
            ['3:ignore', '1:ignore', '110:ignore', '120:ignore', '170:ignore', '105:ignore', '115:ignore', '160:ignore'],
        ],
    ),
    mutual_weapons_mentorship_rus=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
    mutual_weapons_mentorship_eng=Template(
        sentences=[
            ['1:ignore', '1:ignore', '1:ignore'],
        ],
    ),
    far_to_fall=Template(
        sentences=[
            ['500:text_percent_dmg'],
            [],
        ],
    ),
    into_the_abyss_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['10:ignore', '10:ignore'],
            [],
            ['12.5:ignore', '70:ignore'],
            [],
        ],
        results=[
            [0, 1],
            [2, 3],
        ],
    ),
    into_the_abyss_eng=Template(
        patterns=[
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['10:ignore', '10:ignore'],
            ['12.5:ignore', '70:ignore'],
            [],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    fractured_flow=Template(
        sentences=[
            ['10:ignore', '20:ignore', '40:ignore'],
        ],
    ),
    to_the_source_rus=Template(
        sentences=[
            ['1:ignore'],
            ['15:ignore', '3:ignore'],
            ['750:text_percent_dmg_1'],
            ['1:ignore', '3:ignore', '180:text_percent_dmg_2'],
            ['1:ignore', '80:ignore', '3:ignore', '180:text_percent_dmg_2'],
            [],
        ],
    ),
    to_the_source_eng=Template(
        sentences=[
            ['1:ignore'],
            [],
            ['15:ignore', '3:ignore', '750:text_percent_dmg_1'],
            ['1:ignore', '3:ignore'],
            ['180:text_percent_dmg_2'],
            ['1:ignore', '80:ignore', '3:ignore', '180:text_percent_dmg_2'],
            [],
        ],
    ),
)
