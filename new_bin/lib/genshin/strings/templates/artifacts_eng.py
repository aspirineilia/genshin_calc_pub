from ..template import Template

resolution_of_sojourner_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

resolution_of_sojourner_4 = Template(
    sentences=[
        ['crit_rate_charged'],
    ]
)

brave_heart_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

brave_heart_4 = Template(
    sentences=[
        ['dmg_all', None],
    ]
)

defenders_will_2 = Template(
    names=['защиту'],
    sentences=[
        ['def_percent'],
    ]
)

defenders_will_4 = Template(
    names=['сопротивление'],
    sentences=[
        ['text_percent'],
    ]
)

tiny_miracle_2 = Template(
    sentences=[
        ['res_pyro'],
    ]
)

tiny_miracle_4 = Template(
    sentences=[
        ['text_percent', 'ignore'],
        ['ignore'],
    ]
)

berserker_2 = Template(
    sentences=[
        ['crit_rate'],
    ]
)

berserker_4 = Template(
    sentences=[
        [None, 'crit_rate'],
    ]
)

martial_artist_2 = Template(
    names=['обычной'],
    sentences=[
        ['dmg_normal'],
    ]
)

martial_artist_4 = Template(
    names=['обычной'],
    sentences=[
        ['dmg_normal', 'ignore'],
    ]
)

instructor_2 = Template(
    sentences=[
        ['mastery'],
    ]
)

instructor_4 = Template(
    sentences=[
        ['text_value', 'ignore'],
    ]
)

gambler_2 = Template(
    sentences=[
        ['dmg_skill'],
    ]
)

gambler_4 = Template(
    sentences=[
        [None],
        ['ignore'],
    ]
)

the_exile_2 = Template(
    sentences=[
        ['recharge'],
    ]
)

the_exile_4 = Template(
    sentences=[
        [None, 'ignore', 'ignore'],
        [],
    ]
)

adventurer_2 = Template(
    sentences=[
        ['hp'],
    ]
)

adventurer_4 = Template(
    sentences=[
        ['ignore', 'text_percent'],
    ]
)

lucky_dog_2 = Template(
    names=['защиту'],
    sentences=[
        ['def'],
    ]
)

lucky_dog_4 = Template(
    sentences=[
        ['hp'],
    ]
)

scholar_2 = Template(
    sentences=[
        ['recharge'],
    ]
)

scholar_4 = Template(
    sentences=[
        [None],
        ['ignore'],
    ]
)

traveling_doctor_2 = Template(
    sentences=[
        ['healing_recv'],
    ]
)

traveling_doctor_4 = Template(
    sentences=[
        ['text_percent'],
    ]
)

blizzard_strayer_2 = Template(
    sentences=[
        ['dmg_cryo'],
    ]
)

blizzard_strayer_4 = Template(
    sentences=[
        ['crit_rate_enemy'],
        ['crit_rate_enemy'],
    ],
    results=[
        [0],
        [1],
    ]
)

thundersoother_2 = Template(
    sentences=[
        ['res_electro'],
    ]
)

thundersoother_4 = Template(
    sentences=[
        ['dmg_all'],
    ]
)

lavawalker_2 = Template(
    sentences=[
        ['res_pyro'],
    ]
)

lavawalker_4 = Template(
    sentences=[
        ['dmg_all'],
    ]
)

maiden_beloved_2 = Template(
    sentences=[
        ['healing'],
    ]
)

maiden_beloved_4 = Template(
    names=['Burst', 'healing received'],
    sentences=[
        ['text_percent', 'ignore'],
    ]
)

gladiators_finale_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

gladiators_finale_4 = Template(
    sentences=[
        ['dmg_normal'],
    ]
)

viridescent_venerer_2 = Template(
    sentences=[
        ['dmg_anemo'],
    ]
)

viridescent_venerer_4 = Template(
    names=['сопротивление'],
    sentences=[
        ['dmg_reaction_swirl'],
        ['text_percent|40', 'ignore']
    ],
    results=[
        [0],
        [1],
    ]
)

wanderers_troupe_2 = Template(
    sentences=[
        ['mastery'],
    ]
)

wanderers_troupe_4 = Template(
    sentences=[
        ['dmg_charged'],
    ]
)

thundering_fury_2 = Template(
    sentences=[
        ['dmg_electro'],
    ]
)

thundering_fury_4 = Template(
    sentences=[
        ['dmg_reaction_overloaded', 'dmg_reaction_aggravate', 'dmg_reaction_lunarcharged'],
        ['ignore'],
        ['ignore'],
    ]
)

crimson_witch_of_flames_2 = Template(
    sentences=[
        ['dmg_pyro'],
    ]
)

