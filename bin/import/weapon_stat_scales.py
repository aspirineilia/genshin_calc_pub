import json
import os
import re
import static # type: ignore
import accumulator # type: ignore

dirname  = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../dimrepo/ExcelBinOutput/')
out_dir  = os.path.join(dirname, '../../src/js/db/generated/')

weapon_names = {
    11301: 'CoolSteel',
    11302: 'HarbingerofDawn',
    11303: 'TravelersHandySword',
    11304: 'DarkIronSword',
    11305: 'FilletBlade',
    11306: 'SkyriderSword',
    11401: 'FavoniusSword',
    11402: 'Flute',
    11403: 'SacrificialSword',
    11404: 'RoyalLongsword',
    11405: 'LionsRoar',
    11406: 'PrototypeRancour',
    11407: 'IronSting',
    11408: 'BlackcliffLongsword',
    11409: 'BlackSword',
    11410: 'AlleyFlash',
    # 11411: "",
    11412: "SwordofDescension",
    11413: "FesteringDesire",
    11414: "AmenomaKageuchi",
    11415: "CinnabarSpindle",
    11416: "KagotsurubeIsshin",
    11417: "SapwoodBlade",
    11418: "XiphosMoonlight",
    11422: 'ToukabouShigure',
    11424: 'WolfFang',
    11425: 'FinaleOfTheDeep',
    11426: 'FleuveCendreFerryman',
    11427: 'TheDockhandsAssistant',
    11428: 'SwordOfNarzissenkreuz',
    11430: 'SturdyBone',
    11431: 'FlamebreathFlute',
    11432: 'CalamityOfEshu',
    11501: "AquilaFavonia",
    11502: "SkywardBlade",
    11503: "FreedomSworn",
    11504: "SummitShaper",
    11505: "PrimordialJadeCutter",
    # 11506: "PrimordialJadeCutter",
    # 11507: "One Side",
    # 11508: "",
    11510: 'HaranGeppakuFutsu',
    11511: "KeyofKhajNisut",
    11512: "LightofFoliarIncision",
    11513: "SplendorOfStillWaters",
    11514: "UrakuMisugiri",
    11515: "Absolution",
    11516: "PeakPatrolSong",
    11517: "Azurelight",
    11509: "MistsplitterReforged",
    12301: "FerrousShadow",
    12302: "BloodtaintedGreatsword",
    12303: "WhiteIronGreatsword",
    # 12304: "Quartz",
    12305: "DebateClub",
    12306: "SkyriderGreatsword",
    12401: "FavoniusGreatsword",
    12402: "Bell",
    12403: "SacrificialGreatsword",
    12404: "RoyalGreatsword",
    12405: "Rainslasher",
    12406: "PrototypeArchaic",
    12407: "Whiteblind",
    12408: "BlackcliffSlasher",
    12409: "SerpentSpine",
    12410: "LithicBlade",
    12411: "SnowTombedStarsilver",
    12412: "LuxuriousSeaLord",
    12414: "KatsuragikiriNagamasa",
    12415: "MakhairaAquamarine",
    12416: "Akuoumaru",
    12417: "ForestRegalia",
    12418: 'MailedFlower',
    12424: 'TalkingStick',
    12425: 'TidalShadow',
    12426: 'MegaMagicSword',
    12427: 'PortablePowerSaw',
    12430: 'FruitfulHook',
    12431: 'Earthshaker',
    12432: 'FlameForgedInsight',
    12501: "SkywardPride",
    12502: "WolfsGravestone",
    12503: "SongofBrokenPines",
    12504: "Unforged",
    # 12505: "PrimordialJadeGreatsword",
    # 12506: "The Other Side",
    # 12508: "",
    # 12509: "",
    12510: "RedhornStonethresher",
    12511: 'BeaconOfTheReedSea',
    12512: 'Verdict',
    12513: 'MountainKingsFang',
    12514: 'AThousandBlazingSuns',
    13301: "WhiteTassel",
    13302: "Halberd",
    13303: "BlackTassel",
    # 13304: "The Flagstaff",
    13401: "DragonsBane",
    13402: "PrototypeStarglitter",
    13403: "CrescentPike",
    13404: "BlackcliffPole",
    13405: "Deathmatch",
    13406: "LithicSpear",
    13407: "FavoniusLance",
    13408: "RoyalSpear",
    13409: "DragonspineSpear",
    13414: "KitainCrossSpear",
    13415: "Catch",
    13416: "WavebreakersFin",
    13417: "Moonpiercer",
    13419: "MissiveWindspear",
    13424: "BalladOfTheFjords",
    13425: "RightfulReward",
    13426: "DialoguesOfTheDesertSages",
    13427: 'ProspectorsDrill',
    13430: 'MountainBracingBolt',
    13431: 'RainbowsTrail',
    13432: 'BriefPavilionChatter',
    13501: "StaffofHoma",
    13502: "SkywardSpine",
    # 13503: "",
    13504: "VortexVanquisher",
    13505: "PrimordialJadeWingedSpear",
    # 13506: "Deicide",
    13507: "CalamityQueller",
    13509: "GrasscuttersLight",
    13511: "StaffOfScarletSands",
    13512: "CrimsonMoonsSemblance",
    13513: 'LumidouceElegy',
    13514: 'SymphonistofScents',
    13515: 'FracturedHalo',
    14301: "MagicGuide",
    14302: "ThrillingTalesofDragonSlayers",
    14303: "OtherworldlyStory",
    14304: "EmeraldOrb",
    14305: "TwinNephrite",
    # 14306: "Amber Bead",
    14401: "FavoniusCodex",
    14402: "Widsith",
    14403: "SacrificialFragments",
    14404: "RoyalGrimoire",
    14405: "SolarPearl",
    14406: "PrototypeAmber",
    14407: "MappaMare",
    14408: "BlackcliffAgate",
    14409: "EyeofPerception",
    14410: "WineandSong",
    # 14411: "",
    14412: "Frostbearer",
    14413: "DodocoTales",
    14414: "HakushinRing",
    14415: "OathswornEye",
    14416: "WanderingEvenstar",
    14417: "FruitOfFulfillment",
    14424: "SacrificialJade",
    14425: "FlowingPurity",
    14426: 'BalladoftheBoundlessBlue',
    14427: 'AshGravenDrinkingHorn',
    14430: 'WaveridingWhirl',
    14431: 'RingOfCeiba',
    14501: "SkywardAtlas",
    14502: "LostPrayer",
    # 14503: "Lost Ballade",
    14504: "MemoryofDust",
    14505: "JadefallsSplendor",
    14506: "EverlastingMoonglow",
    # 14508: "",
    14509: "KagurasVerity",
    14511: "ThousandFloatingDreams",
    14512: "TulaytullahsRemembrance",
    14513: 'CashflowSupervision',
    14514: 'TomeoftheEternalFlow',
    14515: 'CranesEchoingCall',
    14516: 'SurfingTime',
    14517: 'StarcallersWatch',
    14518: 'MorningHibernation',
    14519: 'VividNotions',
    15301: "RavenBow",
    15302: "SharpshootersOath",
    15303: "RecurveBow",
    15304: "Slingshot",
    15305: "Messenger",
    # 15306: "Ebony Bow",
    15401: "FavoniusWarbow",
    15402: "Stringless",
    15403: "SacrificialBow",
    15404: "RoyalBow",
    15405: "Rust",
    15406: "PrototypeCrescent",
    15407: "CompoundBow",
    15408: "BlackcliffWarbow",
    15409: "ViridescentHunt",
    15410: "AlleyHunter",
    15411: "FadingTwilight",
    15412: "MitternachtsWaltz",
    15413: "WindblumeOde",
    15414: "Hamayumi",
    15415: "Predator",
    15416: "MouunsMoon",
    15417: "KingsSquire",
    15418: "EndOfTheLine",
    15419: "IbisPiercer",
    15424: "ScionOfTheBlazingSun",
    15425: "SongOfStillness",
    15426: "Cloudforged",
    15427: 'RangeGauge',
    15430: 'FlowerWreathedFeathers',
    15431: 'ShatteredChains',
    15432: 'SequenceofSolitude',
    15501: "SkywardHarp",
    15502: "AmosBow",
    15503: "ElegyfortheEnd",
    # 15504: "Kunwu's Wyrmbane",
    # 15505: "Primordial Jade Vista",
    # 15506: "Mirror Breaker",
    15507: "PolarStar",
    15508: "AquaSimulacra",
    15509: "ThunderingPulse",
    15511: "HuntersPath",
    15512: "TheFirstGreatMagic",
    15513: "SilvershowerHeartstrings",
    15514: "AstralVulturesCrimsonPlumage",
    # 20001: "",
}

