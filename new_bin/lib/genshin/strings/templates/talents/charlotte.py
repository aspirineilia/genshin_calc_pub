from ...template import Template, TemplateList


char_charlotte = TemplateList(
    default_rus=Template(
        names=[
            'Шарлотта', 'Шарлотты', 'Шарлотте', 'Фонтейна',
            'Сфокусированным впечатлением', 'бонус лечения',
            'Верификацией', 'Господин Верите',
            'Скоростным силуэтом', 'Сфокусированным впечатлением',
        ],
        skills={
            'skill': ['Съёмки: Композиция точки замерзания'],
            'burst': ['Стоп-кадр: Всестороннее подтверждение'],
        },
    ),
    default_eng=Template(
        names=[
            'Charlotte',
            'Focused Impression', 'Fontainians', 'Verification',
            'Monsieur Verite', 'Snappy Silhouette',
        ],
        skills={
            'skill': ['Framing: Freezing Point Composition'],
            'burst': ['Still Photo: Comprehensive Confirmation'],
        },
    ),
    moment_of_impact=Template(
        sentences=[
            ['2:ignore'],
            ['4:ignore', '12:ignore'],
        ],
    ),
    diversified_investigation=Template(
        patterns=[
            (r'1/2/3', 'format{text_number=1|1}/format{text_number=2|2}/format{text_number=3|3}'),
            (r'5%/10%/15%', 'format{text_number=1|5}/format{text_number=2|10}/format{text_number=3|15}%'),
        ],
        sentences=[
            [
                '1:ignore', '1:ignore', '2:ignore', '2:ignore', '3:ignore', '3:ignore',
                '1:ignore', '5:ignore', '2:ignore', '10:ignore', '3:ignore', '15:ignore',
            ],
            [
                '1:ignore', '1:ignore', '2:ignore', '2:ignore', '3:ignore', '3:ignore',
                '1:ignore', '5:ignore', '2:ignore', '10:ignore', '3:ignore', '15:ignore',
            ],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    a_need_to_verify_facts=Template(
        sentences=[
            ['2:ignore', '80:text_percent_heal'],
            ['6:ignore'],
        ],
    ),
    a_duty_to_pursue_truth=Template(
        sentences=[
            ['1:ignore', '2:ignore', '3:ignore', '10:ignore', '20:ignore', '30:ignore', '12:ignore'],
        ],
    ),
    a_responsibility_to_oversee=Template(
        sentences=[
            ['10:text_percent_dmg', '2:ignore'],
            ['5:ignore', '20:ignore'],
         ],
    ),
    a_summation_of_interest_rus=Template(
        names=['обычные', 'заряженные атаки'],
        sentences=[
            ['180:text_percent_dmg', '42:text_percent_heal'],
            ['6:ignore'],
            [],
        ],
    ),
    a_summation_of_interest_eng=Template(
        sentences=[
            ['180:text_percent_dmg', '42:text_percent_heal'],
            ['6:ignore'],
        ],
    ),
)
