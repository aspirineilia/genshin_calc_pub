import { Artifact } from "./classes/Artifact";
import { ArtifactsSuggest } from "./classes/ArtifactsSuggest";
import { ArtifactsSuggestSort } from "./classes/ArtifactsSuggestSort";
import { CalcSet } from "./classes/CalcSet";
import { Condition } from "./classes/Condition";
import { ConditionAnd } from "./classes/Condition/And";
import { ConditionBoolean } from "./classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "./classes/Condition/Boolean/CharElement";
import { ConditionBooleanPiecesCount } from "./classes/Condition/Boolean/PiecesCount";
import { ConditionOr } from "./classes/Condition/Or";
import { makeStatTotalItem } from "./classes/Feature2/Compile/Helpers";
import { CBlock } from "./classes/Feature2/Compile/Types";
import { CMulti, CPostEffect, CSum, CVar } from "./classes/Feature2/Compile/Types/Block";
import { CCritDmg } from "./classes/Feature2/Compile/Types/Damage";
import { CConst, CMultiplierDefence, CStat, CStatTotal } from "./classes/Feature2/Compile/Types/Item";
import { FeatureCompiler, getUsedStats } from "./classes/Feature2/Compiler";
import { FeatureDamageNormal } from "./classes/Feature2/Damage/Normal";
import { FeatureMultiplier } from "./classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "./classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "./classes/Feature2/PostEffectValue";
import { FeatureShield } from "./classes/Feature2/Shield";
import { ArtifactGenerator, getMainStatCombinations, getStatRolls, StatDistributor, StatsObject } from "./classes/Generator/Artifacts";
import { ArtifactGeneratorKQM } from "./classes/Generator/ArtifactsKQM";
import { PostEffectSetBonusViridiscent } from "./classes/PostEffect/SetBonus/Viridescent";
import { PostEffectStats } from "./classes/PostEffect/Stats";
import { PostEffectStatsAtk } from "./classes/PostEffect/Stats/Atk";
import { PostEffectStatsHP } from "./classes/PostEffect/Stats/HP";
import { Serializer } from "./classes/Serializer";
import { StatTable } from "./classes/StatTable";
import { ValueTable } from "./classes/ValueTable";
import { DB } from "./db/DB";

global.DB = DB;

function log(object) {
    console.dir(object, {depth: null, breakLength: 180, compact: 1})
}

// const build_hash = 'bBbDmggfkkbcEfDmgfafbBefubbekGpdtjEbeEbbmfuccejCohBleCgkKebBefudhekHmhxjCkcBhbBefuepebRgjCwcBbkFcbBefufjeiEtkHmhBqdvaDmcbbqecrdBocbjcffbBFfckdefBgbbBMmhcababFcbcdaaa';
const build_hash = 'bBbDmggfkkbcEfDmgfafbBefubbekGpdtjEbeEbbmfuccejCohBleCgkKebBefudhekHmhxjCkcBhbBefuepebRgjCwcBbkFcbBefufjeiEtkHmhBqdvaDmcbbqecrdBocbjcffbBFfckdefBgcbBMmchcababFcbcdaaa';
// let artifactsHashes = [ 'bBofubbeeDvjCokHuht', 'bBofuccehBjjBbeCbkNe', 'bBufudgeeEnkHfiCajDx', 'bffueseeDvjBfkKmbKj', 'bBkfufjeeCgbSkhBhkKu' ];
let artifactsHashes = [
    "bBrfubbehqeCbcskNe",
    "bBofuccehBjjBbeCbkNe",
    "bBofudgejCwkHuiCgfFj",
    "bffueseeDvjBfkKmbKj",
    "bBrfufjekGxiBthCgbSk",
    "bBofudgejDtfHpiCgkFz",
    "bBofufkejEbhBodBneDp",
    "bBofubbeeDvjCokHuht",

    // phys
    "bBufubbecteCbjCokKu",
    "bBufuccehvjCokFceHq",
    "bBdfuddeiCgkJxjBnfEf",
    "bBofuelejFggBvkEfht",
    "bBdfufkebVwcqjDteDv",

    // shimenawa
    // "bBffubbeeDejDxkFziCn",
    // "bBffucceeEbkHfjCogDj",
    // "bBffuddekFsfEujDxiDt",
    // "bBffufjedxeEhfHpkEu",

    // vv
    // "bBafufkeeDviBtgHkjBf",
    // "bBafuemekFkgBpeGccBh",
    // "bBafuddehqgDvjCkkHu",
    // "bBafuccehvjCokFceHq",
    // "bBafubbecteCbjCokKu",

    // gilded
    // "bBofubbeeDvjCokHuht",
    // "bBofuccehBjjBbeCbkNe",
    // "bBofudgejDtfHpiCgkFz",
    // "bBofufjedteEbgDvkIc",

    // 'bBffufjedxeEhfHpkEu',
    // 'bBafufkeeDviBtgHkjBf',
];

