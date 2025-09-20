import React from "react";
// import "../../../../css/Components/Dialog/ArtifactGenerator.css"

import { DialogContainer } from "../Components/Dialog/Container";
import { EnkaApp } from "../Components/Enka";
import { Lang } from "../Lang";
import { Modal } from "../Modal";

let lang = new Lang();

export class EnkaImportModal extends Modal {
    createContent() {
        return (
            <EnkaImportComponent
                ref={(obj) => this.modal = obj}
                app={this.app}
                storage={this.app.storage.char}
                artifactStorage={this.app.storage.artifacts}
                addClass="lockartifacts-select-modal"
                title={lang.get('modal_window.lock_artifact')}
            />
        );
    }
}

export class EnkaImportComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    show(uid) {
        if (uid) {
            this.component.handleLoadUid(uid);
        }
        this.setState({
            isVisible: true,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    applyCalcSet(set) {
        UI.ConfirmWindow.show('modal.confirm', 'enka_import.confirm_load_char', () => {
            this.props.app.replaceSet(set.clone());
        });
    }

    saveCalcSet(set) {
        UI.ConfirmWindow.show('modal.confirm', 'enka_import.confirm_save_char', () => {
            this.props.app.storage.char.add(set.clone(), {});
            this.props.app.refresh();
            this.props.app.queueUpdate();
        });
    }

    saveAllCharacters(chars) {
        UI.ConfirmWindow.show('modal.confirm', 'enka_import.confirm_save_all_chars', () => {
            this.props.app.addCharactersToStorage(chars);
        });
    }

    saveAllArtifacts(arts) {
        UI.ConfirmWindow.show('modal.confirm', 'enka_import.confirm_save_all_arts', () => {
            this.props.app.addArtifactsToStorage(arts);
        });
    }

    render() {
        return (
            <DialogContainer
                addClass="enka-import-modal"
                width={600}
                isVisible={this.state.isVisible}
                maxHeight={true}
                title={lang.get('enka_import.window_title')}
                closeCallback={() => this.handleClose()}
            >
                <EnkaApp
                    ref={obj => { this.component = obj }}
                    addToCompare={(set) => this.addToCompare(set)}
                    applyCalcSet={(set) => this.applyCalcSet(set)}
                    saveCalcSet={(set) => this.saveCalcSet(set)}
                    saveAllCharacters={(chars) => this.saveAllCharacters(chars)}
                    saveAllArtifacts={(arts) => this.saveAllArtifacts(arts)}
                />
            </DialogContainer>
        );
    }
}
