from .base import ListParser

IGNORED_WEAPONS = [
    10002, 10003, 10004, 10005, 10006, 10008, 11411, 11506, 11507, 11508,
    12506, 12508, 12509, 13304, 13503, 13506, 14306, 14411, 14503,
    14508, 15504, 15505, 15506, 20001, 12505, 12304, 15306, 11419, 11420,
    11421
]


class WeaponData(ListParser):
    filename = 'WeaponExcelConfigData.json'


class WeaponSkillData(ListParser):
    filename = 'EquipAffixExcelConfigData.json'
    id_field = 'affixId'


class WeaponPromoteData(ListParser):
    filename = 'WeaponPromoteExcelConfigData.json'
    id_field = None
