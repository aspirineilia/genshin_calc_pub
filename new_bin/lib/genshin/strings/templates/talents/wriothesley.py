from ...template import Template, TemplateList


char_wriothesley = TemplateList(
    default_rus=Template(
        names=[
            'Ризли',
            'Кулаков изгнания', 'Кулаки изгнания', 'Благодатное взыскание', 'Благодатного взыскания',
            'заряженная атака', 'Взыскания: Морозный кулак в прыжке', 'Взыскание: Морозный кулак в прыжке',
            'Взысканием: Морозный кулак в прыжке', 'Леденящего наказания', 'Леденящее наказание',
            'Да восторжествует справедливость', 'Да придёт час расплаты за грехи', 'Указа об обвинении',
            'Свирепых кулаков стужи',
        ],
        skills={
            'attack': ['обычной атаки Свирепых кулаков стужи', 'Свирепых кулаков стужи', 'Свирепыми кулаками стужи'],
            'skill': ['Стремительного ледяного клыка'],
            'burst': ['Укуса чернозлатого волка'],
        },
    ),
    default_eng=Template(
        names=[
            'Wriothesley',
            'Gracious Rebuke', 'Rebuke: Vaulting Fist',
            'Chilling Penalty', 'Prosecution Edict',
            'There Shall Be a Plea for Justice', 'Repelling Fists',
            'There Shall Be a Reckoning for Sin',
        ],
        skills={
            'attack': ['Normal Attack: Forceful Fists of Frost'],
            'skill': ['Icefang Rush'],
            'burst': ['Darkgold Wolfbite'],
        },
    ),
    there_shall_be_a_plea_for_justice_rus=Template(
        sentences=[
            ['60:ignore'],
            [],
            ['50:dmg_charged_wriothesley', '30:ignore'],
            ['1:ignore', '5:ignore'],
        ],
    ),
    there_shall_be_a_plea_for_justice_eng=Template(
        sentences=[
            ['60:ignore'],
            [],
            ['50:dmg_charged_wriothesley', '30:ignore', '5:ignore'],
        ],
    ),
    there_shall_be_a_reckoning_for_sin=Template(
        sentences=[
            [],
            ['5:ignore'],
            ['6:atk_percent'],
        ],
    ),
    terror_for_the_evildoers_rus=Template(
        sentences=[
            ['60:ignore'],
            ['1:ignore', '2.5:ignore', '200:text_percent_dmg', '4:ignore'],
            [],
        ],
    ),
    terror_for_the_evildoers_eng=Template(
        sentences=[
            ['60:ignore', '1:ignore', '2.5:ignore', '200:text_percent_dmg', '4:ignore', '1:ignore', '1:ignore'],
        ],
    ),
    shackles_for_the_arrogant=Template(
        sentences=[
            ['40:text_percent'],
        ],
    ),
    redemption_for_the_suffering_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['50:ignore'],
            [],
            [],
            [],
            ['20:atk_speed_normal', '4:ignore'],
            ['10:atk_speed_normal', '6:ignore'],
            [],
        ],
        results=[
            [0, 1, 2, 3, 6],
            [4],
            [5],
            [3, 5],
        ],
    ),
    redemption_for_the_suffering_eng=Template(
        patterns=[
            ('<br>Additionally, when', '\\nAdditionally, when'),
        ],
        sentences=[
            ['50:ignore'],
            [],
            [],
            ['20:atk_speed_normal', '4:ignore'],
            ['10:atk_speed_normal', '6:ignore'],
            [],
        ],
        results=[
            [0, 1, 2, 5],
            [3],
            [4],
            [2, 4],
        ],
    ),
    esteem_for_the_innocent=Template(
        sentences=[
            ['10:crit_rate_charged_wriothesley', '80:crit_dmg_charged_wriothesley'],
            ['100:ignore'],
            [],
        ],
    ),
)
