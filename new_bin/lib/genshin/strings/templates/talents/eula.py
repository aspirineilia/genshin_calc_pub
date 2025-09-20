from ...template import Template, TemplateList


char_eula = TemplateList(
    default_rus=Template(
        names=[
            'Эоле', 'Эола',
            'Холодного сердца', 'Меча света', 'Мечу света', 'Меч света', 'Холодного сердца', 'Холодное сердце',
            'обычная атака', 'взрыв стихии',
        ],
        skills={
            'skill': ['Ледяной прибой', 'Ледяного прибоя'],
            'burst': ['Сумеречным мечом', 'Сумеречного меча', 'Сумеречный меч'],
        },
    ),
    default_eng=Template(
        names=[
            'Eula',
            'Grimheart', 'Shattered Lightfall Sword', 'Lightfall Sword', 'Lightfall Swords',
            'CD',
        ],
        skills={
            'skill': ['Icetide Vortex'],
            'burst': ['Glacial Illumination'],
        },
    ),
    roiling_rime_rus=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    roiling_rime_eng=Template(
        patterns=[
            (r'Shattered Lightfall name\{Sword\}', 'name{Shattered Lightfall Sword}'),
            (r'Lightfall name\{Sword\}', 'name{Lightfall Sword}'),
        ],
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    wellspring_of_war_lust_rus=Template(
        sentences=[
            [],
        ],
    ),
    wellspring_of_war_lust_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    tidal_illusion_rus=Template(
        sentences=[
            ['dmg_phys', 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    tidal_illusion_eng=Template(
        sentences=[
            ['dmg_phys', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    lady_of_seafoam=Template(
        sentences=[
            [],
        ],
    ),
    the_obstinacy_of_ones_inferiors=Template(
        sentences=[
            ['dmg_burst_eula', 'ignore'],
        ],
    ),
    noble_obligation_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    noble_obligation_eng=Template(
        patterns=[
            (r'Lightfall name\{Sword\}', 'name{Lightfall Sword}'),
        ],
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
)
