import { Artifact } from "../../Artifact";
import { Condition } from "../../Condition";


export class ConditionBooleanPiecesCount extends Condition {
    getType() {
        return '';
    }

    isActive(settings) {
        let settingName = Artifact.settingName(this.params.setName);
        if (settings[settingName] >= this.params.count) {
            return super.isActive(settings);
        }
        return false;
    }
}
