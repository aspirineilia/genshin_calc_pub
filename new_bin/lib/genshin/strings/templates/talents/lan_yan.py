from ...template import Template, TemplateList


char_lan_yan = TemplateList(
    default_rus=Template(
        names=[
            'Лань Янь',
            'Порхающий танец ласточкиных перьев', 'Порхающего танца ласточкиных перьев',
            'Щит порхающей ласточки', 'Кольца лунного пера', 'Кольцо лунного пера',
            'Четыре запечатывающих прорицание амулета',
        ],
        skills={
            'skill': ['Порхающий танец ласточкиных перьев', 'Порхающего танца ласточкиных перьев', 'Щит порхающей ласточки'],
            'burst': ['Лучезарный восход луны'],
        },
    ),
    default_eng=Template(
        names=[
            'Lan Yan',
            'Swallow-Wisp Pinion Dance', 'Swallow-Wisp Shield', 'Feathermoon Rings', 'Feathermoon Ring', 'Four Sealing Divination Charms',
        ],
        skills={
            'skill': ['Swallow-Wisp Pinion Dance', 'Swallow-Wisp Shield'],
            'burst': ['Lustrous Moonrise'],
        },
    ),
    four_sealing_divination_charms=Template(
        sentences=[
            ['250:ignore', '50:text_percent_dmg'],
            [],
        ],
    ),
    skyfeather_evil_subduing_charm=Template(
        sentences=[
            ['309:skill_base_mastery_percent', '774:burst_base_mastery_percent'],
        ],
    ),
    as_one_might_stride_betwixt_the_clouds=Template(
        sentences=[
            [],
        ],
    ),
    dance_vestments_billow_like_rainbow_jade=Template(
        sentences=[
            ['40:ignore'],
            ['2:ignore'],
        ],
    ),
    with_drakefalcons_blood_pearls_adorned_rus=Template(
        sentences=[
            ['12:ignore', '60:mastery'],
        ],
    ),
    with_drakefalcons_blood_pearls_adorned_eng=Template(
        sentences=[
            ['60:mastery', '12:ignore'],
        ],
    ),
    let_us_away_on_slyphic_wing_the_silvered_ornaments_to_ring=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
)
