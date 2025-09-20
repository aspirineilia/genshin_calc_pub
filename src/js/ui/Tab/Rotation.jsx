import React from 'react';

import "../../../css/Components/Tab/Rotation.css"

import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { RotationEditor } from '../Components/Rotation/Editor';

export class RotationTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'rotation';
        this.rightRab = true;
        this.title = 'tab_header.rotation';
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
        });
    }

    createContent() {
        return (
            <RotationView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class RotationView extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.strings = {
            title: this.lang.get(this.props.title),
        };
    }

    handleRotationChange(rotation) {
        this.props.app.setRotation(rotation);
        this.props.app.refresh({objects: ['build']});
    }

    render() {
        return (
            <ReactTab title={this.strings.title}>
                <RotationEditor
                    app={this.props.app}
                    build={this.props.app.currentSet()}
                    storage={this.props.app.storage.rotation}
                    onRotationChange={(rotation) => this.handleRotationChange(rotation)}
                />
            </ReactTab>
        );
    }
}
