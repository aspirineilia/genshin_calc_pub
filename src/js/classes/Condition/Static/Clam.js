import { ConditionStatic } from "../Static";

export class ConditionStaticClam extends ConditionStatic {
    getAllConditionsOn(settings) {
        return this.getData(settings || {}).settings;
    }
}
