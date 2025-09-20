import React from 'react';
import SimpleBar from 'simplebar-react';
import "../../../css/Components/Enka.css"

import { CharacterList } from './Character/List';
import { ControlsBar, ControlsBarDivider } from './ControlsBar';
import { EnkaApi } from '../../classes/API/Enka';
import { TextInput } from './Inputs/Input';
import { TitledButton } from './Inputs/Buttons';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from './FullHeight';
import { Dropdown } from './Inputs/Dropdown';

export class EnkaApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: props.contentHeight || 0,
            uid: '',
            uidIsValid: false,
            isLoading: false,
            isError: false,
            isEmpty: false,
            characters: [],
            artifacts: [],
            player: {},
        };

        this.api = new EnkaApi();
    }

    handleChangeUid(value) {
        value = value.replace(/[^a-z0-9_.]/ig, '');
        this.setState({uid: value});
    }

    handleLoadUid(uid) {
        let newState = {
            isLoading: true,
            isError: false,
        };
        if (uid) {
            newState.uid = uid;
        }

        this.setState(newState);
        this.api.load(uid || this.state.uid, this.state.selectedHash, (data) => this.dataLoaded(data));
    }

    handleChangeHash(hash) {
        this.state.selectedHash = hash;
        this.handleLoadUid();
    }

    dataLoaded(data) {
        if (!data) {
            this.setState({
                isLoading: false,
                isError: true,
                player: {},
            });
            return;
        }

        let hash = '';
        if (Array.isArray(data.player.hashes)) {
            for (let item of data.player.hashes) {
                if (this.state.selectedHash == item.hash) {
                    hash = item.hash;
                    break;
                }
            }

            if (!hash && data.player.hashes.length) {
                hash = data.player.hashes[0].hash;
            }
        }

        this.setState({
            isLoading: false,
            isEmpty: data.characters.length == 0,
            characters: data.characters,
            artifacts: data.artifacts,
            player: data.player,
            selectedHash: hash,
        });
    }

    render() {
        let uidIsValid = this.api.isValidUid(this.state.uid);

        let content = '';
        if (this.state.isLoading) {
            content = UI.Lang.get('enka_import.loading');
        } else if (this.state.isError) {
            content = UI.Lang.get('enka_import.error');
        } else if (this.state.isEmpty) {
            content = (
                <>
                    <p>{UI.Lang.get('enka_import.empty')}</p>
                    <img src={'/images/help/showcase_' + UI.Lang.getLang() +'.png'} />
                </>
            );
        } else if (Object.keys(this.state.player).length > 0) {
            content = (
                <CharacterList
                    items={this.state.characters}
                    statDetails={true}
                    artifactDetails={true}
                    buttons={[
                        {
                            icon: 'gi-share-overwrite',
                            tooltip: UI.Lang.get('enka_import.save_char'),
                            callback: (set) => this.props.saveCalcSet(set),
                        },
                        {
                            icon: 'gi-share-load',
                            tooltip: UI.Lang.get('enka_import.load_char'),
                            callback: (set) => this.props.applyCalcSet(set),
                        },
                    ]}
                />
            );
        }

        return (
            <FullHeight>
                <FullHeightStatic>
                    <ControlsBar>
                        <div>{UI.Lang.get('enka_import.enter_uid')}</div>
                        <TextInput
                            value={this.state.uid}
                            addClass="enka-uid resizable"
                            onChange={(value) => {this.handleChangeUid(value)}}
                            onEnter={() => this.handleLoadUid()}
                        />
                        <TitledButton
                            icon="button-icon-ok"
                            title={UI.Lang.get('enka_import.button')}
                            disabled={!uidIsValid || this.state.isLoading}
                            onClick={() => this.handleLoadUid()}
                        />
                        <ControlsBarDivider/>
                        <a href="https://enka.network/" target="_blank" className="enka-icon" />
                    </ControlsBar>
                    <ControlsBar>
                        <TitledButton
                            icon="button-icon-ok"
                            title={UI.Lang.get('enka_import.save_all_chars')}
                            disabled={this.state.characters == 0}
                            onClick={() => this.props.saveAllCharacters(this.state.characters)}
                        />
                        <TitledButton
                            icon="button-icon-ok"
                            title={UI.Lang.get('enka_import.save_all_arts')}
                            disabled={this.state.artifacts == 0}
                            onClick={() => this.props.saveAllArtifacts(this.state.artifacts)}
                        />
                    </ControlsBar>
                    <div className="gi-hr" />
                    {
                        !this.state.isLoading && this.state.player.hashes && this.state.player.hashes.length > 0
                        ? <HashesList
                            items={this.state.player.hashes}
                            selected={this.state.selectedHash}
                            onChange={(hash) => this.handleChangeHash(hash)}
                        /> : ''
                    }
                </FullHeightStatic>
                <FullHeightScrollable>
                    {content}
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

function HashesList(props) {
    let items = [];

    for (let item of props.items) {
        let text = item.name;
        if (item.uid) {
            text += ' ('+ item.uid +')';
        }
        if (item.ar) {
            text += ' '+ item.ar +'AR';
        }
        if (item.region) {
            text += ' '+ item.region;
        }

        items.push({
            value: item.hash,
            text: text,
        });
    }

    return (
        <div>
            <Dropdown
                items={items}
                selected={props.selected}
                onChange={(item) => props.onChange(item.value)}
            />
        </div>
    );
}
