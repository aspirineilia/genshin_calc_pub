from ...template import Template, TemplateList

char_kirara = TemplateList(
    default_rus=Template(
        names=[
            'Кирара', 'Кираре', 'Кирары',
            'Срочной посылки нэко', 'Усиленная упаковка', 'Усиленной упаковки', 'Мяутеоритного удара',
            'Щита безопасной перевозки', 'Щиту безопасной перевозки', 'Щитом безопасной перевозки',
            'Щитом важной перевозки', 'Щита важной перевозки', 'Щит важной перевозки',
            'обычные атаки', 'заряженные атаки', 'взрыв стихии', 'всеми элементами',
        ],
        skills={
            'skill': [
                'Мяутеоритного удара', 'Мяутеоритным ударом', 'Усиленная упаковка', 'Щитом безопасной перевозки', 'Щитом важной перевозки'
            ],
            'burst': ['Неожиданным отправлением', 'Неожиданного отправления', 'Семя кошачьей мяты', 'малые Семена кошачьей мяты'],
        },
    ),
    default_eng=Template(
        names=[
            'Kirara',
            'Urgent Neko Parcel', 'Reinforced Packaging', 'Shields of Safe Transport', 'Shield of Safe Transport', 'Meow-teor Kick',
            'Small Cat Grass Cardamoms', 'Cat Grass Cardamom', 'Critical Transport Shields', 'Critical Transport Shield',
        ],
        skills={
            'skill': ['Meow-teor Kick', 'Reinforced Packaging', 'Shields of Safe Transport', 'Critical Transport Shields'],
            'burst': ['Secret Art: Surprise Dispatch', 'Small Cat Grass Cardamoms', 'Cat Grass Cardamom'],
        },
    ),
    bewitching_betwitching_tails_rus=Template(
        sentences=[
            [],
            ['ignore', 'ignore'],
            [],
            ['text_percent'],
            [],
        ],
    ),
    bewitching_betwitching_tails_eng=Template(
        sentences=[
            [],
            ['ignore'],
            ['ignore'],
            ['ignore'],
            ['text_percent'],
            [],
        ],
    ),
    pupillary_variance_rus=Template(
        sentences=[
            ['ignore'],
            ['text_percent_skill', 'text_percent_burst'],
        ],
    ),
    pupillary_variance_eng=Template(
        sentences=[
            ['ignore', 'text_percent_skill', 'text_percent_burst'],
        ],
    ),
    material_circulation_rus=Template(
        sentences=[
            ['ignore', 'text_value_hp'],
            [],
            ['ignore'],
        ],
    ),
    material_circulation_eng=Template(
        sentences=[
            ['text_value_hp', 'ignore'],
            ['ignore'],
        ],
    ),
    perfectly_packaged=Template(
        sentences=[
            ['text_percent_shield', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    steed_of_skanda=Template(
        sentences=[
            ['text_percent_atk'],
            [],
            ['ignore'],
            [],
        ],
    ),
    countless_sights_to_see_rus=Template(
        sentences=[
            ['ignore', 'dmg_pyro'],
        ],
    ),
    countless_sights_to_see_eng=Template(
        names=['Burst'],
        sentences=[
            ['dmg_pyro', 'ignore'],
        ],
    ),
)
