from ...template import Template, TemplateList


char_neuvillette = TemplateList(
    default_rus=Template(
        patterns=[
            ('name{заряженной атаки}', 'заряженной атаки'),
        ],
        names=[
            'Нёвиллет', 'Нёвиллета',
            'Былой славы драконов', 'Наследник древнего моря', 'Облечение: Судебная оценка',
            'заряженной атаки: Взвешенный вердикт', 'Капля источника', 'Капли источника', 'Капля',
        ],
        skills={
            'skill': ['О слёзы, я воздам'],
            'burst': ['О волны, я возвратился'],
        },
    ),
    default_eng=Template(
        patterns=[
            ('name{Charged Attack}', 'Charged Attack'),
        ],
        names=[
            'Neuvillette',
            'Past Draconic Glories', 'Heir to the Ancient Sea\'s Authority', 'Sourcewater Droplets',
            'Charged Attack Empowerment: Legal Evaluation',
            'Charged Attack: Equitable Judgment', 'Legal Evaluation', 'Sourcewater Droplet', 'Droplet',
            'Equitable Judgment',
        ],
        skills={
            'skill': [],
            'burst': [],
        },
    ),
    heir_to_the_ancient_seas_authority_rus=Template(
        sentences=[
            ['1:ignore'],
            ['30:ignore', '3:ignore'],
            ['110:text_percent_dmg_1', '125:text_percent_dmg_2', '160:text_percent_dmg_3'],
        ],
    ),
    heir_to_the_ancient_seas_authority_eng=Template(
        sentences=[
            ['1:ignore', '30:ignore'],
            ['3:ignore', '110:text_percent_dmg_1', '125:text_percent_dmg_2', '160:text_percent_dmg_3'],
        ],
    ),
    discipline_of_the_supreme_arbitration_rus=Template(
        sentences=[
            ['1:ignore', '30:ignore'],
            ['0.6:text_percent_dmg'],
            ['30:text_percent_dmg_max'],
         ],
    ),
    discipline_of_the_supreme_arbitration_eng=Template(
        sentences=[
            ['1:ignore', '30:ignore', '0.6:text_percent_dmg'],
            ['30:text_percent_dmg_max'],
         ],
    ),
    venerable_institution_rus=Template(
        sentences=[
            ['1:ignore'],
            [],
        ],
    ),
    venerable_institution_eng=Template(
        sentences=[
            ['1:ignore'],
        ],
    ),
    juridical_exhortation=Template(
        sentences=[
            ['14:text_percent'],
            ['42:text_percent_max'],
        ],
    ),
    crown_of_commiseration=Template(
        sentences=[
            ['1:ignore'],
            ['4:ignore'],
        ],
    ),
    wrathful_recompense_rus=Template(
        sentences=[
            [],
            ['1:ignore', '2:ignore', '2:ignore', 'text_percent_dmg'],
            [],
            [],
        ],
    ),
    wrathful_recompense_eng=Template(
        sentences=[
            [],
            ['1:ignore', '2:ignore', '2:ignore', 'text_percent_dmg'],
            [],
        ],
    ),
)
