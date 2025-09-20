import React from "react";
import "../../../css/Components/Dialog/Confirm.css"

import { Lang } from "../Lang";
import { NonAppModal } from "../Modal";
import { DialogContainer } from "../Components/Dialog/Container";
import { ControlsBar, ControlsBarDivider } from "../Components/ControlsBar";
import { TitledButton } from "../Components/Inputs/Buttons";
import { TextInput } from "../Components/Inputs/Input";


let lang = new Lang();

export class PromptModal extends NonAppModal {
    createContent() {
        return (
            <PromptComponent
                ref={(obj) => this.modal = obj}
            />
        )
    }
}

export class PromptComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            value: '',
            title: '',
        };
    }

    show(title, value, callback) {
        this.callback = callback;

        this.setState({
            title: title,
            value: value || '',
            isVisible: true,
        });
    }

    handleConfirm() {
        if (this.callback) {
            this.callback(this.state.value);
        }
        this.handleClose();
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <DialogContainer
                addClass="gi-window-confirm"
                width={510}
                isVisible={this.state.isVisible}
                title={lang.get(this.state.title)}
                closeCallback={() => this.handleClose()}
            >
                <ControlsBar>
                    <TextInput
                        barClass="resizable"
                        value={this.state.value}
                        onChange={(value) => {this.setState({value: value})}}
                        onEnter={() => this.handleConfirm()}
                    />
                </ControlsBar>
                <div className="gi-hr" />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="button-icon-ok"
                        title={lang.get('modal_buttons.confirm')}
                        onClick={() => this.handleConfirm()}
                    />
                    <TitledButton
                        icon="button-icon-cancel"
                        title={lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        );
    }
}
