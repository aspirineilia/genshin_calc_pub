import React from 'react';

import "../../../css/Components/Tab/Enemy.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { EnemyObjectBlock } from '../Components/ObjectBlock';
import { ResistanceBlock } from '../Components/ResistanceBlock';
import { ReactTab } from '../Components/Tab';
import { Lang } from '../Lang';
import { Tab } from "../Tab";
import { CustomEnemy } from './Enemy/Custom';

export class EnemyTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'enemy';
        this.rightRab = true;
        this.title = 'tab_header.enemy';
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
            <EnemyView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class EnemyView extends React.Component {
    constructor(props) {
        super(props);
        this.lang = new Lang();

        this.state = {};
        this.strings = {
            title: this.lang.get(this.props.title),
        };
    }

    handleEnemyChange() {
        let enemy = this.props.app.getEnemy().object;
        let enemyId = enemy ? enemy.getId() : 0;

        UI.EnemySelectReact.show({
            selectedId: enemyId,
            callback: (item) => {
                if (item) {
                    this.props.app.setEnemy(item);
                } else {
                    this.props.app.setEnemy(null);
                }
            },
        });
    }

    handleSettingChange(name, value) {
        let conditions = this.props.app.getConditions({objects: ['enemy']});
        let oldSettings = this.props.app.getSettings();
        let settings = {};

        for (let cond of conditions) {
            let n  = cond.getName();
            if (n && oldSettings[n] !== undefined) {
                settings[n] = oldSettings[n];
        }
        }

        settings[name] = value;

        this.props.app.setEnemySettings(settings);
    }

    handleLevelChange(level) {
        this.props.app.setEnemyLevels({
            level: level,
        });
    }

    handleResistanceChange(element, value) {
        let res = this.props.app.currentSet().enemy.getResistances();
        res[element] = value;
        this.props.app.setEnemyResistances(res);
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

    tabContent() {
        let data = this.props.app.current.getBuildData();
        data.applyPostEffects();
        let enemy = this.props.app.getEnemy().object;
        let conditions = this.props.app.getConditions({objects: ['enemy']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <EnemyObjectBlock
                        enemy={enemy}
                        stats={data.stats}
                        settings={data.settings}
                        onObjectChange={() => this.handleEnemyChange()}
                        onLevelChange={(data) => this.handleLevelChange(data)}
                    />
                    <CustomEnemy
                        hidden={!!enemy}
                        resistances={this.props.app.currentSet().enemy.getResistances()}
                        onResistanceChange={(element, value) => this.handleResistanceChange(element, value)}
                    />
                    <ResistanceBlock
                        title={this.lang.get('object_view.total_resistance')}
                        stats={data.stats}
                        settings={data.settings}
                    />
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ConditionList
                        addClass="last"
                        items={conditions}
                        settings={data.settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}