let settings = {
    "slots": {
        "flower": true,
        "plume": true,
        "sands": true,
        "goblet": true,
        "circlet": true
    },
    "sets": {
        "SongOfDaysPast-2": true,
        "SongOfDaysPast-4": true,
        "GoldenTroupe-2": true,
        "GoldenTroupe-4": true,
        "MarechausseeHunter-2": true,
        "MarechausseeHunter-4": true,
        "DewflowersGlow-2": true,
        "FlowerOfParadiseLost-2": true,
        "FlowerOfParadiseLost-4": true,
        "GildedDreams-2": true,
        "GildedDreams-4": true,
        "DeepwoodMemories-2": true,
        "DeepwoodMemories-4": true,
        "OceanHuedClam-2": true,
        "OceanHuedClam-4": true,
        "HuskofOpulentDreams-2": true,
        "HuskofOpulentDreams-4": true,
        "EmblemofSeveredFate-2": true,
        "EmblemofSeveredFate-4": true,
        "ShimenawasReminiscence-2": true,
        "ShimenawasReminiscence-4": true,
        "PaleFlame-2": true,
        "PaleFlame-4": true,
        "TenacityofMillelith-2": true,
        "TenacityofMillelith-4": true,
        "HeartofDepth-2": true,
        "HeartofDepth-4": true,
        "ArchaicPetra-2": true,
        "ArchaicPetra-4": true,
        "BloodstainedChivalry-2": true,
        "BloodstainedChivalry-4": true,
        "NoblesseOblige-2": true,
        "NoblesseOblige-4": true,
        "CrimsonWitch-2": true,
        "CrimsonWitch-4": true,
        "ThunderingFury-2": true,
        "ThunderingFury-4": true,
        "WandererTroupe-2": true,
        "WandererTroupe-4": true,
        "ViridescentVenerer-2": true,
        "ViridescentVenerer-4": true,
        "GladiatorFinale-2": true,
        "GladiatorFinale-4": true,
        "MaidenBeloved-2": true,
        "BlizzardStrayer-2": true,
        "BlizzardStrayer-4": true,
        "Exile-2": true,
        "Instructor-2": true,
        "Instructor-4": true
    },
    "sets_settings": {
        "set.song_of_days_past_4": true,
        "set.golden_troupe_4": true,
        "set.marechaussee_hunter_4": 3,
        "set.vourukashas_glow_4": 4,
        "set.flower_of_paradise_lost_4": 2,
        "set.gilded_dreams_4": false,
        "set.deepwood_memories_4": true,
        "set.husk_of_opulent_dreams_4_def": 4,
        "set.husk_of_opulent_dreams_4_geo": 4,
        "set.shimenawas_reminiscence_4": true,
        "set.pale_flame_4": 2,
        "set.tenacity_of_the_millelith_4": true,
        "set.heart_of_depth_4": true,
        "set_bonus.archaic_petra_4": 0,
        "set.bloodstained_chivalry_4": true,
        "set.noblesse_oblige_4": true,
        "set.crimson_witch_of_flames_4": 1,
        // "set.viridescent_venerer_4": "",
        "set.viridescent_venerer_4": "cryo;electro;hydro;pyro",
        "set.maiden_beloved_4": true,
        "set.instructor_4": true
    },
    setMinValues: {},
    setMaxValues: {},
    stats: {
        recharge_min: '150',
        // crit_rate_min: 80,
        // atk_min: 80,
    },
};

