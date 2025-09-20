from ...template import Template, TemplateList


char_dehya = TemplateList(
    default_rus=Template(
        names=[
            'Дэхья', 'Дэхьей', 'Дэхьи',
            'Крови алой гривы', 'Огненное узилище: Непреклонное пламя',
            'Золотой формы', 'Огненного узилища', 'Огненное узилище',
            'Кулаки Пламенной Гривы', 'Сжигающий удар', 'Пылающей львицы', 'Клыков львицы',
            'Крит. урон',
        ],
        skills={
            'skill': ['Сферы пламени Расплавленного пекла', 'Огненное узилище: Непреклонное пламя', 'Расплавленного пекла'],
            'burst': ['Клыков львицы'],
        },
    ),
    default_eng=Template(
        names=[
            'Dehya',
            'Fiery Sanctum', 'Redmane\'s Blood', 'Gold-Forged Form',
            'Flame-Mane\'s Fist', 'Incineration Drive', 'Blazing Lioness',
        ],
        skills={
            'skill': ['Molten Inferno: Ranging Flame', 'Molten Inferno: Indomitable Flame', 'Molten Inferno'],
            'burst': ['Leonine Bite'],
        },
    ),
    unstinting_succor_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
            [],
            ['ignore'],
        ],
    ),
    unstinting_succor_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    stalwart_and_true_rus=Template(
        sentences=[
            ['ignore', None],
            [None],
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    stalwart_and_true_eng=Template(
        sentences=[
            ['ignore', None, None, 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    the_flame_incandescent_rus=Template(
        sentences=[
            ['hp_percent'],
            [],
            [None],
            [None],
            [],
        ],
    ),
    the_flame_incandescent_eng=Template(
        sentences=[
            ['hp_percent', 'skill_base_hp_percent', 'burst_base_hp_percent'],
        ],
    ),
    the_sand_blades_glittering=Template(
        sentences=[
            ['ignore', 'dmg_skill_dehya'],
        ],
    ),
    an_oath_abiding_rus=Template(
        sentences=[
            ['ignore', 'text_percent_heal'],
            [],
            ['ignore'],
        ],
    ),
    an_oath_abiding_eng=Template(
        sentences=[
            ['ignore', 'text_percent_heal'],
            ['ignore'],
        ],
    ),
    the_burning_claws_cleaving_rus=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['crit_rate_burst'],
            ['crit_dmg_burst', 'ignore'],
            ['ignore'],
            ['ignore', None],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
    the_burning_claws_cleaving_eng=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['crit_rate_burst'],
            ['crit_dmg_burst', 'ignore'],
            ['ignore'],
            ['ignore', None],
        ],
        results=[
            [0],
            [1, 2, 3],
        ],
    ),
)
