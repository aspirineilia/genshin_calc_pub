import { DbObjectListHierarchy } from '../classes/DbObject/List/Hierarchy';
import { Bows } from './Weapon/Bows';
import { Catalyst } from './Weapon/Catalyst';
import { Claymore } from './Weapon/Claymore';
import { Polearm } from './Weapon/Polearm';
import { Swords} from './Weapon/Sword';

export const Weapons = new DbObjectListHierarchy({
    sword: Swords,
    bow: Bows,
    claymore: Claymore,
    catalyst: Catalyst,
    polearm: Polearm,
});
