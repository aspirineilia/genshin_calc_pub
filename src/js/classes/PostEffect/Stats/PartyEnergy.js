import { makeStatItem } from "../../Feature2/Compile/Helpers";
import { CSum } from "../../Feature2/Compile/Types/Block";
import { PostEffectStats } from "../Stats";

export class PostEffectPartyEnergy extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return new CSum([
            makeStatItem('burst_energy_cost', data.stats),
            makeStatItem('party_burst_energy_cost', data.stats),
        ]);
    }
}
