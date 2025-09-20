import React from 'react';
import "../../../../css/Components/Accordion/RequredSets.css";
import { Lang } from '../../Lang';

import { ArtifactSetIcon } from '../Icons';
import { TitledButton } from '../Inputs/Buttons';
import { GroupBox } from '../Inputs/GroupBox';
import { ControlsBar } from '../ControlsBar';
import { Condition } from '../../../classes/Condition';

export class AccordionRequredSets extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.strings = {
            reset: this.lang.get('artifacts_ui.pick_reset'),
            no_set: this.lang.get('artifacts_ui.set_not_selected')
        }
    }

    handleSetSelect(slot) {
        let setName = this.props[slot];
        let setData = DB.Artifacts.Sets.get(setName);

        UI.ArtifactSetSelectReact.show({
            selectedId: setData ? setData.getId() : 0,
            minRarity: this.props.minRarity,
            callback: (set) => {
                this.props.onChange(slot, set ? set.key : '');
            }
        });
    }

    handleSettingsChange(artSetConditions) {
        UI.ArtifactSetSettingsModal.show(artSetConditions, Object.assign(this.allSettings || {}, this.props.settings), (settings) => {
            this.props.showSettingsCallback(settings);
        });
    }

    getArtSetSettingsConditions() {
        if (!this.props.showSettingsCallback) return [];

        let setPieces = {};
        for (let name of ['set1', 'set2']) {
            let setName = this.props[name];
            if (setName) {
                setPieces[setName] = (setPieces[setName] || 0) + 2;
            }
        }

        let conditions = [];
        for (let setId of Object.keys(setPieces)) {
            let setData = DB.Artifacts.Sets.get(setId);
            conditions = conditions.concat( setData.getConditions(setPieces[setId]) );
        }

        this.allSettings = Condition.allConditionsOn(conditions);

        return conditions.filter((i) => {return i.isSerializable()});
    }

    render() {
        let set1label = this.strings.no_set;
        let set1pieces = '';
        let set2label = this.strings.no_set;
        let set2pieces = '';

        let set1Data = DB.Artifacts.Sets.get(this.props.set1);
        let set2Data = DB.Artifacts.Sets.get(this.props.set2);

        if (set1Data && set2Data && this.props.set1 === this.props.set2) {
            if (set1Data) {
                set1label = this.lang.get(set1Data.getName());
                set1pieces = this.lang.get('artifact_set.pieces_4');
            }
            set2label = '';
            set2pieces = '';
        } else {
            if (set1Data) {
                set1label = this.lang.get(set1Data.getName());
                set1pieces = this.lang.get('artifact_set.pieces_2');
            }
            if (set2Data) {
                set2label = this.lang.get(set2Data.getName());
                set2pieces = this.lang.get('artifact_set.pieces_2');
            }
        }

        let artSetConditions = this.getArtSetSettingsConditions();

        return (
            <GroupBox title={this.props.title}>
                <div className="accordion-artifact-reqsets">
                    <ArtifactSetIcon set={this.props.set1} size="60" onClick={() => {this.handleSetSelect('set1')}} />
                    <div>
                        <div className="title">{set1label}</div>
                        <div className="pieces">{set1pieces}</div>
                    </div>
                </div>
                <div className="accordion-artifact-reqsets">
                    <ArtifactSetIcon set={this.props.set2} size="60" onClick={() => {this.handleSetSelect('set2')}} />
                    <div>
                        <div className="title">{set2label}</div>
                        <div className="pieces">{set2pieces}</div>
                    </div>
                </div>
                <ControlsBar>
                    <TitledButton
                        icon="icon-delete"
                        title={this.strings.reset}
                        onClick={this.props.onReset}
                    />
                    {artSetConditions.length ? <TitledButton
                        icon="icon-ok"
                        title={this.lang.get('artifacts_ui.settings')}
                        onClick={() => this.handleSettingsChange(artSetConditions)}
                    /> : <span />}
                </ControlsBar>
            </GroupBox>
        );
    }
}
