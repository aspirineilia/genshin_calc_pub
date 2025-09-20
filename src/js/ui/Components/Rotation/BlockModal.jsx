import React from "react";
import "../../../../css/Components/Tab/Rotation/BlockModal.css"

import { DialogContainer } from "../../Components/Dialog/Container";
import { Lang } from "../../Lang";

let lang = new Lang();

export class RotationBlockModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(data, saveCallback) {
        this.saveCallback = saveCallback;

        this.setState({
            isVisible: true,
        });
    }

    handleSave(type) {
        if (this.saveCallback) {
            this.saveCallback(type);
        }

        this.setState({isVisible: false});
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        return (
            <DialogContainer
                addClass="rotation-block-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.rotation_blocks')}
                closeCallback={() => this.handleClose()}
            >
                <div className="item" onClick={() => this.handleSave('repeat')}>
                    <div className="title">{lang.get('rotation_view.add_repeat')}</div>
                    <div className="description">{lang.get('rotation_view.block_repeat_descr')}</div>
                </div>
                <div className="item" onClick={() => this.handleSave('uptime')}>
                    <div className="title">{lang.get('rotation_view.add_buff_uptime')}</div>
                    <div className="description">{lang.get('rotation_view.block_uptime_descr')}</div>
                </div>
            </DialogContainer>
        )
    }
}
