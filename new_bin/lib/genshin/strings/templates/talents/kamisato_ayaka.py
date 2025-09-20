from ...template import Template, TemplateList


char_kamisato_ayaka = TemplateList(
    default_rus=Template(
        names=[
            'Камисато Аяка', 'Аяки',
            'Усурахи буто', 'Морозных сэки но то', 'Морозного сэки но то',
        ],
        skills={
            'skill': ['Искусство Камисато: Хёка'],
            'other': ['Искусство Камисато: Сэнхо'],
            'burst': ['Искусство Камисато: Сомэцу'],
        },
    ),
    default_eng=Template(
        names=[
            'Kamisato Ayaka',
            'Frostflake Seki no To', 'Usurahi Butou',
        ],
        skills={
            'skill': ['Kamisato Art: Hyouka'],
            'other': ['Kamisato Art: Senho'],
            'burst': ['Kamisato Art: Soumetsu'],
        },
    ),
    amatsumi_kunitsumi_sanctification=Template(
        names=['обычных'],
        sentences=[
            ['dmg_normal', 'ignore'],
        ],
    ),
    kanten_senmyou_blessing=Template(
        sentences=[
            ['ignore', 'dmg_cryo', 'ignore'],
        ],
    ),
    snowswept_sakura=Template(
        names=[
            'обычные', 'заряженные',
        ],
        sentences=[
            ['text_percent_chance', 'ignore'],
            ['ignore'],
        ],
    ),
    blizzard_blade_seki_no_to_rus=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    blizzard_blade_seki_no_to_eng=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    ebb_and_flow=Template(
        names=['защиту'],
        sentences=[
            ['enemy_def_reduce', 'ignore'],
        ],
    ),
    dance_of_suigetsu=Template(
        sentences=[
            ['ignore', 'dmg_charged'],
            ['ignore'],
        ],
    ),
)
