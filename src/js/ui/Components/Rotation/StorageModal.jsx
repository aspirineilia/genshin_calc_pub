import React from "react";
import _uniqueId from 'lodash/uniqueId';

import "../../../../css/Components/Rotation/StorageModal.css"

import { DialogContainer } from "../Dialog/Container";
import { Lang } from "../../Lang";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../FullHeight";
import { TextInput, TextInputWithButton, TextInputWithCopy } from "../Inputs/Input";
import { ControlsBar } from "../ControlsBar";
import { Rotation } from "../../../classes/Rotation";
import { CharIcon } from "../Icons";
import { ResultTableButton } from "../Inputs/Buttons";
import { Serializer } from "../../../classes/Serializer";
import { makeShareUrl } from "../../../Utils";

let lang = new Lang();

export class RotationStorageModal extends React.Component {
    constructor(props) {
        super(props);

        this.items = [];

        this.state = {
            isVisible: false,
            saveString: '',
            filterString: '',
            rotation: null,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isVisible || nextState.isVisible;
    }

    show(data) {
        this.refreshItemsList();
        this.setState({
            isVisible: true,
            rotation: data.rotation,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    refreshItemsList() {
        let items = [];

        for (let item of this.props.storage.listDecoded()) {
            items.push(item);
        }

        this.items = items;
    }

    handleSaveNameChange(value) {
        this.setState({saveString: value});
    }

    handleFilterChange(value) {
        this.setState({filterString: value});
    }

    handleEditName(hash, oldText) {
        UI.PromptWindow.show('modal.edit_char_name', oldText || '', (text) => {
            text = text.trim();
            if (text) {
                this.props.onEditName(hash, text);
            }
        });
    }

    handleEditIcon(hash) {
        UI.CharSelectReact.show({
            callback: (char) => {
                let charId = 0;
                if (char) {
                    charId = char.getId();
                }
                this.props.onEditIcon(hash, charId)
            },
        });
    }

    render() {
        let shareUrl = this.state.rotation ? makeShareUrl('r'+ Serializer.pack(this.state.rotation)) : '';

        return (
            <DialogContainer
                addClass="rotation-storage-modal"
                width={700}
                maxHeight={true}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.rotation_storage')}
                closeCallback={() => this.handleClose()}
            >
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <TextInputWithCopy
                                barClass="resizable"
                                value={shareUrl}
                            />
                        </ControlsBar>
                        <ControlsBar>
                            <TextInputWithButton
                                barClass="resizable"
                                value={this.state.saveString}
                                placeholder={lang.get('rotation_view.add_placeholder')}
                                text={lang.get('rotation_view.save_rotation')}
                                onChange={(value) => this.handleSaveNameChange(value)}
                                onClick={() => this.props.onSave(this.state.saveString)}
                            />
                        </ControlsBar>
                        {/* <hr barClass="resizable" /> */}
                        <ControlsBar>
                            <TextInput
                                barClass="resizable"
                                addClass="left"
                                value={this.state.filterString}
                                placeholder={lang.get('share_view.search')}
                                onChange={(value) => this.handleFilterChange(value)}
                            />
                        </ControlsBar>
                    </FullHeightStatic>
                    <FullHeightScrollable>
                        <RotationList
                            items={this.items}
                            filterString={this.state.filterString}
                            onDelete={this.props.onDelete}
                            onOverride={this.props.onOverride}
                            onLoad={this.props.onLoad}
                            onEditName={(hash, oldText) => this.handleEditName(hash, oldText)}
                            onEditIcon={(hash) => this.handleEditIcon(hash)}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </DialogContainer>
        )
    }
}

export class RotationList extends React.PureComponent {
    render() {
        let items = [];
        let renderItems = [];

        let filter = this.props.filterString.toUpperCase();

        for (let item of this.props.items) {
            let [char, icons] = getIconsFromRotation(item.data, item.icon);
            if (item.icon) {
                char = DB.Chars.getById(item.icon);
            }

            let charTitle = '';
            if (char) {
                charTitle = lang.get(char.getName())
            }

            let title = item.title || charTitle;
            let titleFilter = title.toUpperCase();
            let isVisible = !filter || titleFilter.includes(filter);

            items.push({
                isVisible: isVisible,
                hash: item.hash,
                title: title,
                rotation: item.data,
                char: char,
                icons: icons,
            });
        }

        items = items.sort(function(a, b) {
            return a.title.toUpperCase().localeCompare(b.title.toUpperCase());
        });

        for (let item of items) {
            renderItems.push(
                <div key={_uniqueId()} className={item.isVisible ? '' : 'hidden'}>
                    <RotationListItem
                        title={item.title}
                        item={item.rotation}
                        char={item.char}
                        icons={item.icons}
                        onDelete={this.props.onDelete ? () => this.props.onDelete(item.hash) : null}
                        onOverride={this.props.onOverride ? () => this.props.onOverride(item.hash) : null}
                        onLoad={this.props.onLoad ? () => this.props.onLoad(item.hash) : null}
                        onEditName={this.props.onEditName ? () => this.props.onEditName(item.hash, item.title) : null}
                        onEditIcon={this.props.onEditIcon ? (value) => this.props.onEditIcon(item.hash, value) : null}
                    />
                </div>
            );
        }

        return (
            <div className="rotation-list">
                {renderItems}
            </div>
        );
    }
}

function RotationListItem(props) {
    let icons = [];
    for (let icon of props.icons) {
        icons.push(
            <div key={icon} className={'sub-icon border-rarity-1 sprite sprite-40 ' + icon} />
        );
    }

    return (
        <div className="item">
            <div className="icon">
                <CharIcon size={80} char={props.char} />
                <div className="edit"  onClick={props.onEditIcon} />
            </div>
            <div className="info">
                <div className="line">
                    <div className="edit" onClick={props.onEditName}/>
                    <div className="title">{props.title}</div>
                </div>
                <div className="icons">{icons}</div>
            </div>
            {props.onDelete ? <div className="control">
                <ResultTableButton
                    icon="icon-delete"
                    onClick={props.onDelete}
                />
            </div> : ''}
            {props.onOverride ? <div className="control">
                <ResultTableButton
                    icon="icon-save"
                    onClick={props.onOverride}
                />
            </div> : ''}
            {props.onLoad ? <div className="control">
                <ResultTableButton
                    icon="icon-load"
                    onClick={props.onLoad}
                />
            </div> : ''}
        </div>
    );
}

function getIconsFromRotation(item, hasChar) {
    let char;
    let usedIcons = {};

    for (const part of item.getItems()) {
        if (part.type == 'condition') {
            let data = Rotation.getConditionData(part);

            if (data.typeId == 1 && !hasChar) {
                char = data.dbObject;
            } else {
                usedIcons[data.icon] = 1;
            }
        }
    }

    let icons = Object.keys(usedIcons);

    return [char, icons];
}
