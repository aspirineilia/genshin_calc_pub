import React, { Fragment } from 'react';
import "../../../../css/Components/Accordion/SetBonuses.css";

import { ArtifactSetIcon } from '../Icons';
import { Checkbox } from '../Inputs/Input';
import { ConditionList } from '../ConditionList';
import { ControlsBar } from '../ControlsBar';
import { GroupBox } from '../Inputs/GroupBox';
import { Lang } from '../../Lang';
import { TitledButton } from '../Inputs/Buttons';

export class AccordionSetBonuses extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.strings = {
            enable_all: this.lang.get('pool_view.enable_sets'),
            disable_all: this.lang.get('pool_view.disable_sets'),
            pieces_1: this.lang.get('artifact_set.pieces_1'),
            pieces_2: this.lang.get('artifact_set.pieces_2'),
            pieces_3: this.lang.get('artifact_set.pieces_3'),
            pieces_4: this.lang.get('artifact_set.pieces_4'),
            pieces_5: this.lang.get('artifact_set.pieces_5'),
        }
    }

    getItem(setName) {
        let setData = DB.Artifacts.Sets.get(setName);
        let pieces = [];

        let itemData = this.props.sets[setName]

        for (let p of itemData.pieces) {
            let id = setName +'-'+ p;
            pieces.push(
                <Checkbox
                    key={id}
                    checked={!!this.props.settings[id]}
                    title={this.strings['pieces_'+ p]}
                    onChange={(value) => {this.props.onChange(id, value)}}
                />
            )
        }

        let appSettings = Object.assign({char_element: 'anemo'}, this.props.setsSettings);

        return (
            <GroupBox key={setName}>
                <div className="accordion-set-bonuses">
                    <ArtifactSetIcon size="60" set={setName}/>
                    <div className="data">
                        <div className="title">
                            {this.lang.get(setData.getName())}
                            <div className="pieces">
                                {pieces}
                            </div>
                        </div>
                    </div>
                </div>
                {itemData.conditions.length ?
                    <ConditionList
                        items={itemData.conditions}
                        settings={appSettings}
                        onlySelectable={true}
                        ignoreSubconditions={true}
                        onChange={this.props.onSettingChange}
                        noWrap={true}
                    />
                : ''}
            </GroupBox>
        );
    }

    render() {
        let setBonuses = [];

        for (const setName of DB.Artifacts.Sets.getKeysSorted()) {
            if (!this.props.sets[setName]) {
                continue;
            }

            setBonuses.push( this.getItem(setName) );
        }

        return (
            <Fragment>
                <ControlsBar>
                    <div><TitledButton title={this.strings.enable_all} onClick={this.props.enableAction} icon="button-icon-unlock"/></div>
                    <div><TitledButton title={this.strings.disable_all} onClick={this.props.disableAction} icon="button-icon-lock"/></div>
                </ControlsBar>
                {setBonuses}
            </Fragment>
        );
    }
}
