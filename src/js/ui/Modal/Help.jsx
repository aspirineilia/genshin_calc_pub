import React from "react";
import "../../../css/modal/Help.css"

import { Lang } from "../Lang";
import { Modal, } from "../Modal";
import { DialogContainer } from "../Components/Dialog/Container";
import { FullHeight, FullHeightScrollable } from "../Components/FullHeight";


let lang = new Lang();

export class HelpModal extends Modal {
    createContent() {
        return (
            <HelpComponent
                ref={(obj) => this.modal = obj}
                app={this.app}
            />
        )
    }
}

export class HelpComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(title, name) {
        let url = '/help/'+ lang.getLang() +'/'+ name +'.html?v='+ this.props.app.getVersion();

        this.setState({
            title: title,
            url: url,
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
                addClass="gi-window-help"
                width={650}
                isVisible={this.state.isVisible}
                title={lang.get(this.state.title)}
                closeCallback={() => this.handleClose()}
                maxHeight={true}
            >
                <FullHeight>
                    <FullHeightScrollable>
                        <iframe
                            className="help-iframe"
                            src={this.state.url}
                            width="100%"
                            onLoad={(event) => {
                                event.target.style.height = (event.target.contentWindow.document.body.scrollHeight + 50) + 'px';
                            }}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </DialogContainer>
        );
    }
}
