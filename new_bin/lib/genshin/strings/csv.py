import csv
import os

OUT_PATH = '../../../../data/strings/generated/'


class CsvDumper:
    def open_file(self, file):
        dirname = os.path.dirname(__file__)
        dirname = os.path.join(dirname, OUT_PATH)
        return open(dirname + file, 'w')

    def get_dumper(self, f, fieldnames):
        return csv.DictWriter(
            f,
            fieldnames=fieldnames,
            escapechar='~',
            quotechar='"',
            delimiter=';',
        )

    def dump(self, data, filename):
        file = self.open_file(filename)
        dumper = self.get_dumper(file, data[0].keys())
        dumper.writeheader()
        dumper.writerows(data)