def parse_lang():
    file   = open(data_dir + '../TextMap/TextMapEN.json', 'r')
    return json.load(file)

def parse_curves():
    file   = open(data_dir + 'WeaponCurveExcelConfigData.json', 'r')
    out    = open(out_dir + 'WeaponScale.js', 'w', encoding='utf-8')
    curves = {}

    for item in json.load(file):
        level = item['level']

        for info in item['curveInfos']:
            if not info['type'] in curves:
                curves[info['type']] = {}

            curves[info['type']][level] = '%.3f' % (info['value'])


    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n\n')
    out.write("export const weaponStatScales = {\n")

    for curve_name in sorted(curves):
        stat_name = static.getCurveName(curve_name)
        values    = list(curves[curve_name].values())

        out.write("\t%s: new StatTable('', [" % (stat_name))
        out.write(", ".join(values))
        out.write("]),\n")

    out.write("};\n")
    out.close()

    return curves

def parse_ascension():
    file = open(data_dir + 'WeaponPromoteExcelConfigData.json', 'r')
    table = {}
    result = {}

    for item in json.load(file):
        values = {}
        level = item.get('promoteLevel', 0)

        for prop in item['addProps']:
            type = prop.get('propType')

            values[static.getStatByName(type)] = static.getStatValue(type, prop.get('value', 0))

        if not item['weaponPromoteId'] in table:
            table[item['weaponPromoteId']] = {}
        table[item['weaponPromoteId']][level] = values

    for id in table:
        result[id] = {}
        first = table[id][0]
        for stat in first:
            result[id][stat] = []

            for level in range(1, 7):
                item = table[id].get(level)
                if item:
                    result[id][stat].append(float(item.get(stat)))
                else:
                    result[id][stat].append(0)

            if not sum(result[id][stat]):
                del result[id][stat]

    return result

