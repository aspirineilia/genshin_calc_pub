from ...template import Template, TemplateList


char_keqing = TemplateList(
    default_rus=Template(
        names=[
            'Кэ Цин',
            'Меч небесного тракта', 'Громовой стилет',
        ],
        skills={
            'skill': ['Возвращение звезды'],
            'burst': ['Меч небесного тракта'],
        },
    ),
    default_eng=Template(
        names=[
            'Keqing',
            'Lightning Stiletto',
        ],
        skills={
            'skill': ['Stellar Restoration'],
            'burst': ['Starward Sword'],
        },
    ),
    thundering_penance=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    aristocratic_dignity_rus=Template(
        sentences=[
            ['crit_rate'],
            ['ignore'],
        ],
    ),
    aristocratic_dignity_eng=Template(
        sentences=[
            ['crit_rate', 'recharge'],
            ['ignore'],
        ],
    ),
    thundering_might=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    keen_extraction=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    attunement_rus=Template(
        sentences=[
            ['atk_percent', 'ignore'],
        ],
    ),
    attunement_eng=Template(
        sentences=[
            ['ignore', 'atk_percent'],
        ],
    ),
    tenacious_star=Template(
        names=['обычной', 'элементным навыком'],
        sentences=[
            ['dmg_electro', 'ignore'],
        ],
    ),
)
