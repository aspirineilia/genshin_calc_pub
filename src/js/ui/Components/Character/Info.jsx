import React from 'react';
import "../../../../css/Components/Char/Info.css"
import { Stats } from '../../../classes/Stats';
import { Lang } from '../../Lang';
import { StatLine } from '../../Tab/Artifacts/StatsInfo';
import { ArtifactList } from '../Artifact';
import { ControlsBar, ControlsBarDivider } from '../ControlsBar';
import { ArtifactIcon, CharIcon, WeaponIcon } from '../Icons';
import { TitledButton } from '../Inputs/Buttons';
import { GroupBox } from '../Inputs/GroupBox';
import { getLevelData } from '../ObjectBlock';

let lang = new Lang();

export class CharInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
        };
    }

    handleShowDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        let charData = this.props.set.getChar();
        let char = charData.object;
        let weapon = this.props.set.getWeapon().object;
        let artifacts = this.props.set.getArtifacts();

        let title = this.props.title || UI.Lang.get(char.getName());
        let subtitle = '';
        let items = [];
        let buttons = [];
        let moreButtons = [];
        let artifactList = [];

        if (weapon) {
            items.push(<WeaponIcon key='weapon' weapon={weapon} size="40" addClass="char-info-item-icon" />)
        }

        for (let slot of Object.keys(artifacts)) {
            if (!artifacts[slot]) {
                continue;
            }

            let artifact = artifacts[slot];
            artifactList.push(artifact);

            items.push(
                <ArtifactIcon
                    key={`artifact_${slot}`}
                    artifact={artifact}
                    locked={this.props.showLocked && artifact.isLocked()}
                    size="40"
                    addClass="char-info-item-icon"
                />
            );
        }

        let levels = charData.getLevels();
        let levelData = getLevelData(levels.level, levels.ascension);

        if (levelData) {
            subtitle = (
                <div className="level">
                    {levels.level}/{levelData.maxLevel} c{levels.constellation}
                </div>
            );
        }

        if (this.props.buttons) {
            let buttonCounter = 0;
            for (let item of this.props.buttons) {
                buttons.push(
                    <div
                        key={++buttonCounter}
                        className={`line-button ${item.icon}`}
                        data-tooltip={item.tooltip}
                        onClick={() => item.callback(this.props.set, this.props.callbackData)}
                    />
                );
            }
        }

        if (this.props.moreButtons) {
            let moreButtonCounter = 0;
            for (let item of this.props.moreButtons) {
                moreButtons.push(
                    <TitledButton
                        key={'more_button'+ (++moreButtonCounter)}
                        icon={item.icon}
                        title={item.title}
                        onClick={() => item.callback(this.props.set, this.props.callbackData)}
                    />
                );
            }
        }

        let showMoreInfo = this.props.statDetails || this.props.artifactDetails;

        return (
            <div className="char-info">
                <div className="line">
                    <CharIcon char={char} size={80} />
                    <div className="data">
                        <div className="name">
                            {this.props.showEdit ? <div className="gi-char-info-name-edit" /> : ''}
                            <div className="name-title">
                                <div className="title">{title}</div>
                                {subtitle}
                            </div>
                        </div>
                        <div className="items">
                            {items}
                            {showMoreInfo ?
                                <div
                                    className="show-arts"
                                    onClick={() => this.handleShowDetails()}
                                >
                                    {lang.get(this.state.showDetails ? 'char_info.hide_artifacts' : 'char_info.show_artifacts')}
                                </div>
                                : ''
                            }
                            <div className="flex-spacer"></div>
                            {this.props.displayedStats || this.props.displayedSettings ? <CharInfoStats
                                build={this.props.set}
                                stats={this.props.displayedStats || []}
                                settings={this.props.displayedSettings || []}
                            />: ''}
                            {buttons}
                        </div>
                    </div>
                </div>
                {showMoreInfo && this.state.showDetails ? <div>
                    {moreButtons.length > 0 ? <ControlsBar>
                        <ControlsBarDivider />
                        {moreButtons}
                    </ControlsBar> : ''}
                    {this.props.statDetails ? <BuildDetails build={this.props.set} /> : ''}
                    {this.props.artifactDetails ? <ArtifactList
                        items={artifactList}
                        onLock={this.props.onLockArtifact}
                        onUnlock={this.props.onUnlockArtifact}
                        showLockCallback={this.props.showLockCallback}
                    /> : ''}
                </div> : ''}
            </div>
        );
    }
}

function BuildDetails(props) {
    let build = props.build;

    let charData = build.getChar();
    let skills = charData.getSkills();
    let data = build.getStats().stats;

    let items = [];

    for (let stat of ['hp', 'atk', 'def', 'mastery', 'recharge', 'crit_rate', 'crit_dmg']) {
        let value = data.getTotal(stat);

        if (value) {
            items.push(
                <StatLine
                    key={stat}
                    stat={stat}
                    value={value}
                    unsigned={true}
                />
            );
        }
    }

    let elementalBonues = [];
    for (let item of DB.Objects.Elements.getList()) {
        let stat = 'dmg_'+ item.name;
        let value = data.getTotal(stat);

        if (value) {
            elementalBonues.push({
                name: stat,
                value: value,
            });
        }
    }

    if (elementalBonues.length > 0) {
        elementalBonues = elementalBonues.sort((a, b) => {return b.value - a.value});

        let stat = elementalBonues[0].name;
        items.push(
            <StatLine
                key={stat}
                stat={stat}
                value={data.getTotal(stat)}
                unsigned={true}
            />
        );
    }

    return (
        <GroupBox>
            <StatLine
                key="talents"
                stat=""
                title={lang.get('char_info.skills')}
                strValue={skills.attack + ' - ' + skills.elemental + ' - ' + skills.burst}
                unsigned={true}
            />
            {items}
        </GroupBox>
    );
}

function CharInfoStats(props) {
    let items = [];
    let data = props.build.getBaseStatsWithSets();
    let stats = data.stats;
    let settings = data.settings;

    for (let setting of props.settings) {
        items.push(
            <div key={setting} className="line">
                <div className="line-name">{lang.get('stat_settings.'+ setting)}</div>
                <div className="line-value">{settings[setting] || 0}</div>
            </div>
        );
    }

    for (let stat of props.stats) {
        let statTrim = stat.replace(/_total$/, '');
        let value = statTrim != stat ? stats.getTotal(statTrim) : stats.get(stat);

        items.push(
            <div key={stat} className="line">
                <div className="line-name">{lang.get('stat.'+ statTrim)}</div>
                <div className="line-value">{Stats.format(statTrim, value) || 0}</div>
            </div>
        );
    }

    return (
        <div className="stat-items">
            {items}
        </div>
    );
}
