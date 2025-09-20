from .base import ListParser, Parser


class ArtifactSetData(ListParser):
    filename = 'ReliquarySetExcelConfigData.json'
    id_field = 'setId'


class ArtifactPieceBonusesData(ListParser):
    filename = 'EquipAffixExcelConfigData.json'
    id_field = 'affixId'

    def bonuses_list(self, affix_id: int):
        items = self.get_list_by_field('id', affix_id)
        return sorted(items, key=lambda i: i.get('level', 0))


class ArtifactData(ListParser):
    filename = 'ReliquaryExcelConfigData.json'


class ArtifactMainstatData(Parser):
    filename = 'ReliquaryLevelExcelConfigData.json'
