import hashlib
import io
import os
import re
import tinify  # type: ignore

from os.path import exists
from logging import Logger
from PIL import Image
from posixpath import basename
from typing import List, Tuple

# try:
#     from lib.secret.tinypng import api_key
#     tinify.key = api_key
# except ModuleNotFoundError:
#     pass

logger = Logger(__name__)
dirname = os.path.dirname(__file__)
img_out_path = os.path.join(dirname, '../../../src/images/')
css_out_path = os.path.join(dirname, '../../../src/css/generated/')


def media_retina_wrapper(text: str):
    css = '\n@media\n'
    css += 'only screen and (-webkit-min-device-pixel-ratio: 2),\n'
    css += 'only screen and (   min--moz-device-pixel-ratio: 2),\n'
    css += 'only screen and (     -o-min-device-pixel-ratio: 2/1),\n'
    css += 'only screen and (        min-device-pixel-ratio: 2),\n'
    css += 'only screen and (                min-resolution: 192dpi),\n'
    css += 'only screen and (                min-resolution: 2dppx) {\n'
    for line in text.splitlines():
        css += f'\t{line}\n'
    css += '}\n'
    return css


class ImageGenerator:
    def __init__(
        self,
        items: List[str],
        images: List[str],
        pack_name: str,
        sprite_css_prefix: str = 'sprite',
    ) -> None:
        self.images = []
        self.images_names = images
        self.items = items
        self.pack_name = pack_name
        self.sprite_css_prefix = sprite_css_prefix

        self.sprites = {}
        self.individual = {}
        self.result_css = ''
        self.result_css_2x = ''

        for image in images:
            self.images.append(Image.open(image))

    @property
    def path(self):
        return os.path.join(img_out_path, self.pack_name)

    @property
    def css_path(self):
        return f'../../images/{self.pack_name}/'

    @property
    def sprite_path(self):
        return '../../images/sprites/'

    def save(self) -> None:
        css = self.result_css
        css += self._generate_items_css()

        if self.result_css_2x:
            css += media_retina_wrapper(self.result_css_2x)

        for file_name, image in self.sprites.items():
            file_path = os.path.join(img_out_path, 'sprites', file_name)
            self._minify_file(image, file_path)

        for file_name, image in self.individual.items():
            file_path = os.path.join(img_out_path, self.pack_name, file_name)
            self._minify_file(image, file_path)

        with open(f'{css_out_path}/icons_{ self.pack_name.replace("/", "_")}.css', 'w') as css_fh:
            css_fh.write(css)

    def generate_individual(self, size: Tuple[int, int], retina: bool = True) -> None:
        size2x = (size[0] * 2, size[1] * 2)
        css = ''
        css2x = ''

        for (image_path, image, item_class) in zip(self.images_names, self.images, self.items):
            base = basename(image_path)[:-4].lower()
            base = re.sub(r'^ui_[^_]+_', '', base)

            self.individual[f'{base}.png'] = image.copy().resize(size)
            if retina:
                self.individual[f'{base}_2x.png'] = image.copy().resize(size2x)

            css += f'.{item_class} {{background-image: url("../../images/{self.pack_name}/{base}.png")}}\n'
            if retina:
                css2x += f'.{item_class} {{background-image: url("../../images/{self.pack_name}/{base}_2x.png")}}\n'

        self.result_css += css
        if retina:
            self.result_css_2x += css2x

    def generate_sprite(self, sprite_class: str, size: Tuple[int, int], prefix: str = '') -> None:
        (cols, rows) = self._optimize_rows_cols()

        sprite = self._generate_sprite(size, cols, rows)
        sprite2x = self._generate_sprite((size[0] * 2, size[1] * 2), cols, rows)

        filename = prefix + hashlib.md5(sprite.tobytes()).hexdigest() + '.png'
        filename2x = prefix + hashlib.md5(sprite2x.tobytes()).hexdigest() + '.png'

        self.sprites[filename] = sprite
        self.sprites[filename2x] = sprite2x

        image_width = size[0] * cols
        image_height = size[1] * rows

        css = f'.{sprite_class} {{\n\tbackground-image: url("{self.sprite_path}{filename}");\n'
        css += f'\tbackground-size: {image_width}px {image_height}px;\n}}\n'

        retina_css = f'.{sprite_class} {{background-image: url("{self.sprite_path}{filename2x}")}}\n'

        self.result_css += css
        self.result_css_2x += retina_css

    def _minify_file(self, image, file_path):
        if not exists(file_path):
            saved = False
            if tinify.key:
                try:
                    f = io.BytesIO(b'')
                    image.save(f, 'png')
                    tinify.from_buffer(f.getbuffer()).to_file(file_path)
                    saved = True
                except tinify.AccountError as e:
                    logger.error('tinify AccountError: ' + e)
                except tinify.ConnectionError as e:
                    logger.error('tinify ConnectionError: ' + e)
                except tinify.ClientError as e:
                    logger.error('tinify ClientError: ' + e)
                except tinify.ServerError as e:
                    logger.error('tinify ServerError: ' + e)

            if not saved:
                print(file_path)
                image.save(file_path)

    def _optimize_rows_cols(self) -> Tuple[int, int]:
        items_cnt = len(self.items)
        cols, rows, min_extra = 0, 0, -1
        dividers = (4, 5, 10, 20, 25, 50, 100)
        for c in dividers:
            for r in dividers:
                total = (c + 1) * (r + 1)
                if total >= items_cnt:
                    extra = total - items_cnt
                    if not cols or extra < min_extra:
                        min_extra = extra
                        cols = c + 1
                        rows = r + 1
        return (cols, rows)

    def _generate_items_css(self) -> str:
        (cols, rows) = self._optimize_rows_cols()
        col_size = 100 / (cols - 1)
        row_size = 100 / (rows - 1)

        result = ''
        for index, item in enumerate(self.items):
            row = index // cols
            col = index - row * cols
            offset_col = int(col * col_size)
            offset_row = int(row * row_size)
            result += f'.{self.sprite_css_prefix}.{item} {{background-position: {offset_col}% {offset_row}%}}\n'

        return result

    def _generate_sprite(self, size: Tuple[int, int], cols: int, rows: int):
        (width, height) = size
        sprite = Image.new('RGBA', (width * cols, height * rows), (255, 255, 255, 0))

        for index, image in enumerate(self.images):
            row = index // cols
            col = index - row * cols
            resized = image.copy().resize(size)
            sprite.paste(resized, (col * width, row * height))

        return sprite
