from ...template import Template, TemplateList


char_zhongli = TemplateList(
    default_rus=Template(
        names=[
            'Чжун Ли',
            'Укрепление', 'Яшмовым щитом', 'Яшмовый щит', 'Яшмовом щите',
            'Каменной стелы', 'Каменных стел',
        ],
        skills={
            'skill': ['Власть над камнем'],
            'burst': ['Падение кометы'],
        },
    ),
    default_eng=Template(
        names=[
            'Zhongli',
            'Jade Shield', 'Fortify', 'Stone Steles', 'Stone Stele', 'Planet Befall',
        ],
        skills={
            'skill': ['Dominus Lapidis\'', 'Dominus Lapidis'],
            'burst': ['Planet Befall\'s', 'Planet Befall'],
        },
    ),
    resonant_waves=Template(
        sentences=[
            ['shield', 'ignore'],
        ],
    ),
    dominance_of_earth_rus=Template(
        sentences=[
            [],
            ['normal_base_hp_percent|0|2'],
            ['skill_base_hp_percent'],
            ['burst_base_hp_percent'],
            [],
        ],
    ),
    dominance_of_earth_eng=Template(
        sentences=[
            ['normal_base_hp_percent|0|2', 'skill_base_hp_percent', 'burst_base_hp_percent'],
        ],
    ),
    rock_the_backbone_of_earth_rus=Template(
        sentences=[
            [],
        ],
    ),
    rock_the_backbone_of_earth_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    stone_the_cradle_of_jade=Template(
        sentences=[
            [],
        ],
    ),
    topaz_unbreakable_and_fearless=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    chrysos_bounty_of_dominator_rus=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_hp'],
            [],
        ],
    ),
    chrysos_bounty_of_dominator_eng=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_hp'],
        ],
    ),
)
