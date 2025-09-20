import { Artifacts } from './Artifacts';
import { Buffs } from './Buffs';
import { CalcData } from './CalcData';
import { Chars } from './Char';
import { Conditions } from './Conditions';
import { Enemies } from './Enemies';
import { Features } from './Features';
import { Food } from './Food';
import { Objects } from './Objects';
import { Weapons } from './Weapons';

export const DB = {
    Artifacts: Artifacts,
    Buffs: Buffs,
    Chars: Chars,
    Conditions: Conditions,
    Elements: ['phys', 'anemo', 'cryo', 'geo', 'hydro', 'pyro', 'electro', 'dendro'],
    Enemies: Enemies,
    Features: Features,
    Food: Food,
    Weapons: Weapons,
    Objects: Objects,
    CalcData: CalcData,
};
