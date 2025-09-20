from ...template import Template, TemplateList


char_escoffier = TemplateList(
    default_rus=Template(
        names=[
            'Эскофье',
            'Восстановительной диеты', 'Вдохновение в пряностях',
            'кулинарного мека', 'Свежего яства', 'Холодных закусок', 'Добрая еда лучше лекарств',
            'Кулинарный мек: Режим холодильника', 'Кулинарного мека: Режим холодильника',
        ],
        skills={
            'skill': ['Готовка на малом огне', 'режиме холодильника'],
            'burst': ['Приём нарезки'],
        },
    ),
    default_eng=Template(
        names=[
            'Escoffier',
            'Rehab Diet', 'Inspiration-Immersed Seasoning',
            'Freshly-Prepped Delicacy', 'Cold Dish', 'Better to Salivate Than Medicate',
            'Cooking Mek: Cold Storage Mode', 'Special-Grade Frosty Parfait', 'Cooking Mek',
        ],
        skills={
            'skill': ['Low-Temperature Cooking'],
            'burst': ['Scoring Cuts'],
        },
    ),
    better_to_salivate_than_medicate=Template(
        sentences=[
            ['9:ignore', '1:ignore', '138.24:text_percent_dmg'],
        ],
    ),
    inspiration_immersed_seasoning=Template(
        patterns=[
            (r'1/2/3/4', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}/format{text_number=4|4}'),
            (r'5%/10%/15%/55%', 'format{text_number=1|5}/format{text_number=2|10}/format{text_number=3|15}/format{text_number=4|55}%'),
        ],
        sentences=[
            [
                '1:ignore', '1:ignore', '2:ignore', '2:ignore', '3:ignore', '3:ignore', '4:ignore', '4:ignore',
                '1:ignore', '5:ignore', '2:ignore', '10:ignore', '3:ignore', '15:ignore', '4:ignore', '55:ignore',
                '12:ignore',
            ],
        ],
    ),
    pre_dinner_dance_for_your_taste_buds=Template(
        sentences=[
            ['4:ignore', '60:crit_dmg_cryo', '15:ignore'],
        ],
    ),
    fresh_fragrant_stew_is_an_art_rus=Template(
        sentences=[
            ['15:ignore', '5:ignore'],
            ['1:ignore', '240:text_percent_dmg'],
        ],
    ),
    fresh_fragrant_stew_is_an_art_eng=Template(
        sentences=[
            ['15:ignore'],
            ['5:ignore'],
            ['1:ignore', '240:text_percent_dmg'],
        ],
    ),
    secret_rosemary_recipe=Template(
        sentences=[
            ['6:ignore'],
            ['100:crit_dmg_escofier_heal', '2:ignore'],
            [],
            ['7:ignore'],
        ],
    ),
    tea_parties_bursting_with_color=Template(
        sentences=[
            ['500:text_percent_dmg'],
            ['0.5:ignore', '6:ignore'],
        ],
    ),
)
