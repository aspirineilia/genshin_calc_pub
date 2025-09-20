import React from "react";
import ReactDOM from 'react-dom/client'

import "../../../css/ui/Sync.css"

import { waitForCondition } from "../../Utils";
import { Lang } from "../Lang";

let lang = new Lang();

export class Sync extends React.Component {
    init() {
        if (this.initialized) {
            return;
        }

        let root = document.querySelector('.gi-sync-status');
        let container = ReactDOM.createRoot(root);
        this.component = this.createContent();
        container.render(this.component);

        this.initialized = true;
    }

    createContent() {
        return (
            <SyncComponent
                ref={(obj) => this.block = obj}
            />
        );
    }

    setStatus(status) {
        waitForCondition(
            () => {return this.block},
            () => {this.block.setState({status: status})},
        );
    }

    enable() {
        waitForCondition(
            () => {return this.block},
            () => {this.block.setState({isVisible: true})},
        );
    }

    disable() {
        waitForCondition(
            () => {return this.block},
            () => {this.block.setState({isVisible: false})},
        );
    }
}

class SyncComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: '',
            isVisible: false,
        };
    }

    render() {
        if (!this.state.isVisible) { return "" }

        return (
            <>
                <i className="sync-icon-auth"></i>
                <span className="gi-sync-status-name">{lang.get('sync_status.'+ this.state.status)}</span>
            </>
        );
    }
}
