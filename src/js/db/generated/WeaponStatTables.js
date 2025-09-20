// This file is auto generated
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { weaponStatScales } from "./WeaponScale";

const enumAscensionTables = {
	n1: new StatTable('', [19.5, 38.9, 58.4, 77.8, 97.3, 116.7]),
	n2: new StatTable('', [25.9, 51.9, 77.8, 103.7, 129.7, 155.6]),
	n3: new StatTable('', [31.1, 62.2, 93.4, 124.5, 155.6, 186.7]),
};

const enumStatTables = {
	n1: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.7413,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_1,
	}),
	n2: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.66,
		scale: weaponStatScales.crt_1_1,
	}),
	n3: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 10.2,
		scale: weaponStatScales.crt_1_1,
	}),
	n4: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 39.8751,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_2,
	}),
	n5: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 6.3733,
		scale: weaponStatScales.crt_1_1,
	}),
	n6: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 30.6,
		scale: weaponStatScales.crt_1_1,
	}),
	n7: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 37.6075,
		ascension: enumAscensionTables.n1,
		scale: weaponStatScales.atk_1_4,
	}),
	n8: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 11.3333,
		scale: weaponStatScales.crt_1_1,
	}),
	n9: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 41.0671,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_4,
	}),
	n10: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 13.3333,
		scale: weaponStatScales.crt_2_1,
	}),
	n11: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 42.401,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_1,
	}),
	n12: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 9,
		scale: weaponStatScales.crt_2_1,
	}),
	n13: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 43.7349,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_2,
	}),
	n14: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 7.5067,
		scale: weaponStatScales.crt_2_1,
	}),
	n15: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 36,
		scale: weaponStatScales.crt_2_1,
	}),
	n16: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 8,
		scale: weaponStatScales.crt_2_1,
	}),
	n17: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	n18: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 45.0687,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_2_3,
	}),
	n19: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	n20: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 38.7413,
		ascension: enumAscensionTables.n2,
		scale: weaponStatScales.atk_1_1,
	}),
	n21: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 10,
		scale: weaponStatScales.crt_2_1,
	}),
	n22: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	n23: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 15.0133,
		scale: weaponStatScales.crt_2_1,
	}),
	n24: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 6.6667,
		scale: weaponStatScales.crt_2_1,
	}),
	n25: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	n26: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 9,
		scale: weaponStatScales.crt_2_1,
	}),
	n27: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 47.537,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_2,
	}),
	n28: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 9,
		scale: weaponStatScales.crt_3_1,
	}),
	n29: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 45.9364,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_1,
	}),
	n30: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 12,
		scale: weaponStatScales.crt_3_1,
	}),
	n31: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 43.2,
		scale: weaponStatScales.crt_3_1,
	}),
	n32: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 10.8,
		scale: weaponStatScales.crt_3_1,
	}),
	n33: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 44.3358,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_4,
	}),
	n34: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 9.6,
		scale: weaponStatScales.crt_3_1,
	}),
	n35: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 9.6,
		scale: weaponStatScales.crt_3_1,
	}),
	n36: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 7.2,
		scale: weaponStatScales.crt_3_1,
	}),
	n37: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 14.4,
		scale: weaponStatScales.crt_3_1,
	}),
	n38: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 19.2,
		scale: weaponStatScales.crt_3_1,
	}),
	n39: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 18,
		scale: weaponStatScales.crt_3_1,
	}),
	n40: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 4.8,
		scale: weaponStatScales.crt_3_1,
	}),
	n41: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 7.66,
		scale: weaponStatScales.crt_1_1,
	}),
	n42: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 40.8,
		scale: weaponStatScales.crt_1_1,
	}),
	n43: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 9.56,
		scale: weaponStatScales.crt_1_1,
	}),
	n44: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 9.56,
		scale: weaponStatScales.crt_1_1,
	}),
	n45: new StatTableAscensionScale({
		stat: 'def_percent',
		base: 11.26,
		scale: weaponStatScales.crt_2_1,
	}),
	n46: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	n47: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 24,
		scale: weaponStatScales.crt_2_1,
	}),
	n48: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 4,
		scale: weaponStatScales.crt_2_1,
	}),
	n49: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 12,
		scale: weaponStatScales.crt_2_1,
	}),
	n50: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 8,
		scale: weaponStatScales.crt_3_1,
	}),
	n51: new StatTableAscensionScale({
		stat: 'atk_base',
		base: 49.1377,
		ascension: enumAscensionTables.n3,
		scale: weaponStatScales.atk_3_3,
	}),
	n52: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 4.5,
		scale: weaponStatScales.crt_3_1,
	}),
	n53: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 2.4,
		scale: weaponStatScales.crt_3_1,
	}),
	n54: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 5.1,
		scale: weaponStatScales.crt_1_1,
	}),
	n55: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 5.1067,
		scale: weaponStatScales.crt_1_1,
	}),
	n56: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.2133,
		scale: weaponStatScales.crt_1_1,
	}),
	n57: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 48,
		scale: weaponStatScales.crt_2_1,
	}),
	n58: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 8,
		scale: weaponStatScales.crt_2_1,
	}),
	n59: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 15.0133,
		scale: weaponStatScales.crt_2_1,
	}),
	n60: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 3,
		scale: weaponStatScales.crt_2_1,
	}),
	n61: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 6,
		scale: weaponStatScales.crt_2_1,
	}),
	n62: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 14.4,
		scale: weaponStatScales.crt_3_1,
	}),
	n63: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 3.6,
		scale: weaponStatScales.crt_3_1,
	}),
	n64: new StatTableAscensionScale({
		stat: 'recharge_base',
		base: 8.5,
		scale: weaponStatScales.crt_1_1,
	}),
	n65: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 20.4,
		scale: weaponStatScales.crt_1_1,
	}),
	n66: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 3.4,
		scale: weaponStatScales.crt_1_1,
	}),
	n67: new StatTableAscensionScale({
		stat: 'atk_percent',
		base: 7.2,
		scale: weaponStatScales.crt_3_1,
	}),
	n68: new StatTableAscensionScale({
		stat: 'hp_percent',
		base: 10.8,
		scale: weaponStatScales.crt_3_1,
	}),
	n69: new StatTableAscensionScale({
		stat: 'mastery_base',
		base: 57.6,
		scale: weaponStatScales.crt_3_1,
	}),
	n70: new StatTableAscensionScale({
		stat: 'crit_rate_base',
		base: 6.8,
		scale: weaponStatScales.crt_1_1,
	}),
	n71: new StatTableAscensionScale({
		stat: 'crit_dmg_base',
		base: 6.8,
		scale: weaponStatScales.crt_1_1,
	}),
	n72: new StatTableAscensionScale({
		stat: 'dmg_phys_base',
		base: 11.26,
		scale: weaponStatScales.crt_2_1,
	}),
};

