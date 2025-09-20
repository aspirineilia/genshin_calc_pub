from ...template import Template, TemplateList


char_ineffa = TemplateList(
    default_rus=Template(
        names=[
            'Инеффа', 'Инеффы',
            'Параметрического преобразования', 'Барьер оптического потока', 'Токонесущего композита',
            'Указ о взыскании',
        ],
        skills={
            'skill': [],
            'burst': ['Высшая команда: Циклонический истребитель'],
        },
    ),
    default_eng=Template(
        names=[
            'Ineffa',
            'Discharge attacks', 'Optical Flow Shield Barriers', 'Optical Flow Shield Barrier',
            'Carrier Flow Composite', 'Parameter Permutation', 'Punishment Edict',
        ],
        skills={
            'skill': [],
            'burst': ['Supreme Instruction: Cyclonic Exterminator'],
        },
    ),
    overclocking_circuit=Template(
        sentences=[
            ['65:text_percent_dmg'],
            [],
        ],
    ),
    panoramic_permutation_protocol_rus=Template(
        sentences=[
            ['20:ignore', '6:text_percent'],
        ],
    ),
    panoramic_permutation_protocol_eng=Template(
        sentences=[
            ['6:text_percent', '20:ignore'],
        ],
    ),
    assemblage_hub_rus=Template(
        sentences=[
            ['0.7:text_percent', '100:ignore'],
            ['14:text_percent_max'],
        ],
    ),
    assemblage_hub_eng=Template(
        sentences=[
            ['100:ignore', '0.7:text_percent', '14:text_percent_max'],
        ],
    ),
    rectifying_processor_rus=Template(
        sentences=[
            ['20:ignore', '2.5:text_percent', '100:ignore'],
            ['50:text_percent_max'],
        ],
    ),
    rectifying_processor_eng=Template(
        sentences=[
            ['20:ignore', '2.5:text_percent', '100:ignore', '50:text_percent_max'],
        ],
    ),
    support_cleaning_module=Template(
        sentences=[
            ['300:text_percent_dmg'],
            [],
        ],
    ),
    the_edictless_path=Template(
        sentences=[
            ['5:ignore'],
            ['4:ignore'],
        ],
    ),
    a_dawning_morn_for_you=Template(
        sentences=[
            ['135:text_percent_dmg'],
            [],
            ['3.5:ignore'],
        ],
    ),
)
