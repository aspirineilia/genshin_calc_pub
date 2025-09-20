import React from "react";
import "../../../../css/Components/Tab/Rotation/FeatureModal.css"

import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { Dropdown } from "../../Components/Inputs/Dropdown";
import { Lang } from "../../Lang";
import { NumberInput, RadioList } from "../../Components/Inputs/Input";
import { TitledButton } from "../../Components/Inputs/Buttons";
import { Feature2 } from "../../../classes/Feature2";

let lang = new Lang();

const reactionRadios = [
    {value: 0, title: lang.get('feature_reaction.none')},
    {value: 1, title: lang.get('feature_reaction.melt')},
    {value: 2, title: lang.get('feature_reaction.vaporize')},
    {value: 3, title: lang.get('feature_reaction.quicken')},
];

export class RotationFeatureModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.featureItems = [];

        this.state = {
            isVisible: false,
            feature: '',
            reaction: 0,
            count: 1,
        };
    }

    show(data, saveCallback) {
        this.featureItems = Feature2.buildDropdown(this.props.build, {checkCallback: (feat) => {
            if (!feat.usedInRotation()) return false;
            if (!DB.Features.Rotation.getByName(feat.getName())) return false;
            return true;
        }});

        this.saveCallback = saveCallback;

        let selectedFeature = data.feature || '';
        if (!selectedFeature) {
            for (let item of this.featureItems) {
                if (item.isCaption) continue;
                selectedFeature = item.value;
                break;
            }
        }

        this.setState({
            isVisible: true,
            data: data,
            feature: selectedFeature,
            reaction: data.reaction || 0,
            count: data.count || 1,
        });
    }

    handleSave() {
        if (this.saveCallback) {
            this.saveCallback({
                feature: this.state.feature,
                reaction: this.state.reaction,
                count: this.state.count,
            });
        }

        this.setState({isVisible: false});
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleFeature(value) {
        this.setState({feature: value});
    }

    handleHitsChange(value) {
        this.setState({count: value});
    }

    handleReactionChange(value) {
        this.setState({reaction: value});
    }

    render() {
        return (
            <DialogContainer
                addClass="rotation-feature-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.rotation_feature')}
                closeCallback={() => this.handleClose()}
            >
                <ControlsBar>
                    <Dropdown
                        barClass="resizable"
                        items={this.featureItems}
                        selected={this.state.feature}
                        onChange={(item) => this.handleFeature(item.value)}
                    />
                </ControlsBar>
                <div className="line">
                    <RadioList
                        items={reactionRadios}
                        selected={this.state.reaction}
                        onChange={(value) => this.handleReactionChange(value)}
                    />
                </div>
                <div className="line">
                    <div>{lang.get('rotation_view.feature_count')}</div>
                    <NumberInput
                        value={this.state.count}
                        nonEmpty={true}
                        minValue={1}
                        maxValue={10000}
                        size={5}
                        onChange={(value) => this.handleHitsChange(value)}
                    />
                </div>
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-ok"
                        title={lang.get('modal_buttons.confirm')}
                        onClick={() => this.handleSave()}
                    />
                    <TitledButton
                        icon="icon-cancel"
                        title={lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        )
    }
}
