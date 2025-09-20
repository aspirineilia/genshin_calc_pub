import React from "react";

import "../../../css/Components/Modal/Good.css"

import { Artifact } from "../../classes/Artifact";
import { ControlsBar, ControlsBarDivider } from "../Components/ControlsBar";
import { DialogContainer } from "../Components/Dialog/Container";
import { Checkbox, FileInput, TextInput } from "../Components/Inputs/Input";
import { ImporterGood } from "../../classes/Importer/Good";
import { Lang } from "../Lang";
import { Modal } from "../Modal";
import { Serializer } from "../../classes/Serializer";
import { RoundButton, TitledButton } from "../Components/Inputs/Buttons";
import { Dropdown } from "../Components/Inputs/Dropdown";

let lang = new Lang();

export class GoodImportModal extends Modal {
    createContent() {
        return (
            <GoodImportComponent
                ref={(obj) => this.modal = obj}
                app={this.app}
                storage={this.app.storage.artifacts}
            />
        );
    }
}

export class GoodImportComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            canImport: false,
            actionAdd: true,
            actionUpdate: true,
            actionMissing: false,
            groupNames: [""],
            manualGroupName: "",
        };

        this.resetItems();
    }

    show() {
        this.resetItems();

        this.setState({
            isVisible: true,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleSelectFile(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            this.processText(reader.result);
            e.target.value = null;
        };
        reader.readAsText(file)
    }

    handleChangeText(value) {
        this.setState({goodText: value});
        this.processText(value);
    }

    handleAdd(value) {
        this.setState({actionAdd: value});
    }

    handleActionUpdate(value) {
        this.setState({actionUpdate: value});
    }

    handleActionMissing(value) {
        this.setState({actionMissing: value});
    }

    handleGroupName(items) {
        let result = items.map((i) => {return i.value});
        if (result.length == 0) {
            result = [""]
        }

        this.setState({groupNames: result});
    }

    handleCreateGroup() {
        UI.PromptWindow.show('rotation_view.enter_value', "", (text) => {
            text = Artifact.trimGroupName(text);
            if (text) {
                let names = this.state.groupNames;
                names.push(text);

                this.setState({
                    groupName: names,
                    manualGroupName: text,
                });
            }
        });
    }

    handleConfirm() {
        if (!this.state.canImport) { return }

        if (this.state.actionAdd) {
            for (let item of this.items.added) {
                item.setGroups(this.state.groupNames);
            }
            this.props.storage.addArtifacts(this.items.added);
        }

        if (this.state.actionMissing) {
            for (let artifact of this.items.missing) {
                this.props.storage.deleteByHash(artifact.getHash());
            }
        }

        this.props.app.refresh();
        this.handleClose();
    }

    processText(text) {
        let importer = new ImporterGood();
        let result = importer.process(text);

        if (result.code) {
            this.resetItems();
            this.setState({
                count: "-",
                canImport: false,
                statusText: lang.get('good_import.status_error_' + result.code),
            });
        } else {
            this.refreshItemsList(result);
        }
    }

    resetItems() {
        this.state.goodText = "";
        this.state.statusText = "";
        this.state.count = "-";
        this.state.canImport = false;

        this.items = {
            added: [],
            updated: [],
            matched: [],
            missing: [],
        };
    }

    refreshItemsList(result) {
        let existedHashes = this.props.storage.storageHashes();

        for (let artifact of result.items) {
            let hash = artifact.getHash();

            if (existedHashes[hash]) {
                this.items.matched.push(artifact);
                delete existedHashes[hash];
            } else {
                this.items.added.push(artifact);
            }
        }

        for (let hash of Object.keys(existedHashes)) {
            let artifact = Artifact.deserialize(Serializer.unpack(hash));
            this.items.missing.push(artifact)
        }

        this.setState({
            count: result.items.length,
            canImport: true,
            statusText: lang.get('good_import.status_error_0'),
        });
    }

    getArtifactGroups() {
        let groups = this.props.storage.listGroups();
        let result = [];

        for (let item of groups) {
            result.push({
                value: item.value,
                text: item.title,
            });
        }

        if (this.state.manualGroupName) {
            result.push({
                value: this.state.manualGroupName,
                text: this.state.manualGroupName,
            });
        }

        return result;
    }

    render() {
        let groupNames = this.getArtifactGroups();

        return (
            <DialogContainer
                addClass="gi-window-good"
                width={510}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.good_import')}
                closeCallback={() => this.handleClose()}
            >
                <div className="gi-good-inputs">
                    <FileInput
                        onChange={(e) => this.handleSelectFile(e)}
                    />
                    <div className="resizable">
                        <TextInput
                            value={this.state.goodText}
                            onChange={(value) => {this.handleChangeText(value)}}
                            placeholder={lang.get('good_import.paste_text')}
                        />
                    </div>
                </div>
                <div className="gi-good-result">
                    <div className="gi-good-result-line">
                        <div className="title">{lang.get('good_import.import_status')}</div>
                        <div className="full">{this.state.statusText}</div>
                    </div>

                    <div className="gi-good-result-line">
                        <div className="title">{lang.get('good_import.import_count')}</div>
                        <div className="value">{this.state.count}</div>
                    </div>

                    <div className="gi-good-result-line">
                        <div className="title">{lang.get('good_import.import_added')}</div>
                        <div className="value">{this.items.added.length}</div>
                        <div className="full">
                            <Checkbox
                                title={lang.get('good_import.action_added')}
                                checked={this.state.actionAdd}
                                onChange={(checked) => this.handleAdd(checked)}
                            />
                        </div>
                    </div>
                    <div className="">
                        <ControlsBar>
                            <Dropdown
                                barClass="resizable"
                                isMultiple={true}
                                items={groupNames}
                                selected={this.state.groupNames}
                                onChange={(items) => this.handleGroupName(items)}
                            />
                            <RoundButton
                                icon="small-number dots"
                                text="+"
                                onClick={() => this.handleCreateGroup()}
                            />
                        </ControlsBar>
                    </div>
                    {/* <div className="gi-good-result-line">
                        <div className="title">{lang.get('good_import.import_updated')}</div>
                        <div className="value">{this.items.updated.length}</div>
                        <div className="full">
                            <Checkbox
                                title={lang.get('good_import.action_updated')}
                                checked={this.state.actionUpdate}
                                onChange={(checked) => this.handleActionUpdate(checked)}
                            />
                        </div>
                    </div> */}
                    <div className="gi-good-result-line">
                        <div className="title">{lang.get('good_import.import_missing')}</div>
                        <div className="value">{this.items.missing.length}</div>
                        <div className="full">
                            <Checkbox
                                title={lang.get('good_import.action_missing')}
                                checked={this.state.actionMissing}
                                onChange={(checked) => this.handleActionMissing(checked)}
                            />
                        </div>
                    </div>
                </div>
                <div className="gi-hr" />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="button-icon-ok"
                        title={lang.get('modal_buttons.confirm')}
                        disabled={!this.state.canImport}
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
