import { DbObjectListHierarchy } from "../classes/DbObject/List/Hierarchy";
import { Attack } from "./Food/Attack";
import { Defence } from "./Food/Defence";
import { Potion } from "./Food/Potion";

export const Food = new DbObjectListHierarchy({
    Attack: Attack,
    Defence: Defence,
    Potion: Potion,
});
