from ...template import Template, TemplateList


char_emilie = TemplateList(
    default_rus=Template(
        names=[
            'Эмилии', 'Эмилия', 'Эмилией',
            'Аромата', 'Аромат', 'Шкатулка Люмидус', 'Парфюма ясных рос', 'Парфюм ясных рос', 'Непреходящий аромат', 'Благоухающей росы',
            'Стойкое благоухание', 'Стойкого благоухания',
        ],
        skills={
            'skill': ['Аромата', 'Аромат', 'Извлечения ароматов', 'Извлечение ароматов'],
            'burst': ['Толкование ароматов', 'Толкования ароматов'],
        },
    ),
    default_eng=Template(
        names=[
            'Emilie',
            'Scents', 'Scent', 'Lumidouce Case', 'Cleardew Cologne', 'Lingering Fragrance',
            'Abiding Fragrance',
        ],
        skills={
            'skill': ['Scents', 'Scent', 'Fragrance Extraction'],
            'burst': ['Aromatic Explication'],
        },
    ),
    lingering_fragrance_rus=Template(
        sentences=[
            ['600:text_percent_dmg'],
            [],
        ],
    ),
    lingering_fragrance_eng=Template(
        sentences=[
            ['2:ignore', '2:ignore', '600:text_percent_dmg'],
            [],
        ],
    ),
    rectification_rus=Template(
        sentences=[
            ['15:text_percent_dmg', '1000:ignore'],
            ['36:text_percent_max'],
        ],
    ),
    rectification_eng=Template(
        sentences=[
            ['1000:ignore', '15:text_percent_dmg'],
            ['36:text_percent_max'],
        ],
    ),
    headspace_capture=Template(
        sentences=[
            ['85:text_percent_res'],
        ],
    ),
    light_fragrance_leaching_rus=Template(
        sentences=[
            ['20:dmg_skill_emilie'],
            ['1:ignore'],
            ['2.9:ignore'],
        ],
    ),
    light_fragrance_leaching_eng=Template(
        sentences=[
            ['20:dmg_skill_emilie'],
            [],
            ['2.9:ignore'],
        ],
    ),
    lakelight_top_note=Template(
        sentences=[
            ['30:enemy_res_dendro', '10:ignore'],
        ],
    ),
    lumidouce_heart_note_rus=Template(
        sentences=[
            ['2:ignore', '0.3:ignore'],
        ],
    ),
    lumidouce_heart_note_eng=Template(
        sentences=[
            ['2:ignore'],
            ['0.3:ignore'],
        ],
    ),
    marcotte_sillage=Template(
        sentences=[
            ['5:ignore', '1:ignore', '300:text_percent_dmg', '4:ignore', '12:ignore'],
        ],
    ),
)
