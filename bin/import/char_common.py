import json
import os

dirname = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')


def parse_lang():
    file = open(data_dir + '../TextMap/TextMapEN.json', 'r')
    return json.load(file)


def parse_scales():
    file = open(data_dir + 'ProudSkillExcelConfigData.json', 'r')
    lang = parse_lang()
    result = {}

    for item in json.load(file):
        skillId = item['proudSkillGroupId']
        skillLevel = item['level']

        if skillId not in result:
            result[skillId] = {
                'levels': {},
                'desc': [],
            }

        if skillLevel == 1:
            for desc in item['paramDescList']:
                result[skillId]['desc'].append(lang.get(str(desc)))

        for scale in item['paramList']:
            if skillLevel not in result[skillId]['levels']:
                result[skillId]['levels'][skillLevel] = []
            result[skillId]['levels'][skillLevel].append(scale)

    return result


def parse_skills():
    file = open(data_dir + 'AvatarSkillDepotExcelConfigData.json', 'r')
    file2 = open(data_dir + 'AvatarSkillExcelConfigData.json', 'r')

    result = {}
    skills = {}
    gr_to_id = {}

    for item in json.load(file2):
        gr = item.get('proudSkillGroupId')
        if not gr:
            continue

        skills[item['id']] = gr
        gr_to_id[gr] = item['id']

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

    return (result, gr_to_id)
