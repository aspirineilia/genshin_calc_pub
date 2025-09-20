from ...template import Template, TemplateList


char_arataki_itto = TemplateList(
    default_rus=Template(
        names=[
            'Аратаки Итто',
            'Аратаки кэсагири', 'скорость атаки', 'защиты', 'защита', 'атака',
            'Яростный король óни', 'Крит. урон', 'Невероятной силы', 'Невероятную силу',
        ],
        skills={
            'skill': [],
            'burst': ['Явления короля: Итто Жестокий!', 'Явление короля: Итто Жестокий!'],
        },
    ),
    default_eng=Template(
        names=[
            'Arataki Itto', 'Itto',
            'Arataki Kesagiri', 'Superlative Superstrength', 'Raging Oni King',
        ],
        skills={
            'skill': [],
            'burst': ['Royal Descent: Behold, Itto the Evil!'],
        },
    ),
    arataki_ichiban=Template(
        patterns=[
            (r'<br><br>', '<br>'),
        ],
        sentences=[
            ['atk_speed_charged'],
            ['text_percent_max'],
        ],
    ),
    bloodline_of_the_crimson_oni=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    stay_a_while_and_listen_up=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    gather_round_its_a_brawl_rus=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    gather_round_its_a_brawl_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    jailhouse_bread_and_butter_rus=Template(
        sentences=[
            ['ignore', 'def_percent', 'atk_percent'],
        ],
    ),
    jailhouse_bread_and_butter_eng=Template(
        sentences=[
            ['def_percent', 'atk_percent', 'ignore'],
        ],
    ),
    arataki_itto_present=Template(
        sentences=[
            ['crit_dmg_charged'],
            ['ignore'],
        ],
    ),
)
