import re
from unicodedata import normalize


def convert_name(name: str):
    result = re.sub(r'[^a-z0-9 ]', '', name, flags=re.IGNORECASE)
    result = result.title()
    return re.sub(r'\s+', '', result)


def convert_id(name: str, removeSemicolon=False):
    result = normalize('NFKD', name).encode('ASCII', 'ignore').decode("utf-8")

    if removeSemicolon:
        result = re.sub(r'^.*:\s*', '', result)
    result = re.sub(r'[\']', '', result, flags=re.IGNORECASE)
    result = re.sub(r'[^a-z0-9 ]', ' ', result, flags=re.IGNORECASE)
    result = result.lower()
    result = re.sub(r'\s+', '_', result)
    result = re.sub(r'^_+', '', result)
    result = re.sub(r'_+$', '', result)
    return result
