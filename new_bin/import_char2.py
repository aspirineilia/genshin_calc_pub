import json
import re


from lib.genshin.datafiles.char import CharData, CharProudSkillData, CharSkillData, CharSkillDepotData, SKIP_CHARACTERS, CharTalentSkillData
from lib.genshin.datafiles.lang import LangData

char_data = CharData()
depot_data = CharSkillDepotData()
char_skill_data = CharSkillData()
talent_data = CharTalentSkillData()
proud_data = CharProudSkillData()

lang = LangData('RU')
result = []


elements = {
    'Ice': 'cryo',
    'Water': 'hydro',
    'Grass': 'dendro',
    'Fire': 'pyro',
    'Rock': 'geo',
    'Wind': 'anemo',
    'Electric': 'electro',
}

def dump(obj):
    print(json.dumps(obj, ensure_ascii=False, indent=4))


def prepare_text(text: str) -> str:
    if not text:
        return ''
    text = text.replace('\\n', '\n')
    text = text.replace('(\\n)*', '\n')
    text = re.sub(r'\n*<i>.*</i>\n*', '', text, flags=re.DOTALL)
    return text


for char in char_data.get_list():
    if char['id'] in SKIP_CHARACTERS or char['id'] in (10000005, 10000007):
        continue

    char_name = lang.get(char['nameTextMapHash'])
    char_icon = char['iconName']
    char_element = ''

    depot_ids = [char['skillDepotId']]
    if char.get('candSkillDepotIds'):
        depot_ids.extend(char.get('candSkillDepotIds'))

    for depot_id in depot_ids:
        depot = depot_data.get(depot_id)
        if not depot:
            continue

        skill_ids = []
        if depot.get('energySkill'):
            skill_ids.append(depot.get('energySkill'))
        if depot.get('skills'):
            skill_ids.extend(depot.get('skills'))
        # if depot.get('SubSkills'):
        #     skill_ids.extend(depot.get('SubSkills'))

        for id in skill_ids:
            if not id:
                continue
            skill = char_skill_data.get(id)
            if not skill:
                continue

            if skill.get('costElemVal'):
                char_element = elements[skill['costElemType']]

        for id in skill_ids:
            if not id:
                continue
            skill = char_skill_data.get(id)
            if not skill:
                continue

            skill_type = 'attack'
            if skill.get('costElemVal'):
                skill_type = 'burst'
            elif skill.get('triggerID') == 2:
                skill_type = 'skill'
            elif skill.get('triggerID') == 3:
                skill_type = 'special'

            result.append({
                'char': char_name,
                'char_icon': char_icon,
                'element': char_element,
                'icon': skill['skillIcon'],
                'type': skill_type,
                'name': lang.get(skill['nameTextMapHash']),
                'text': prepare_text(lang.get(skill['descTextMapHash'])),
            })

        for passive in depot.get('inherentProudSkillOpens', []):
            if not passive.get('needAvatarPromoteLevel'):
                continue

            passive_id = passive.get('proudSkillGroupId')
            proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
            if proud:
                result.append({
                    'char': char_name,
                    'char_icon': char_icon,
                    'element': char_element,
                    'icon': proud['icon'],
                    'type': 'a' + str(proud['breakLevel']),
                    'name': lang.get(proud['nameTextMapHash']),
                    'text': prepare_text(lang.get(proud['descTextMapHash'])),
                })

        for i, const_id in enumerate(depot.get('talents')):
            talent = talent_data.get(const_id)
            if not talent:
                continue

            result.append({
                'char': char_name,
                'char_icon': char_icon,
                'element': char_element,
                'icon': talent['icon'],
                'type': 'c' + str(i + 1),
                'name': lang.get(talent['nameTextMapHash']),
                'text': prepare_text(lang.get(talent['descTextMapHash'])),
            })

dump(result)
