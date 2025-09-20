import React from "react";

import "../../../../css/Components/Modal/Select/LockArtifacts.css"

import { CharInfo } from "../../Components/Character/Info";
import { ControlsBar } from "../../Components/ControlsBar";
import { TitledButton } from "../../Components/Inputs/Buttons";
import { Dropdown } from "../../Components/Inputs/Dropdown";
import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase, SearchInput } from "../Select";

let lang = new Lang();

const LOCK_MODES = [
    {value: 'current',  text: lang.get('pool_view.lockmode_current') },
    {value: 'all',      text: lang.get('pool_view.lockmode_all') },
    {value: 'all_save', text: lang.get('pool_view.lockmode_all_save') },
    {value: 'filtered', text: lang.get('pool_view.lockmode_filtered') },
];

export class ModalLockArtifacts extends Modal {
    createContent() {
        return (
            <LockArtifactComponent
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

class LockArtifactComponent extends ModalSelectBase {
    constructor(props) {
        super(props);

        this.state.lockMode = 'current';
        this.items = [];
        this.needReloadItems = false;
    }

    show(data) {
        this.needReloadItems = true;
        super.show(data);
    }

    loadItems() {
        if (!this.needReloadItems) {
            return;
        }

        this.needReloadItems = false;
        this.items = [];

        let allArtHash = [];
        for (let item of this.props.artifactStorage.listDecoded(1)) {
            allArtHash.push(item.hash);
        }

        let index = 0;
        let showBeta = this.props.app.showBetaContent();

        for (let item of this.props.storage.listDecoded(showBeta)) {
            let build = item.data;
            let char = build.char.object;
            let title = item.title || lang.get(char.getName());

            let storageArts = [];
            for (let hash of build.getArtifactsHashList()) {
                if (allArtHash.includes(hash)) {
                    storageArts.push(hash);
                }
            }

            this.items.push({
                id: 'save'+ (index++),
                build: item.data,
                title: item.title,
                sortTitle: title.toUpperCase(),
                storageArts: storageArts,
            });
        }

        this.refreshArtLocked();

        this.needSorting = true;
    }

    refreshArtLocked() {
        let lockedHash = this.props.artifactStorage.getLocked();

        for (let item of this.items) {
            let artifacts = item.build.getArtifacts();
            for (let slot of Object.keys(artifacts)) {
                let art = artifacts[slot];
                if (art) {
                    art.setLocked(lockedHash.includes(art.getHash()));
                }
            }
        }
    }

    prepareItems() {
        this.loadItems();
        super.prepareItems();
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;

        this.items = this.items.sort((a, b) => {
            return a.sortTitle.localeCompare(b.sortTitle);
        });
    }

    filterItems() {
        if (!this.needFiltering) {
            return;
        }

        this.needFiltering = false;
        let filterString = this.state.filterString.toUpperCase();

        for (let item of this.items) {
            item.filtered = filterString && !item.sortTitle.includes(filterString);
        }
    }

    handleLockBuild(build) {
        this.setLockedArtifacts(build.getArtifactsHashList(), true);
    }

    handleUnlockBuild(build) {
        this.setLockedArtifacts(build.getArtifactsHashList(), false);
    }

    handleLockArtifact(art, locked) {
        this.setLockedArtifacts([art.getHash()], locked);
    }

    handleLockMode(mode) {
        this.setState({lockMode: mode});
    }

    handleLockArtifacts(locked) {
        if (this.state.lockMode == 'all') {
            if (locked) {
                this.props.artifactStorage.lockAll();
            } else {
                this.props.artifactStorage.unlockAll();
            }
            this.refreshArtLocked();
            this.refresh();
            return;
        }

        let artifactsHashes = [];

        if (this.state.lockMode == 'all_save'|| this.state.lockMode == 'filtered') {
            for (let item of this.items) {
                if (this.state.lockMode == 'filtered' && item.filtered) {
                    continue;
                }

                artifactsHashes = artifactsHashes.concat( item.build.getArtifactsHashList() );
            }
        } else {
            let build = this.props.app.currentSet();
            artifactsHashes = build.getArtifactsHashList();
        }

        this.setLockedArtifacts(artifactsHashes, locked);
    }

    setLockedArtifacts(artifacts, locked) {
        this.props.artifactStorage.setLocked(artifacts, locked);
        this.refreshArtLocked();
        this.refresh();
    }

    getControls() {
        return (
            <>
                <ControlsBar>
                    <Dropdown
                        addClass="lock-mode"
                        items={LOCK_MODES}
                        selected={this.state.lockMode}
                        onChange={(item) => this.handleLockMode(item.value)}
                    />
                    <TitledButton
                        icon="button-icon-unlock"
                        title={lang.get('pool_view.unlock_artifacts')}
                        onClick={() => this.handleLockArtifacts(false)}
                    />
                    <TitledButton
                        icon="button-icon-lock"
                        title={lang.get('pool_view.lock_artifacts')}
                        onClick={() => this.handleLockArtifacts(true)}
                    />
                </ControlsBar>
                <div className="text-info">{lang.get('pool_view.lock_info')}</div>
                <ControlsBar>
                    <SearchInput
                        barClass="resizable"
                        value={this.state.filterString}
                        onChange={(value) => this.handleFilterString(value)}
                    />
                </ControlsBar>
            </>
        );
    }

    getContent() {
        return (
            <div className="object-select lockartifacts-select">
                <LockCharList
                    items={this.items}
                    onLockBuild={(build) => this.handleLockBuild(build)}
                    onUnlockBuild={(build) => this.handleUnlockBuild(build)}
                    onLockArtifact={(art, locked) => this.handleLockArtifact(art, locked)}
                    artifactStorage={this.props.artifactStorage}
                />
            </div>
        );
    }
}

function LockCharList(props) {
    let items = [];

    let buttons = [
        {
            icon: 'icon-unlock',
            tooltip: lang.get('tooltip.pool_unlock_char'),
            callback: (build) => props.onUnlockBuild(build),
        },
        {
            icon: 'icon-lock',
            tooltip: lang.get('tooltip.pool_lock_char'),
            callback: (build) => props.onLockBuild(build),
        },
    ];

    for (let data of props.items) {
        let classes = ['list-item'];

        if (data.hidden || data.filtered) {
            classes.push('hidden');
        }

        items.push(
            <div className={classes.join(' ')} key={data.id}>
                <CharInfo
                    title={data.title}
                    set={data.build}
                    buttons={data.storageArts.length > 0 ? buttons : []}
                    artifactDetails={true}
                    showLocked={true}
                    onLockArtifact={props.onLockArtifact}
                    showLockCallback={(art) => data.storageArts.includes(art.getHash())}
                />
            </div>
        );
    }

    return (
        <div className="list">
            {items}
        </div>
    );
}