let build = CalcSet.deserialize(Serializer.unpack(build_hash));
let buildData = build.getBuildData();

let artifactsList = [];
for (let data of artifactsHashes) {
    artifactsList.push(Artifact.deserialize( Serializer.unpack(data) ));
}

let featureName = 'attack.normal_hit_1';
// let featureName = 'skill.alhaitham_mirror_1_dmg';
// let featureName = 'skill.skill_dmg';
// let featureName = 'reaction.swirl_pyro';
// let featureName = 'burst.baal_musou_no_hitotachi_dmg';
// let featureName = 'rotation.total';
// let featureName = 'stats.crit_rate';

// console.log(buildData.postEffectByPriority());

// let feature = build.getFeatureByName(featureName);
// log(feature);
// let feature = build.compileRotation();
// log(feature.items)
// log(buildData.settings)
// log(feature.getTree(buildData))
// buildData.settings.rotation_include = 'cryo';

// log(feature.getResult(buildData));

// let post = new PostEffectStats({
//     from: 'furina_fanfare_stacks',
//     global: 1,
//     exceed: 400,
//     percent: new StatTable('hp_percent', [0.035]),
//     statCap: new ValueTable([140]),
// });

// let feature = new FeaturePostEffectValue({
//     category: 'burst',
//     name: 'furina_max_hp',
//     postEffect: post,
//     format: 'percent',
// });
// log(feature.getTree(buildData));
// log(feature.getResult(buildData));

let suggester = new ArtifactsSuggest({
    build: build.clone(),
    artifacts: artifactsList,
    featureName: featureName,
    featureType: 'average',
    settings: settings,
    limit: 5,
});

log(suggester.prepare());
// log(suggester.feature.compiled.tree);

let results = suggester.getResult((current, total) => {
    log(current + ' / ' + total)
});
// console.dir(results, {depth: 4})

for (let item of results) {
    let b = build.clone();
    b.replaceArtifacts(item.artifacts);
    let f = b.getFeatureResultByName(featureName);
    console.log(item.value, f.average, Math.abs(item.value - f.average) < 1 ? 'ok' : 'fail')
}

// let params = {
//     build: build,
//     feature: featureName,
//     settings: {
//         "sets": [],
//         "count": 40,
//         "critRolls": 40,
//         "mode": "avg",
//         "minRecharge": 100,
//         kqms: true,
//     },
// }

// params.combinations = getMainStatCombinations(params);
// // params.combinations = [{sands: 'atk_percent', goblet: 'dmg_cryo', circlet: 'crit_rate'}];

// // let generator = new ArtifactGenerator(params);
// let generator = new ArtifactGeneratorKQM(params);
// let result = generator.generate();
// // log(result[0].rollsPerStat)

// for (let item of result) {
//     for (let art of item.artifacts) {
//         build.setArtifact(art);
//     }

//     let artConditions = build.getConditions({objects: 'artifacts'});
//     build.setArtifactsSettings(Condition.allConditionsOn(artConditions));

//     let fres = build.getFeatureResultByName(featureName);
//     let diff = Math.abs(Math.max(item.value, fres.average) - Math.min(item.value, fres.average)) / Math.max(item.value, fres.average) * 10000;
//     console.log(item.value, fres.average, diff < 1 ? 'ok' : 'fail')
// }
