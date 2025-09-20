import React from 'react';
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';

import "../../../css/ui/Tooltip/Artifact.css"

import { Lang } from '../Lang';
import { Modal } from '../Modal';
import { waitForCondition } from '../../Utils';
import { Stats } from '../../classes/Stats';

let lang = new Lang();

export class ArtifactTooltip extends Modal {
    createContent() {
        return (
            <ArtifactTooltipWindow
                ref={(obj) => this.modal = obj}
                app={this.app}
            />
        )
    }

    hide() {
        waitForCondition(
            () => {return this.modal},
            () => {this.modal.hide()},
        );
    }

    updatePosition() {
        waitForCondition(
            () => {return this.modal},
            () => {this.modal.updatePosition()},
        );
    }
}

class ArtifactTooltipWindow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.hideTimeout;
        this.state = {
            isVisible: false,
        };
    }

    show(artifact, feature, artSettings) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.setState({
            artifact: artifact,
            feature: feature,
            isVisible: true,
            artSettings: artSettings,
        });
    }

    hide() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout)
        }

        this.hideTimeout = setTimeout(() => {this.handleClose()}, 20);
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return ReactDOM.createPortal(
            this.dialogNode(),
            document.body,
        );
    }

    updatePosition() {
        if (this.root && this.root.clientWidth) {
            this.setState({
                top: 30 + 'px',
                left: (UI.Layout.windowWidth() / 2 - this.root.clientWidth - 10) + 'px',
            });
        }
    }

    dialogNode() {
        let art = this.state.artifact;
        if (!art || !this.state.isVisible) {return ""}

        let mainStat = art.getMainStat();
        let setData = DB.Artifacts.Sets.get(art.getSet());
        let conditions = setData.getConditionsByPieces();

        let subStats = [];
        for (let item of art.getSubStats()) {
            subStats.push(
                <li key={"stat" + subStats.length}>
                    {lang.getStat('stat.'+ item.stat)}&nbsp;{Stats.format(item.stat, item.value, {signed: 1})}
                </li>
            );
        }

        let condItems = [];
        for (const i in conditions) {
            let items = conditions[i];
            for (const item of items) {
                let stats = item.getStats({});
                let descr = item.getDescription(stats);

                if (descr) {
                    condItems.push(
                        <li key={"cond"+ condItems.length}>{lang.get('artifact_set.pieces_'+ i)}:&nbsp;{parse(descr)}</li>
                    );
                }
            }
        }

        let featureBlock = "";
        if (this.state.feature) {
            let build = this.props.app.currentSet().clone();
            let feat1 = build.calcFeatures(1)[this.state.feature];

            build.setArtifact(art);
            build.setArtifactsSettings(this.state.artSettings);
            build.artifacts.removeInvalidSettings();

            let feat2 = build.calcFeatures(1)[this.state.feature];
            let values = [];

            for (let key of ['normal', 'crit', 'average']) {
                let val1 = feat1[key];
                let val2 = feat2[key];
                let diff = Math.round(val2 / val1 * 1000) / 10 - 100;
                diff = Stats.format('text_percent', diff, {decimal_digits: 1, no_decimal_zero: 1});

                values.push(
                    <td key={key}>
                        {formatNumber(val2)}<br />
                        {val2 ? formatNumber(val2 - val1, {signed: 1}) : ''}<br />
                        {val1 ? diff : ''}
                    </td>
                );
            }

            featureBlock = (
                <table className="gi-tooltip-artifact-feature">
                    <tbody>
                        <tr><th colSpan="4">{lang.get('feature_'+ this.state.feature)}</th></tr>
                        <tr></tr>
                        <tr>
                            <td>{lang.get('stat_view.normal')}</td>
                            <td>{lang.get('stat_view.crit')}</td>
                            <td>{lang.get('stat_view.average')}</td>
                        </tr>
                        <tr>{values}</tr>
                    </tbody>
                </table>
            );
        }

        return (
            <div ref={(obj) => this.root = obj} className="gi-tooltip gi-tooltip-artifact" style={{left: this.state.left, top: this.state.top}}>
                <div className={"gi-tooltip-artifact-caption rarity-"+ art.getRarity()}>
                    <div className="gi-tooltip-artifact-caption-background-left"/>
                    <div className="gi-tooltip-artifact-caption-background-middle"/>
                    <div className="gi-tooltip-artifact-caption-background-right"/>
                    {art.title ? art.title : lang.get( setData.getName() )}
                </div>
                <div className="gi-tooltip-artifact-stats">
                    <div className="gi-tooltip-artifact-mainstat-name">{lang.getStat('stat.'+ mainStat)}</div>
                    <div className="gi-tooltip-artifact-mainstat-value">{Stats.format(mainStat, art.getMainStatValue())}</div>
                </div>
                <div className="gi-tooltip-artifact-substats">
                    <ul>{subStats}</ul>
                </div>
                <div className="gi-tooltip-artifact-set-name">{lang.get( setData.getName() )}:</div>
                <ul className="gi-tooltip-artifact-pieces">{condItems}</ul>
                {featureBlock}
            </div>
        );
    }
}

function formatNumber(value, opts) {
    opts ||= {};

    let result = Math.round(value);
    if (result == 0) {
        return '-';
    }

    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (opts.signed && value >= 0) {
        result = '+'+ result;
    }

    return result;
}
