import React from "react";
import parse from 'html-react-parser';

import "../../../css/Components/ArtifactGenerator.css"

import { AccordionRequredSets } from "./Accordion/RequredSets";
import { Dropdown } from "./Inputs/Dropdown";
import { GroupBox } from "./Inputs/GroupBox";
import { Lang } from "../Lang";
import { Checkbox, NumberInput } from "./Inputs/Input";
import { Slider } from "./Inputs/Slider";

let lang = new Lang();

export const DEFAULT_SETTINGS = {
    rolls: 25,
    critRolls: 20,
    rollMode: 'avg',
    minRecharge: 100,
    kqms: true,
}

export class ArtifactGeneratorSettings extends React.Component {
    constructor(props) {
        super(props);

        this.rollModes = [
            {value: 'min', text: lang.get('art_gen.roll_mode_min')},
            {value: 'avg', text: lang.get('art_gen.roll_mode_avg')},
            {value: 'max', text: lang.get('art_gen.roll_mode_max')},
        ];
    }

    changeSettings(data) {
        let newSettings = Object.assign({}, this.props.settings, data);
        this.props.onChange(newSettings);
    }

    handleRequiredSets(slot, name) {
        let settings = Object.assign({}, this.props.settings.required_sets);
        settings[slot] = name;
        this.changeSettings({required_sets: settings});
    }

    handleRequiredSetsReset() {
        this.changeSettings({
            required_sets: {
                set1: '',
                set2: '',
            },
        });
    }

    handleRollChange(value) {
        this.changeSettings({
            rolls: value,
            critRolls: Math.min(value, this.props.settings.critRolls),
        });
    }

    handleCritRollChange(value) {
        this.changeSettings({critRolls: value});
    }

    handleRechacrgeChange(value) {
        this.changeSettings({minRecharge: value});
    }

    handleRollMode(value) {
        this.changeSettings({rollMode: value});
    }

    handleKqmsChange(value) {
        this.changeSettings({kqms: value});
    }

    handleSetSettings(settings) {
        this.changeSettings({required_sets_settings: settings});
    }

    render() {
        let settings = this.props.settings || {};

        return (
            <div className="artifact-generator">
                <AccordionRequredSets
                    title={lang.get('art_gen.set_bonus')}
                    set1={settings.required_sets ? settings.required_sets.set1 : ''}
                    set2={settings.required_sets ? settings.required_sets.set2 : ''}
                    settings={settings.required_sets_settings || {}}
                    onChange={(slot, name) => this.handleRequiredSets(slot, name)}
                    onReset={() => this.handleRequiredSetsReset()}
                    minRarity={5}
                    showSettingsCallback={(settings) => this.handleSetSettings(settings)}
                />
                <GroupBox title={lang.get('art_gen.conditions')}>
                <div className="line">
                        <div className="name">{parse(lang.get('art_gen.kqms'))}</div>
                        <div className="control">
                            <Checkbox
                                checked={settings.kqms}
                                onChange={(value) => this.handleKqmsChange(value)}
                            />
                        </div>
                    </div>
                    <div className="line">
                        <div className="name">{lang.get('art_gen.min_recharge')}</div>
                        <div className="control">
                            <NumberInput
                                minValue={100}
                                maxValue={300}
                                nonEmpty={true}
                                value={settings.minRecharge}
                                addClass="number-input"
                                onChange={(value) => this.handleRechacrgeChange(value)}
                            />
                        </div>
                    </div>
                    <div className="line rolls">
                        <div className="name">{lang.get('art_gen.useful_rolls')}</div>
                        {settings.kqms ? <div className="value">-</div> : <>
                            <div className="value">{settings.rolls}</div>
                            <div className="control">
                                <Slider
                                    min={5}
                                    max={40}
                                    value={settings.rolls}
                                    onChange={(value) => this.handleRollChange(value)}
                                />
                            </div>
                        </>}
                    </div>
                    <div className="line rolls">
                        <div className="name">{lang.get('art_gen.crit_rolls')}</div>
                        {settings.kqms ? <div className="value">-</div> : <>
                            <div className="value">{settings.critRolls}</div>
                            <div className="control">
                                <Slider
                                    min={0}
                                    max={Math.min(35, settings.rolls)}
                                    value={settings.critRolls}
                                    onChange={(value) => this.handleCritRollChange(value)}
                                />
                            </div>
                        </>}
                    </div>
                    <div className="line">
                        <div className="name">{lang.get('art_gen.roll_mode')}</div>
                        {settings.kqms ? <div className="value">-</div> : <>
                            <div className="control dropdown">
                                <Dropdown
                                    items={this.rollModes}
                                    selected={settings.rollMode}
                                    onChange={(item) => this.handleRollMode(item.value)}
                                />
                            </div>
                        </>}
                    </div>
                </GroupBox>
            </div>
        );
    }
}

export function generatorSettings(settings) {
    let sets = [];
    if (settings.required_sets.set1) {
        sets = sets.concat([
            settings.required_sets.set1,
            settings.required_sets.set1,
        ]);
    }

    if (settings.required_sets.set2) {
        sets = sets.concat([
            settings.required_sets.set2,
            settings.required_sets.set2,
        ]);
    }

    return {
        sets: sets,
        count: settings.rolls,
        critRolls: settings.critRolls,
        mode: settings.rollMode,
        minRecharge: settings.minRecharge,
        kqms: settings.kqms,
        required_sets_settings: settings.required_sets_settings,
    };
}

export function getDefaultSettings() {
    return {
        rolls: DEFAULT_SETTINGS.rolls,
        critRolls: DEFAULT_SETTINGS.critRolls,
        rollMode: DEFAULT_SETTINGS.rollMode,
        minRecharge: DEFAULT_SETTINGS.minRecharge,
        kqms: DEFAULT_SETTINGS.kqms,
        required_sets: {
            set1: '',
            set2: '',
        },
        required_sets_settings: {},
    };
}

export function cloneSettings(settings) {
    return {
        rolls: settings.rolls,
        critRolls: settings.critRolls,
        rollMode: settings.rollMode,
        minRecharge: settings.minRecharge,
        kqms: settings.kqms,
        required_sets: {
            set1: settings.required_sets.set1 || '',
            set2: settings.required_sets.set2 || '',
        },
        required_sets_settings: Object.assign({}, settings.required_sets_settings),
    };
}