def parse_weapons():
    file = open(data_dir + 'WeaponExcelConfigData.json', 'r')
    out  = open(out_dir + 'WeaponStatTables.js', 'w', encoding='utf-8')

    result = []

    ascensions = parse_ascension()
    # lang = parse_lang()

    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n')
    out.write('import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";\n')
    out.write('import { weaponStatScales } from "./WeaponScale";\n\n')

    for item in json.load(file):
        rarity = int(item['rankLevel'])
        if rarity < 3: continue

        # print('%s: "%s",' % (item['Id'], lang.get(str(item['NameTextMapHash']))))

        # name = '%s_%s' % (re.sub(r'UI_EquipIcon_', '', item['Icon']), str(item['Id']))
        name = weapon_names.get(item['id'])
        if not name: continue

        resultItem = {
            'id': name,
            'stats': [],
        }
        values = {}
        grows = {}

        for prop in item.get('weaponProp', []):
            if not 'initValue' in prop: continue

            prop_type = prop.get('propType')
            if not prop_type: continue

            stat = static.getStatByName(prop_type)
            value = static.getStatValue(prop_type, prop.get('initValue'))

            values[stat] = value
            grow = static.getCurveName(prop.get('type'))
            if grow: grows[stat] = grow

        ascension = ascensions.get(item.get('weaponPromoteId'), {})

        stats = set(values.keys())
        stats = stats.union(list(ascension.keys()))

        for stat in sorted(stats):
            resStat = {
                'stat': stat,
                'base': static.trimValue(values.get(stat, 0)),
            }

            if stat in ascension:
                ascList = list(map(lambda x: static.trimValue(x), ascension[stat]))
                ascId = accumulator.storeList('enumAscensionTables', ascList)
                resStat['ascension'] = ascId


            if stat in grows:
                resStat['scale'] = 'weaponStatScales.'+ grows[stat]

            resultItem['stats'].append(accumulator.storeDict('enumStatTables', resStat))

        result.append(resultItem)

    ascTables = accumulator.get('enumAscensionTables')
    scaleTables = accumulator.get('enumStatTables')

    out.write('const enumAscensionTables = {\n')
    for tableName in ascTables:
        out.write("\tn"+ str(tableName) +": new StatTable('', ["+ ', '.join(ascTables[tableName]) +"]),\n")
    out.write("};\n\n")

    out.write('const enumStatTables = {\n')
    for scaleName in scaleTables:
        scaleItem = scaleTables[scaleName]
        out.write("\tn"+ str(scaleName) +": new StatTableAscensionScale({\n")
        out.write("\t\tstat: '%s',\n" % (scaleItem['stat']))
        out.write("\t\tbase: %s,\n" % (scaleItem['base']))

        if 'ascension' in scaleItem:
            out.write("\t\tascension: %s,\n" % scaleItem['ascension'])

        if 'scale' in scaleItem:
            out.write("\t\tscale: %s,\n" % scaleItem['scale'])

        out.write("\t}),\n")
    out.write("};\n\n")

    out.write('export const weaponStatTables = {\n')
    for item in result:
        out.write('\t%s: [\n' % item['id'])
        for table in item['stats']:
            if isinstance(table, str):
                out.write("\t\t%s,\n" % table)
                continue
        out.write("\t],\n")
    out.write("};\n")

parse_curves()
parse_weapons()
