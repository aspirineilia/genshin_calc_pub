storedData = {}
storedCounter = {}

def listsAreEqual(a, b):
    if len(a) != len(b): return False
    for (v1, v2) in zip(a, b):
        if v1 != v2: return False
    return True

def dictsAreEqual(a, b):
    if not listsAreEqual(a.keys(), b.keys()): return False

    for key in a:
        if a[key] != b[key]: return False

    return True

def get(category):
    return storedData.get(category, [])

def storeList(category, data):
    if not category in storedData:
        storedData[category] = {}
        storedCounter[category] = 0

    matchedKey = None

    for key in storedData[category]:
        if listsAreEqual(storedData[category][key], data):
            matchedKey = key
            break

    if not matchedKey:
        storedCounter[category] += 1
        matchedKey = storedCounter[category]
        storedData[category][matchedKey] = data

    return '%s.n%s' % (category, matchedKey)

def storeDict(category, data):
    if not category in storedData:
        storedData[category] = {}
        storedCounter[category] = 0

    matchedKey = None

    for key in storedData[category]:
        if dictsAreEqual(storedData[category][key], data):
            matchedKey = key
            break

    if not matchedKey:
        storedCounter[category] += 1
        matchedKey = storedCounter[category]
        storedData[category][matchedKey] = data

    return '%s.n%s' % (category, matchedKey)


