from ...template import Template, TemplateList


char_ororon = TemplateList(
    default_rus=Template(
        names=[
            'Оророна', 'Оророн',
            'Духовная сверхчувствительность', 'Духовную сверхчувствительность', 'Синестезия ночного укрытия',
            'Сферы душ', 'Сфера душ', 'Ночной тьмы', 'Ночной волны',
            'Сверхзвукового ока', 'Сверхзвуковое око', 'Сверхчувствительности', 'Сверхчувствительность',
            'Печать явления',
        ],
        skills={
            'skill': ['Сферы душ', 'Сфера душ', 'Праща ночи'],
            'burst': ['Сверхзвуковое око', 'Сверхзвукового ока', 'Эхо мрачных голосов', 'Эха мрачных голосов'],
        },
    ),
    default_eng=Template(
        names=[
            'Ororon',
            'Hypersense effect', 'Hypersense', 'Aspect Sigil', 'Nighttide',
            'Nightshade Synesthesia', 'Spiritual Supersense', 'Supersonic Oculus',
        ],
        skills={
            'skill': ['Night\'s Sling', 'Spirit Orb'],
            'burst': ['Dark Voices Echo', 'Supersonic Oculus'],
        },
    ),
    nightshade_synesthesia_rus=Template(
        patterns=[
            ('<br><br>Кроме', '\\nКроме'),
            ('<br><br>skill', '\\nskill'),
        ],
        sentences=[
            ['40:ignore'],
            ['15:ignore', '5:ignore'],
            ['0.3:ignore', '10:ignore', '80:ignore'],
            ['10:ignore', '10:ignore', '4:ignore', '160:text_percent_dmg'],
            ['1.8:ignore'],
            ['6:ignore'],
        ],
        results=[
            [0, 1, 2],
            [3, 4],
        ],
    ),
    nightshade_synesthesia_eng=Template(
        patterns=[
            ('<br><br>Also', '\\nAlso'),
            ('<br><br>skill', '\\nskill'),
        ],
        sentences=[
            ['40:ignore'],
            ['15:ignore', '5:ignore', '0.3:ignore', '10:ignore', '15:ignore', '80:ignore'],
            ['10:ignore', '160:text_percent_dmg', '4:ignore'],
            ['1.8:ignore'],
            ['6:ignore'],
        ],
        results=[
            [0, 1],
            [2, 3],
        ],
    ),
    aspect_catalyst=Template(
        patterns=[
            ('явления}<br>', 'явления}\\n'),
            ('Sigil}<br>', 'Sigil}\\n'),
        ],
        sentences=[
            ['15:ignore'],
            ['3:ignore'],
            ['3:ignore'],
            ['1:ignore', '3:ignore'],
        ],
        results=[
            [1, 2, 3]
        ],
    ),
    trails_amidst_the_forest_fog_rus=Template(
        sentences=[
            ['12:ignore', '50:dmg_skill_ororon'],
            [],
        ],
    ),
    trails_amidst_the_forest_fog_eng=Template(
        sentences=[
            ['2:ignore', '12:ignore'],
            ['50:dmg_skill_ororon'],
        ],
    ),
    king_bee_of_the_hidden_honeyed_wine=Template(
        patterns=[
            ('<br>skill{Духовная сверхчувствительность}<br>', '\\n'),
            ('<br>skill{Spiritual Supersense}<br>', '\\n'),
        ],
        sentences=[
            ['9:ignore'],
            ['8:dmg_electro', '8:dmg_electro'],
            ['32:text_percent_max'],
        ],
        results=[
            [0],
            [1, 2],
        ],
    ),
    as_the_mysteries_of_the_night_wind_rus=Template(
        sentences=[
            ['25:ignore'],
            ['8:ignore'],
        ],
    ),
    as_the_mysteries_of_the_night_wind_eng=Template(
        sentences=[
            ['25:ignore', '8:ignore'],
        ],
    ),
    ode_to_deep_springs_rus=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            ['10:atk_percent', '9:ignore'],
            ['3:ignore'],
            [],
            ['200:text_percent_dmg'],
        ],
        results=[
            [0, 1, 2],
            [3],
        ],
    ),
    ode_to_deep_springs_eng=Template(
        patterns=[
            ('<br>Кроме того', '\\nКроме того'),
            ('<br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            ['10:atk_percent', '9:ignore'],
            ['3:ignore'],
            ['200:text_percent_dmg'],
        ],
        results=[
            [0, 1],
            [2],
        ],
    ),
)
