from ...template import Template, TemplateList


char_mona = TemplateList(
    default_rus=Template(
        names=[
            'Моны',
            'Омен', 'фантома', 'фантом',
        ],
        skills={
            'skill': ['Отражение фатума'],
            'burst': [],
            'other': ['Иллюзорный поток'],
        },
    ),
    default_eng=Template(
        names=[
            'Mona',
            'Omen', 'Phantom',
        ],
        skills={
            'skill': ['Mirror Reflection of Doom'],
            'burst': [],
            'other': ['Illusory Torrent'],
        },
    ),
    come_n_get_me_hag=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent_dmg'],
        ],
    ),
    waterborne_destiny=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    prophecy_of_submersion_rus=Template(
        sentences=[
            ['ignore', 'dmg_reaction_electrocharged', 'duration_frozen'],
        ],
    ),
    prophecy_of_submersion_eng=Template(
        sentences=[
            ['ignore', 'dmg_reaction_electrocharged', 'dmg_reaction_lunarcharged', 'dmg_reaction_vaporize', 'dmg_reaction_swirl_hydro', 'duration_frozen'],
        ],
    ),
    lunar_chain=Template(
        names=['заряженную атаку'],
        sentences=[
            ['text_percent_chance', 'ignore'],
        ],
    ),
    prophecy_of_oblivion=Template(
        sentences=[
            ['crit_rate'],
        ],
    ),
    rhetorics_of_calamitas=Template(
        sentences=[
            ['dmg_charged', None],
            ['ignore'],
        ],
    ),
)
