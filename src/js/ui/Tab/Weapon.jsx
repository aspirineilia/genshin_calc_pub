import React from 'react';

import "../../../css/Components/Tab/Weapon.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { WeaponObjectBlock } from '../Components/ObjectBlock';
import { ReactTab } from '../Components/Tab';
import { Lang } from '../Lang';
import { Tab } from "../Tab";

export class WeaponTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'weapon';
        this.rightRab = true;
        this.title = 'tab_header.weapon';
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
        });
    }

    createContent() {
        return (
            <WeaponView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class WeaponView extends React.Component {
    constructor(props) {
        super(props);
        this.lang = new Lang();

        this.state = {};
        this.strings = {
            title: this.lang.get(this.props.title),
        };
    }

    handleWeaponChange() {
        let char = this.props.app.getChar().object;
        let weapon = this.getEquippedWeapon()

        UI.WeaponSelectReact.show({
            changeWeaponType: false,
            weaponType: char.weapon,
            selectedId: weapon ? weapon.getId() : 0,
            callback: (weapon) => {
                this.props.app.setWeapon(weapon);
            },
        });
    }

    handleSettingChange(name, value) {
        let conditions = this.props.app.getConditions({objects: ['weapon']});
        let oldSettings = this.props.app.getSettings();

        let settings = {};

        for (let cond of conditions) {
            let n  = cond.getName();
            if (n && oldSettings[n] !== undefined) {
                settings[n] = oldSettings[n];
            }
        }

        settings[name] = value;

        this.props.app.setWeaponSettings(settings);
    }

    handleLevelChange(data) {
        let settings = this.props.app.getSettings();

        let levels = Object.assign({
            level: settings.weapon_level,
            ascension: settings.weapon_ascension,
            refine: settings.weapon_refine,
        }, data);

        this.props.app.setWeaponLevels(levels);
    }

    render() {
        return (
            <ReactTab
                title={this.strings.title}
            >
                {this.tabContent()}
            </ReactTab>
        );
    }

    getEquippedWeapon() {
        return this.props.app.getWeapon().object;
    }

    tabContent() {
        let settings = this.props.app.getStats().settings;
        let weapon = this.getEquippedWeapon();
        let conditions = this.props.app.getConditions({objects: ['weapon']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <WeaponObjectBlock
                        weapon={weapon}
                        settings={settings}
                        onObjectChange={() => this.handleWeaponChange()}
                        onLevelChange={(data) => this.handleLevelChange(data)}
                    />
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ConditionList
                        addClass="last"
                        items={conditions}
                        settings={settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}
