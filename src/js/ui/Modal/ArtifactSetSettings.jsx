import React from "react";

import "../../../css/modal/ArtifactSetSettings.css"

import { DialogContainer } from "../Components/Dialog/Container";
import { Lang } from "../Lang";
import { Modal } from "../Modal";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../Components/FullHeight";
import { ControlsBar, ControlsBarDivider } from "../Components/ControlsBar";
import { TitledButton } from "../Components/Inputs/Buttons";
import { ConditionList } from "../Components/ConditionList";

let lang = new Lang();

export class ArtifactSetSettingsModal extends Modal {
    createContent() {
        return (
            <ArtifactSetSettingsComponent
                ref={(obj) => this.modal = obj}
                app={this.app}
                storage={this.app.storage.char}
                artifactStorage={this.app.storage.artifacts}
            />
        );
    }
}

class ArtifactSetSettingsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(conditions, settings, callback) {
        this.conditions = conditions;
        this.callback = callback;

        this.setState({
            isVisible: true,
            settings: Object.assign({}, settings),
        });
    }

    handleSettingChange(name, value) {
        let settings = this.state.settings;
        settings[name] = value;
        this.setState({settings: settings});
    }

    handleSave() {
        if (this.callback) {
            this.callback(this.state.settings);
        }
        this.handleClose();
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <DialogContainer
                addClass="artifact-settings-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={ lang.get('artifacts_ui.settings') }
                closeCallback={() => this.handleClose()}
            >
                <ConditionList
                    items={this.conditions || []}
                    settings={this.state.settings || {}}
                    onChange={(name, value) => this.handleSettingChange(name, value)}
                    ignoreSubconditions={true}
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

