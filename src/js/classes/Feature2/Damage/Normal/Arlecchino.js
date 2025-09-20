import { FeatureDamageNormal } from "../Normal";

export class FeatureDamageNormalArlecchino extends FeatureDamageNormal {
    getRotationAfterItems(item, opts) {
        if (item.count > 1 || opts.insideBlock) {
            return [];
        }

        return [{
            type: 'condition',
            object: 'char',
            static: true,
            sideEffectStats: ['bond_of_life'],
            getSettings: (settings) => {
                return {
                    'common.bond_of_life': settings['common.bond_of_life'] * 0.925,
                };
            },
        }];
    }

    getRotationHitDescription(data) {
        if (data.settings.inside_rotation_block) {
            return 'arlecchino_rotation_no_bond_block';
        } else if (data.settings.rotation_counter > 1) {
            return 'arlecchino_rotation_no_bond';
        } else {
            return 'arlecchino_rotation_bond';
        }
    }

    getDisplayRotationHitMiltiplier(data) {
        return parseFloat(data.settings['common.bond_of_life']);
    }
}
