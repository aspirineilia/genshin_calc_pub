import { FeatureDamagePlunge } from "../Plunge";

export class FeatureDamagePlungeCollision extends FeatureDamagePlunge {
    constructor(params) {
        params.cannotReact = true;
        super(params);
    }
}