export const weaponStatTables = {
	CoolSteel: [
		enumStatTables.n1,
		enumStatTables.n2,
	],
	HarbingerofDawn: [
		enumStatTables.n1,
		enumStatTables.n3,
	],
	TravelersHandySword: [
		enumStatTables.n4,
		enumStatTables.n5,
	],
	DarkIronSword: [
		enumStatTables.n1,
		enumStatTables.n6,
	],
	FilletBlade: [
		enumStatTables.n1,
		enumStatTables.n2,
	],
	SkyriderSword: [
		enumStatTables.n7,
		enumStatTables.n8,
	],
	FavoniusSword: [
		enumStatTables.n9,
		enumStatTables.n10,
	],
	Flute: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	SacrificialSword: [
		enumStatTables.n9,
		enumStatTables.n10,
	],
	RoyalLongsword: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	LionsRoar: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	PrototypeRancour: [
		enumStatTables.n13,
		enumStatTables.n14,
	],
	IronSting: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	BlackcliffLongsword: [
		enumStatTables.n13,
		enumStatTables.n16,
	],
	BlackSword: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	AlleyFlash: [
		enumStatTables.n18,
		enumStatTables.n19,
	],
	SwordofDescension: [
		enumStatTables.n20,
		enumStatTables.n2,
	],
	FesteringDesire: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	AmenomaKageuchi: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	CinnabarSpindle: [
		enumStatTables.n9,
		enumStatTables.n23,
	],
	KagotsurubeIsshin: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	SapwoodBlade: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	XiphosMoonlight: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	ToukabouShigure: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	WolfFang: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	FinaleOfTheDeep: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FleuveCendreFerryman: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	TheDockhandsAssistant: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	SwordOfNarzissenkreuz: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	SturdyBone: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FlamebreathFlute: [
		enumStatTables.n9,
		enumStatTables.n23,
	],
	CalamityOfEshu: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	AquilaFavonia: [
		enumStatTables.n27,
		enumStatTables.n28,
	],
	SkywardBlade: [
		enumStatTables.n29,
		enumStatTables.n30,
	],
	FreedomSworn: [
		enumStatTables.n29,
		enumStatTables.n31,
	],
	SummitShaper: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	PrimordialJadeCutter: [
		enumStatTables.n33,
		enumStatTables.n34,
	],
	MistsplitterReforged: [
		enumStatTables.n27,
		enumStatTables.n35,
	],
	HaranGeppakuFutsu: [
		enumStatTables.n29,
		enumStatTables.n36,
	],
	KeyofKhajNisut: [
		enumStatTables.n33,
		enumStatTables.n37,
	],
	LightofFoliarIncision: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	SplendorOfStillWaters: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	UrakuMisugiri: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	Absolution: [
		enumStatTables.n27,
		enumStatTables.n35,
	],
	PeakPatrolSong: [
		enumStatTables.n33,
		enumStatTables.n39,
	],
	Azurelight: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	FerrousShadow: [
		enumStatTables.n1,
		enumStatTables.n41,
	],
	BloodtaintedGreatsword: [
		enumStatTables.n7,
		enumStatTables.n42,
	],
	WhiteIronGreatsword: [
		enumStatTables.n1,
		enumStatTables.n43,
	],
	DebateClub: [
		enumStatTables.n1,
		enumStatTables.n2,
	],
	SkyriderGreatsword: [
		enumStatTables.n1,
		enumStatTables.n44,
	],
	FavoniusGreatsword: [
		enumStatTables.n9,
		enumStatTables.n10,
	],
	Bell: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	SacrificialGreatsword: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	RoyalGreatsword: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	Rainslasher: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	PrototypeArchaic: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	Whiteblind: [
		enumStatTables.n11,
		enumStatTables.n45,
	],
	BlackcliffSlasher: [
		enumStatTables.n11,
		enumStatTables.n46,
	],
	SerpentSpine: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	LithicBlade: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	SnowTombedStarsilver: [
		enumStatTables.n13,
		enumStatTables.n14,
	],
	LuxuriousSeaLord: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	KatsuragikiriNagamasa: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	MakhairaAquamarine: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	Akuoumaru: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	ForestRegalia: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	MailedFlower: [
		enumStatTables.n13,
		enumStatTables.n47,
	],
	TalkingStick: [
		enumStatTables.n13,
		enumStatTables.n48,
	],
	TidalShadow: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	MegaMagicSword: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	PortablePowerSaw: [
		enumStatTables.n9,
		enumStatTables.n49,
	],
	FruitfulHook: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	Earthshaker: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FlameForgedInsight: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	SkywardPride: [
		enumStatTables.n27,
		enumStatTables.n50,
	],
	WolfsGravestone: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	SongofBrokenPines: [
		enumStatTables.n51,
		enumStatTables.n52,
	],
	Unforged: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	RedhornStonethresher: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	BeaconOfTheReedSea: [
		enumStatTables.n29,
		enumStatTables.n36,
	],
	Verdict: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	MountainKingsFang: [
		enumStatTables.n51,
		enumStatTables.n53,
	],
	AThousandBlazingSuns: [
		enumStatTables.n51,
		enumStatTables.n53,
	],
	WhiteTassel: [
		enumStatTables.n1,
		enumStatTables.n54,
	],
	Halberd: [
		enumStatTables.n4,
		enumStatTables.n55,
	],
	BlackTassel: [
		enumStatTables.n7,
		enumStatTables.n56,
	],
	DragonsBane: [
		enumStatTables.n9,
		enumStatTables.n57,
	],
	PrototypeStarglitter: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	CrescentPike: [
		enumStatTables.n13,
		enumStatTables.n14,
	],
	BlackcliffPole: [
		enumStatTables.n11,
		enumStatTables.n46,
	],
	Deathmatch: [
		enumStatTables.n9,
		enumStatTables.n58,
	],
	LithicSpear: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FavoniusLance: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	RoyalSpear: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	DragonspineSpear: [
		enumStatTables.n9,
		enumStatTables.n59,
	],
	KitainCrossSpear: [
		enumStatTables.n13,
		enumStatTables.n47,
	],
	Catch: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	WavebreakersFin: [
		enumStatTables.n18,
		enumStatTables.n60,
	],
	Moonpiercer: [
		enumStatTables.n13,
		enumStatTables.n47,
	],
	MissiveWindspear: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	BalladOfTheFjords: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	RightfulReward: [
		enumStatTables.n13,
		enumStatTables.n61,
	],
	DialoguesOfTheDesertSages: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	ProspectorsDrill: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	MountainBracingBolt: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	RainbowsTrail: [
		enumStatTables.n11,
		enumStatTables.n45,
	],
	BriefPavilionChatter: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	StaffofHoma: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	SkywardSpine: [
		enumStatTables.n27,
		enumStatTables.n50,
	],
	VortexVanquisher: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	PrimordialJadeWingedSpear: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	CalamityQueller: [
		enumStatTables.n51,
		enumStatTables.n63,
	],
	GrasscuttersLight: [
		enumStatTables.n29,
		enumStatTables.n30,
	],
	StaffOfScarletSands: [
		enumStatTables.n33,
		enumStatTables.n34,
	],
	CrimsonMoonsSemblance: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	LumidouceElegy: [
		enumStatTables.n29,
		enumStatTables.n36,
	],
	SymphonistofScents: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	FracturedHalo: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	MagicGuide: [
		enumStatTables.n7,
		enumStatTables.n42,
	],
	ThrillingTalesofDragonSlayers: [
		enumStatTables.n1,
		enumStatTables.n41,
	],
	OtherworldlyStory: [
		enumStatTables.n1,
		enumStatTables.n64,
	],
	EmeraldOrb: [
		enumStatTables.n4,
		enumStatTables.n65,
	],
	TwinNephrite: [
		enumStatTables.n4,
		enumStatTables.n66,
	],
	FavoniusCodex: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	Widsith: [
		enumStatTables.n11,
		enumStatTables.n46,
	],
	SacrificialFragments: [
		enumStatTables.n9,
		enumStatTables.n57,
	],
	RoyalGrimoire: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	SolarPearl: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	PrototypeAmber: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	MappaMare: [
		enumStatTables.n13,
		enumStatTables.n47,
	],
	BlackcliffAgate: [
		enumStatTables.n11,
		enumStatTables.n46,
	],
	EyeofPerception: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	WineandSong: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	Frostbearer: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	DodocoTales: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	HakushinRing: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	OathswornEye: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	WanderingEvenstar: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	FruitOfFulfillment: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	SacrificialJade: [
		enumStatTables.n9,
		enumStatTables.n58,
	],
	FlowingPurity: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	BalladoftheBoundlessBlue: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	AshGravenDrinkingHorn: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	WaveridingWhirl: [
		enumStatTables.n9,
		enumStatTables.n10,
	],
	RingOfCeiba: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	SkywardAtlas: [
		enumStatTables.n27,
		enumStatTables.n67,
	],
	LostPrayer: [
		enumStatTables.n29,
		enumStatTables.n36,
	],
	MemoryofDust: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	JadefallsSplendor: [
		enumStatTables.n29,
		enumStatTables.n68,
	],
	EverlastingMoonglow: [
		enumStatTables.n29,
		enumStatTables.n68,
	],
	KagurasVerity: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	ThousandFloatingDreams: [
		enumStatTables.n33,
		enumStatTables.n69,
	],
	TulaytullahsRemembrance: [
		enumStatTables.n27,
		enumStatTables.n35,
	],
	CashflowSupervision: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	TomeoftheEternalFlow: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	CranesEchoingCall: [
		enumStatTables.n51,
		enumStatTables.n63,
	],
	SurfingTime: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	StarcallersWatch: [
		enumStatTables.n33,
		enumStatTables.n69,
	],
	MorningHibernation: [
		enumStatTables.n33,
		enumStatTables.n69,
	],
	VividNotions: [
		enumStatTables.n27,
		enumStatTables.n35,
	],
	RavenBow: [
		enumStatTables.n4,
		enumStatTables.n65,
	],
	SharpshootersOath: [
		enumStatTables.n1,
		enumStatTables.n3,
	],
	RecurveBow: [
		enumStatTables.n7,
		enumStatTables.n56,
	],
	Slingshot: [
		enumStatTables.n7,
		enumStatTables.n70,
	],
	Messenger: [
		enumStatTables.n4,
		enumStatTables.n71,
	],
	FavoniusWarbow: [
		enumStatTables.n9,
		enumStatTables.n10,
	],
	Stringless: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	SacrificialBow: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	RoyalBow: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	Rust: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	PrototypeCrescent: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	CompoundBow: [
		enumStatTables.n9,
		enumStatTables.n59,
	],
	BlackcliffWarbow: [
		enumStatTables.n13,
		enumStatTables.n16,
	],
	ViridescentHunt: [
		enumStatTables.n11,
		enumStatTables.n17,
	],
	AlleyHunter: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FadingTwilight: [
		enumStatTables.n13,
		enumStatTables.n24,
	],
	MitternachtsWaltz: [
		enumStatTables.n11,
		enumStatTables.n72,
	],
	WindblumeOde: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	Hamayumi: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	Predator: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	MouunsMoon: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	KingsSquire: [
		enumStatTables.n9,
		enumStatTables.n22,
	],
	EndOfTheLine: [
		enumStatTables.n11,
		enumStatTables.n21,
	],
	IbisPiercer: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	ScionOfTheBlazingSun: [
		enumStatTables.n13,
		enumStatTables.n48,
	],
	SongOfStillness: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	Cloudforged: [
		enumStatTables.n11,
		enumStatTables.n15,
	],
	RangeGauge: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	FlowerWreathedFeathers: [
		enumStatTables.n11,
		enumStatTables.n12,
	],
	ShatteredChains: [
		enumStatTables.n13,
		enumStatTables.n25,
	],
	SequenceofSolitude: [
		enumStatTables.n11,
		enumStatTables.n26,
	],
	SkywardHarp: [
		enumStatTables.n27,
		enumStatTables.n40,
	],
	AmosBow: [
		enumStatTables.n29,
		enumStatTables.n32,
	],
	ElegyfortheEnd: [
		enumStatTables.n29,
		enumStatTables.n30,
	],
	PolarStar: [
		enumStatTables.n29,
		enumStatTables.n36,
	],
	AquaSimulacra: [
		enumStatTables.n33,
		enumStatTables.n38,
	],
	ThunderingPulse: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	HuntersPath: [
		enumStatTables.n33,
		enumStatTables.n34,
	],
	TheFirstGreatMagic: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
	SilvershowerHeartstrings: [
		enumStatTables.n33,
		enumStatTables.n37,
	],
	AstralVulturesCrimsonPlumage: [
		enumStatTables.n29,
		enumStatTables.n62,
	],
};
