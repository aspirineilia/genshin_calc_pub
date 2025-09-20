import React from "react";
import parse from 'html-react-parser';
import "../../../css/Components/Dialog/Confirm.css"

import { Lang } from "../Lang";
import { NonAppModal } from "../Modal";
import { DialogContainer } from "../Components/Dialog/Container";
import { ControlsBar, ControlsBarDivider } from "../Components/ControlsBar";
import { TitledButton } from "../Components/Inputs/Buttons";


let lang = new Lang();

export class ConfirmModal extends NonAppModal {
    createContent() {
        return (
            <ConfirmComponent
                ref={(obj) => this.modal = obj}
            />
        )
    }
}

export class ConfirmComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(title, message, callback) {
        this.callback = callback;

        this.setState({
            title: title,
            message: message,
            isVisible: true,
        });
    }

    handleConfirm() {
        if (this.callback) {
            this.callback();
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
                <div>{parse(lang.get(this.state.message))}</div>
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
