import os
import re

OUT_PATH = '../../../../data/raw/'


class TextDumper:
    def open_file(self, file):
        dirname = os.path.dirname(__file__)
        dirname = os.path.join(dirname, OUT_PATH)
        return open(dirname + file, 'w')

    def dump(self, data: dict, filename: str):
        file = self.open_file(filename)
        for charName in sorted(data.keys()):
            lines = data[charName]
            file.write(f'-= {charName} =-\n\n')
            for line in lines:
                if line == '\n':
                    file.write(line)
                else:
                    file.write(re.sub(r'(\\n)+', '\n', line, flags=re.DOTALL) + '\n')
