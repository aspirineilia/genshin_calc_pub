import { DbObjectListEnemies } from "../classes/DbObject/List/Enemies";
import { Abyss } from "./Enemies/Abyss";
import { Automaton } from "./Enemies/Automaton";
import { Bosses } from "./Enemies/Bosses";
import { Elemental } from "./Enemies/Elemental";
import { Fatui } from "./Enemies/Fatui";
import { Hilichurl } from "./Enemies/Hilichurl";
import { HydroMimics } from "./Enemies/HydroMimics";
import { LocalLegends } from "./Enemies/LocalLegends";
import { Magical } from "./Enemies/Magical";
import { TreasureHoarders } from "./Enemies/TreasureHoarders";

export const Enemies = new DbObjectListEnemies({
    hilichurl: Hilichurl,
    elemental: Elemental,
    abyss: Abyss,
    magical: Magical,
    fatui: Fatui,
    automaton: Automaton,
    treasure_hoarders: TreasureHoarders,
    hydro_mimics: HydroMimics,
    local_legends: LocalLegends,
    bosses: Bosses,
});
