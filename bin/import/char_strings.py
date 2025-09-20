import json
import os
import re
import static

dirname = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')
out_dir = os.path.join(dirname, '../../data/raw/')


def parse_lang(name):
    file = open(data_dir + f'../TextMap/TextMap{name}.json', 'r')
    return json.load(file)


def parse_proud():
    file = open(data_dir + 'ProudSkillExcelConfigData.json', 'r')

    result = {}

    for item in json.load(file):
        result[item['proudSkillGroupId']] = item

    return result


def parse_skills():
    file = open(data_dir + 'AvatarSkillDepotExcelConfigData.json', 'r')
    file2 = open(data_dir + 'AvatarSkillExcelConfigData.json', 'r')

    result = {}
    skills = {}

    for item in json.load(file2):
        gr = item.get('proudSkillGroupId')
        if not gr:
            continue

        skills[item['id']] = item

    for item in json.load(file):
        ids = []

        id = skills.get(item.get('energySkill'))
        if id:
            ids.append(id)

        for id in item.get("skills", []):
            id = skills.get(id)
            if id:
                ids.append(id)

        result[item['id']] = ids

    return result


def format_descr(value, skillName):
    if not value:
        return ''

    value = re.sub(r'<color=#FFD780FF>(.+?)</color>', '<h2>\g<1></h2>', value)
    value = re.sub(r'<color=#FFACFFFF>(.+?)</color>', 'electro{\g<1>}', value)
    value = re.sub(r'<i>(.+?)</i>', '', value)

    value = re.sub(r'\\n·\s*', '<br>· ', value)

    lines = re.split(r'\s*(?:\\n)+\s*', value)
    result = []

    for line in lines:
        if not line:
            continue

        start = line[0]

        if start == '<':
            result.append(line)
        # elif start == '·':
        #     result.append(f'{line}<br>')
        else:
            result.append(f'<p>{line}</p>')

    return "\n".join(result)


def parse_char_skills(charName, skills, proud, depotId):
    skillsData = skills.get(depotId)

    out.write(f'=== {charName} === \n\n')

    # for skill in skillsData:
    for skill in sorted(skillsData, key=lambda item: item['id']):
        name_id = str(skill['nameTextMapHash'])
        desc_id = str(skill['descTextMapHash'])

        out.write(lang_ru.get(name_id) + "\n")
        out.write(lang_en.get(name_id) + "\n\n")
        out.write(format_descr(lang_ru.get(desc_id), lang_ru.get(name_id)) + "\n\n")
        out.write(format_descr(lang_en.get(desc_id), lang_en.get(name_id)) + "\n\n")


def parse_chars():
    file = open(data_dir + 'AvatarExcelConfigData.json', 'r')

    skills = parse_skills()
    proud = parse_proud()
    chars = {}

    for item in json.load(file):
        charId = item['id']
        charName = static.getCharById(charId)

        if not charName:
            continue

        # if charName != 'YaeMiko': continue

        chars[charName] = item

    for charName in sorted(chars.keys()):
        item = chars[charName]

        depotIds = item.get('candSkillDepotIds', [])
        if len(depotIds) > 1:
            continue
        #     for depotId in depotIds:
        #         charName = static.getCharById(depotId)
        #         if not charName: continue
        #         parse_char_skills(charName, scales, skills, depotId)
        else:
            parse_char_skills(charName, skills, proud, item.get('skillDepotId'))


out = open(out_dir + 'CharString.txt', 'w', encoding='utf-8')

lang_ru = parse_lang('RU')
lang_en = parse_lang('EN')

parse_chars()

