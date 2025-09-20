from .base import DictParser


class LangData(DictParser):
    path = 'TextMap'

    def __init__(self, lang: str = 'EN'):
        self.lang = lang.upper()
        super().__init__()

    @property
    def filename(self):
        return f'TextMap{self.lang}.json'
