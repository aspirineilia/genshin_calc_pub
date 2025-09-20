import { DbObjectListSerialize } from "../classes/DbObject/List/Serialize";
import { Artifacts } from "./Buffs/Artifacts";
import { ElementalResonance } from "./Buffs/ElementalResonance";
import { Static } from "./Buffs/Static";
import { Weapons } from "./Buffs/Weapons";

export const Buffs = new DbObjectListSerialize({
    ElementalResonance: ElementalResonance,
    Artifacts: Artifacts,
    Weapons: Weapons,
    Static: Static,
});
