import { CalcObject } from "../CalcObject";
import { Rotation } from "../Rotation";
import { RotationCompiler } from "../RotationCompiler";

export class CalcObjectRotation extends CalcObject {
    constructor() {
        super();
        this.object = new Rotation();
    }

    set(data) {
        this.object = data ? data.clone() : new Rotation();
    }

    isBeta() {
        return false;
    }

    getConditions() {
        return [];
    }

    getFeatures() {
        return [];
    }

    getPostEffects() {
        return [];
    }

    getSettings() {
        return [];
    }

    getMultipliers() {
        return [];
    }

    serialize() {
        return this.object.serialize();
    }

    static deserialize(input) {
        if (input.length == 0) {
            return new CalcObjectRotation();
        }

        let rotation = Rotation.deserialize(input);
        let result   = new CalcObjectRotation();

        result.set(rotation);
        return result;
    }
}