crimson_witch_of_flames_4 = Template(
    sentences=[
        ['dmg_reaction_overloaded'],
        ['dmg_reaction_vaporize'],
        ['ignore', None, 'ignore'],
        ['ignore'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ],
)

noblesse_oblige_2 = Template(
    sentences=[
        ['dmg_burst'],
    ]
)

noblesse_oblige_4 = Template(
    sentences=[
        ['text_percent', 'ignore'],
        [],
    ]
)

bloodstained_chivalry_2 = Template(
    sentences=[
        ['dmg_phys'],
    ]
)

bloodstained_chivalry_4 = Template(
    sentences=[
        ['dmg_charged', 'ignore', 'ignore'],
    ]
)

prayers_for_illumination_1 = prayers_for_destiny_1 = prayers_for_wisdom_1 = prayers_to_springtime_1 = Template(
    sentences=[
        ['text_percent'],
    ]
)

archaic_petra_2 = Template(
    sentences=[
        ['dmg_geo'],
    ]
)

archaic_petra_4 = Template(
    sentences=[
        ['text_percent|35', 'ignore'],
        [],
    ]
)

retracing_bolide_2 = Template(
    sentences=[
        ['shield'],
    ]
)

retracing_bolide_4 = Template(
    names=['Normal', 'обычной'],
    sentences=[
        ['dmg_normal'],
    ]
)

heart_of_depth_2 = Template(
    sentences=[
        ['dmg_hydro'],
    ]
)

heart_of_depth_4 = Template(
    names=['обычной'],
    sentences=[
        ['dmg_normal', 'ignore'],
    ]
)

tenacity_of_the_millelith_2 = Template(
    sentences=[
        ['hp_percent'],
    ]
)

tenacity_of_the_millelith_4 = Template(
    sentences=[
        ['text_percent2', 'text_percent', 'ignore'],
        ['ignore'],
        [],
    ]
)

pale_flame_2 = Template(
    sentences=[
        ['dmg_phys'],
    ]
)

pale_flame_4 = Template(
    sentences=[
        ['atk_percent', 'ignore'],
        ['ignore', 'ignore'],
        ['ignore', 'ignore', None],
    ]
)

shimenawas_reminiscence_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

shimenawas_reminiscence_4 = Template(
    sentences=[
        ['ignore', 'ignore', 'text_percent', 'ignore'],
        [],
    ]
)

emblem_of_severed_fate_2 = Template(
    sentences=[
        ['recharge'],
    ]
)

emblem_of_severed_fate_4 = Template(
    sentences=[
        ['text_percent'],
        ['text_percent_max'],
    ]
)

husk_of_opulent_dreams_2 = Template(
    sentences=[
        ['def_percent'],
    ]
)

husk_of_opulent_dreams_4 = Template(
    names=['Curiosity'],
    sentences=[
        ['ignore', 'ignore'],
        ['ignore', 'ignore'],
        ['ignore', None, None],
        ['ignore', 'ignore'],
    ],
)

ocean_hued_clam_2 = Template(
    sentences=[
        ['healing'],
    ]
)

ocean_hued_clam_4 = Template(
    names=['Sea-Dyed Foam'],
    sentences=[
        ['ignore'],
        [None],
        ['ignore'],
        [None],
        [],
        [],
    ]
)

echoes_of_an_offering_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

echoes_of_an_offering_4 = Template(
    names=['Valley Rite', 'Ритуал долины'],
    sentences=[
        ['text_percent_chance', 'text_percent'],
        ['ignore'],
        ['text_percent_chance_2'],
        ['ignore'],
    ]
)

vermillion_hereafter_2 = Template(
    sentences=[
        ['atk_percent'],
    ]
)

vermillion_hereafter_4 = Template(
    names=['Nascent Light'],
    sentences=[
        ['atk_percent', 'ignore'],
        ['atk_percent'],
        ['ignore'],
        ['ignore'],
        [],
        [],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
    ],
)

deepwood_memories_2 = Template(
    sentences=[
        ['dmg_dendro'],
    ],
)

deepwood_memories_4 = Template(
    names=[
        'Bursts',
    ],
    sentences=[
        ['text_percent', 'ignore'],
        [],
    ],
)

gilded_dreams_2 = Template(
    sentences=[
        ['mastery'],
    ],
)

gilded_dreams_4 = Template(
    replace={
        'character, and Elemental': 'character. Elemental',
        'same as the equipping character.': 'same as the equipping character (%{text_value}).',
        'different Elemental Type.': 'different Elemental Type (%{text_value2}).',
    },
    sentences=[
        ['ignore'],
        ['text_percent'],
        ['text_value'],
        ['ignore'],
        ['ignore'],
        [],
    ],
    results=[
        [0, 3, 4, 5],
        [1],
        [2],
    ],
)

desert_pavilion_chronicle_2 = Template(
    sentences=[
        ['dmg_anemo'],
    ],
)

desert_pavilion_chronicle_4 = Template(
    sentences=[
        ['atk_speed_normal', 'dmg_normal', 'ignore'],
    ],
)

flower_of_paradise_lost_2 = Template(
    sentences=[
        ['mastery'],
    ],
)

flower_of_paradise_lost_4 = Template(
    sentences=[
        ['dmg_reaction_bloom'],
        ['ignore'],
        ['ignore'],
        ['ignore'],
        [],
        [],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
    ],
)

golden_troupe_2 = Template(
    sentences=[
        ['20:dmg_skill'],
    ],
)

golden_troupe_4 = Template(
    sentences=[
        ['25:dmg_skill'],
        ['25:dmg_skill'],
        ['2:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

marechaussee_hunter_2 = Template(
    sentences=[
        ['15:dmg_normal'],
    ],
)

marechaussee_hunter_4 = Template(
    sentences=[
        ['12:crit_rate', '5:ignore'],
        ['3:ignore'],
    ],
)

nighttime_whispers_in_the_echoing_woods_2 = Template(
    sentences=[
        ['18:atk_percent'],
    ],
)

nighttime_whispers_in_the_echoing_woods_4 = Template(
    sentences=[
        ['20:dmg_geo', '10:ignore'],
        ['150:ignore', '1:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

nymphs_dream_2 = Template(
    sentences=[
        ['15:dmg_hydro'],
    ],
)

nymphs_dream_4 = Template(
    sentences=[
        ['1:ignore', '8:ignore'],
        ['1:ignore', '2:ignore', '3:ignore', None, None, None, None, None, None],
        [],
    ],
)

song_of_days_past_2 = Template(
    sentences=[
        ['15:healing'],
    ],
)

song_of_days_past_4 = Template(
    sentences=[
        ['6:ignore'],
        ['8:text_percent_dmg'],
        ['5:ignore', '10:ignore'],
        ['15000:text_value_hp'],
        [],
    ],
)

vourukashas_glow_2 = Template(
    sentences=[
        ['20:hp_percent'],
    ],
)

vourukashas_glow_4 = Template(
    sentences=[
        ['10:dmg_skill'],
        ['80:ignore', '5:ignore'],
        ['5:ignore'],
        [],
        [],
    ],
    results=[
        [0],
        [1, 2, 3, 4],
    ],
)

fragment_of_harmonic_whimsy_2 = Template(
    sentences=[
        ['18:atk_percent'],
    ],
)

fragment_of_harmonic_whimsy_4 = Template(
    sentences=[
        ['18:dmg_all', '6:ignore'],
        ['3:ignore'],
    ],
)

unfinished_reverie_2 = Template(
    sentences=[
        ['18:atk_percent'],
    ],
)

unfinished_reverie_4 = Template(
    sentences=[
        ['3:ignore', '50:text_percent_max'],
        ['6:ignore', '10:dmg_all', '0:ignore'],
        ['10:dmg_all', '50:text_percent_max'],
        [],
    ],
)

obsidian_codex_2 = Template(
    sentences=[
        ['15:dmg_all'],
    ],
)

obsidian_codex_4 = Template(
    sentences=[
        ['1:ignore', "40:crit_rate", '6:ignore'],
        [],
    ],
)

scroll_of_the_hero_of_cinder_city_2 = Template(
    sentences=[
        ['6:ignore'],
    ],
)

scroll_of_the_hero_of_cinder_city_4 = Template(
    sentences=[
        ['12:text_percent', '15:ignore'],
        ['28:text_percent', '20:ignore'],
        [],
    ],
    results=[
        [0, 2],
        [1, 2],
    ]
)

finale_of_the_deep_galleries_2 = Template(
    sentences=[
        ['15:dmg_cryo'],
    ],
)

finale_of_the_deep_galleries_4 = Template(
    sentences=[
        ['0:ignore', '60:text_percent', '60:text_percent'],
        ['6:ignore'],
        ['6:ignore'],
        [],
    ],
)


long_nights_oath_2 = Template(
    sentences=[
        ['25:dmg_plunge'],
    ],
)

long_nights_oath_4 = Template(
    sentences=[
        ['1:ignore', '2:ignore', '2:ignore', '1:ignore'],
        ['15:dmg_plunge', '6:ignore'],
        ['5:ignore'],
        [],
    ],
)
