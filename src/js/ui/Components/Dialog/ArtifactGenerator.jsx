import React from "react";
import "../../../../css/Components/Dialog/ArtifactGenerator.css"

import { ControlsBar, ControlsBarDivider } from "../ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { Lang } from "../../Lang";
import { TitledButton } from "../Inputs/Buttons";
import { ArtifactGeneratorSettings, cloneSettings, getDefaultSettings } from "../ArtifactGenerator";

let lang = new Lang();

export class ArtifactGeneratorModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: getDefaultSettings(),
            isVisible: false,
        };
    }

    show(data, saveCallback) {
        this.saveCallback = saveCallback;

        this.setState({
            isVisible: true,
        });
    }

    handleSave() {
        if (this.saveCallback) {
            this.saveCallback(cloneSettings(this.state.settings));
        }

        this.setState({
            isVisible: false,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleSettingsChange(data) {
        this.setState({settings: data});
    }

    render() {
        return (
            <DialogContainer
                addClass="artifact-generator-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('art_gen.title')}
                closeCallback={() => this.handleClose()}
            >
                <ArtifactGeneratorSettings
                    settings={this.state.settings}
                    onChange={(data) => this.handleSettingsChange(data)}
                />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-ok"
                        title={lang.get('art_gen.apply')}
                        onClick={() => this.handleSave()}
                    />
                    <TitledButton
                        icon="icon-cancel"
                        title={lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        );
    }
}
