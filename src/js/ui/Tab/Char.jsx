import React from 'react';

import "../../../css/Components/Tab/Char.css"

import { ConditionList } from '../Components/ConditionList';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { CharObjectBlock } from '../Components/ObjectBlock';
import { ReactTab } from '../Components/Tab';
import { Lang } from '../Lang';
import { Tab } from "../Tab";

export class CharTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'char';
        this.rightRab = true;
        this.title = 'tab_header.char';
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
            <CharView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class CharView extends React.Component {
    constructor(props) {
        super(props);
        this.lang = new Lang();

        this.state = {};
        this.strings = {
            title: this.lang.get(this.props.title),
        };
    }

    handleSettingChange(name, value) {
        let conditions = this.props.app.getConditions({objects: ['char']});
        let oldSettings = this.props.app.getSettings();
        let settings = {};

        for (let cond of conditions) {
            for (let n of cond.getNamesList()) {
                if (n && oldSettings[n] !== undefined) {
                    settings[n] = oldSettings[n];
                }
            }
        }

        settings[name] = value;

        this.props.app.setCharSettings(settings);
    }

    handleCharChange() {
        let currentChar = this.props.app.getChar().object

        UI.CharSelectReact.show({
            selectedId: currentChar.getId(),
            showReset: true,
            callback: (char) => {
                if (char) {
                    this.props.app.setChar(char);
                } else {
                    this.props.app.resetBuild(this.props.app.currentSet().getChar().getId());
                }
            },
        });
    }

    handleLevelChange(data) {
        let settings = this.props.app.getSettings();

        let levels = Object.assign({
            level: settings.char_level,
            ascension: settings.char_ascension,
            constellation: settings.char_constellation,
        }, data);

        this.props.app.setCharLevels(levels);
    }

    handleSkillChange(data) {
        let skills = this.props.app.getChar().skills;

        let levels = Object.assign({
            attack: skills.attack,
            elemental: skills.elemental,
            burst: skills.burst,
        }, data);

        this.props.app.setCharSkills(levels);
    }

    handleInfoClick(name) {
        let char = this.props.app.getChar();
        UI.WindowCharTalent.show(name, char.getId());
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
        let settings = this.props.app.getStats().settings;
        let char = this.props.app.getChar();
        let conditions = this.props.app.getConditions({objects: ['char']});

        return (
            <FullHeight>
                <FullHeightStatic>
                    <CharObjectBlock
                        char={char}
                        settings={settings}
                        skills={this.props.app.getChar().skills}
                        onObjectChange={() => this.handleCharChange()}
                        onInfoClick={(name) => this.handleInfoClick(name)}
                        onLevelChange={(data) => this.handleLevelChange(data)}
                        onSkillChange={(data) => this.handleSkillChange(data)}
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

