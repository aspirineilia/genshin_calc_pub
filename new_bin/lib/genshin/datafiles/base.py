import json

from ..config import DATA_FILES_PATH
from .exceptions import DuplicateIdException, EmptyIdException, IdTypeException, StructureException


class Parser:
    path = 'ExcelBinOutput'

    def __init__(self):
        self.data = None
        self.parse()
        self.assert_result()

    @property
    def filename(self):
        raise NotImplementedError

    def parse(self):
        file = open(DATA_FILES_PATH + f'/{self.path}/{self.filename}', 'r')
        self.data = json.load(file)

    def assert_result(self):
        pass


class DictParser(Parser):
    def assert_result(self):
        if not isinstance(self.data, dict):
            raise StructureException

    def get(self, id):
        return self.data.get(str(id))


class ListParser(Parser):
    id_field = 'id'
    no_id = False

    def __init__(self):
        self.cache = {}
        super().__init__()

    def parse(self):
        super().parse()
        if self.id_field:
            for item in self.get_list():
                id = item.get(self.id_field)
                if not isinstance(id, int):
                    raise IdTypeException
                if not id:
                    raise EmptyIdException
                if self.cache.get(id):
                    print(id)
                    raise DuplicateIdException
                self.cache[id] = item

    def assert_result(self):
        if not isinstance(self.data, list):
            raise StructureException

    def get_item_by_field(self, field: str, value):
        for item in self.data:
            if item.get(field) == value:
                return item
        return None

    def get_list_by_field(self, field: str, value):
        result = []
        for item in self.data:
            if item.get(field) == value:
                result.append(item)
        return result

    def get(self, obj_id: int):
        if not self.cache:
            self.parse()
        return self.cache.get(obj_id)

    def get_list(self):
        return self.data

    def count(self):
        return len(self.data)
