from .base import ListParser

SKIP_CHARACTERS = [
    10000001, 11000008, 11000009, 11000010, 11000011, 11000013, 11000017,
    11000018, 11000019, 11000025, 11000026, 11000027, 11000028, 11000030, 11000031, 11000032, 11000033, 11000034,
    11000035, 11000036, 11000037, 11000038, 11000039, 11000040, 11000041, 11000042, 11000043, 11000044, 11000045,
    10000901, 11000046, 10000902,
]


class CharData(ListParser):
    filename = 'AvatarExcelConfigData.json'


class CharSkillDepotData(ListParser):
    filename = 'AvatarSkillDepotExcelConfigData.json'


class CharSkillData(ListParser):
    filename = 'AvatarSkillExcelConfigData.json'


class CharProudSkillData(ListParser):
    id_field = 'proudSkillId'
    filename = 'ProudSkillExcelConfigData.json'


class CharTalentSkillData(ListParser):
    id_field = 'talentId'
    filename = 'AvatarTalentExcelConfigData.json'
