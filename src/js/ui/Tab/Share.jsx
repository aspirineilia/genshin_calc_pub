import React from 'react';
import "../../../css/Components/Tab/Share.css"

import { Serializer } from '../../classes/Serializer';
import { CharacterList } from '../Components/Character/List';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { TitledButton } from '../Components/Inputs/Buttons';
import { TextInputWithButton, TextInputWithCopy } from '../Components/Inputs/Input';
import { ReactTab } from '../Components/Tab';

import { Lang } from '../Lang';
import { SearchInput } from '../Modal/Select';
import { Tab } from "../Tab";

let lang = new Lang();

export class ShareTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'share';
        this.rightRab = false;
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            needRefreshBuilds: true,
        });
    }

    createContent() {
        return (
            <ShareView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        );
    }
}

export class ShareView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            needRefreshBuilds: true,
            filterString: '',
        };
        this.needFiltering = true;
        this.storage = this.props.app.storage.char;
    }

    reloadItems() {
        if (!this.state.needRefreshBuilds) {
            return;
        }

        this.state.needRefreshBuilds = false;
        this.needFiltering = true;
        this.items = [];

        let index = 0;
        let prefix = Math.random();
        let showBeta = this.props.app.showBetaContent();

        for (let item of this.storage.listDecoded(showBeta)) {
            let title = item.title || lang.get(item.data.getChar().object.getName());

            this.items.push({
                key: index +' '+ prefix,
                callbackData: {index: index},
                title: title,
                sortTitle: title.toLocaleUpperCase(),
                set: item.data,
            });
            ++index;
        }

        this.items = this.items.sort((a, b) => {
            return a.sortTitle.localeCompare(b.sortTitle);
        });
    }

    filterItems() {
        if (!this.needFiltering) {
            return;
        }

        let filterString = this.state.filterString.toUpperCase();

        for (let item of this.items) {
            item.hidden = filterString && !item.sortTitle.includes(filterString);
        }
    }

    dataBuildLink() {
        let hash = Serializer.pack(this.props.app.currentSet());
        let url = window.location.toString();
        url = url.replace(/#.*$/, '');
        url += '#'+ hash;

        return url;
    }

    handleFilterString(value) {
        this.needFiltering = true;
        this.setState({filterString: value});
    }

    handleSaveNameChange(value) {
        this.setState({saveString: value});
    }

    handleSaveBuild() {
        this.storage.add(this.props.app.currentSet().clone(), {
            title: this.state.saveString,
        });

        this.props.app.refresh({objects: ['storage.characters']});
    }

    handleRenameBuild(build, data) {
        let index = data.index;
        let item = this.storage.get(index);

        UI.PromptWindow.show('modal.edit_char_name', item.title, (text) => {
            this.storage.setTitle(index, text);
            this.props.app.refresh({objects: ['storage.characters']});
        });
    }

    handleOverwriteBuild(build, data) {
        UI.ConfirmWindow.show('modal.confirm', 'share_view.confirm_overwrite', () => {
            this.storage.replace(data.index, this.props.app.currentSet().clone());
            this.props.app.refresh({objects: ['storage.characters']});
        });
    }

    handleDeleteBuild(build, data) {
        UI.ConfirmWindow.show('modal.confirm', 'share_view.confirm_delete', () => {
            this.storage.remove(data.index);
            this.props.app.refresh({objects: ['storage.characters']});
        });
    }

    handleLoadBuild(build) {
        UI.ConfirmWindow.show('modal.confirm', 'share_view.confirm_load', () => {
            this.props.app.replaceSet(build)
        });
    }

    handleShowEnka() {
        UI.EnkaImport.show();
    }

    render() {
        this.reloadItems();
        this.filterItems();

        return (
            <ReactTab title={lang.get('tab_header.share_view')}>
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <TextInputWithCopy
                                barClass="resizable"
                                value={this.dataBuildLink()}
                            />
                        </ControlsBar>
                        <ControlsBar>
                            <TextInputWithButton
                                barClass="resizable"
                                value={this.state.saveString}
                                placeholder={lang.get('share_view.save_placeholder')}
                                text={lang.get('share_view.save_local')}
                                onChange={(value) => this.handleSaveNameChange(value)}
                                onClick={() => this.handleSaveBuild()}
                            />
                        </ControlsBar>
                        <ControlsBar>
                            <div>{lang.get('share_view.stored_title')}</div>
                            <ControlsBarDivider />
                            <TitledButton
                                icon="icon-ok"
                                title={lang.get('share_view.showcase_import')}
                                onClick={() => this.handleShowEnka()}
                            />
                        </ControlsBar>
                        <ControlsBar>
                            <SearchInput
                                barClass="resizable"
                                value={this.state.filterString}
                                onChange={(value) => this.handleFilterString(value)}
                            />
                        </ControlsBar>
                    </FullHeightStatic>
                    <FullHeightScrollable noPadding={true}>
                        <CharacterList
                            items={this.items}
                            statDetails={true}
                            artifactDetails={true}
                            buttons={[
                                {
                                    icon: 'gi-share-load',
                                    tooltip: UI.Lang.get('enka_import.load_char'),
                                    callback: (set, data) => this.handleLoadBuild(set, data),
                                },
                            ]}
                            moreButtons={[
                                {
                                    icon: 'icon-ok',
                                    title: UI.Lang.get('share_view.build_rename'),
                                    callback: (set, data) => this.handleRenameBuild(set, data),
                                },
                                {
                                    icon: 'icon-replace',
                                    title: UI.Lang.get('share_view.build_overwrite'),
                                    callback: (set, data) => this.handleOverwriteBuild(set, data),
                                },
                                {
                                    icon: 'icon-delete',
                                    title: UI.Lang.get('share_view.build_delete'),
                                    callback: (set, data) => this.handleDeleteBuild(set, data),
                                },
                            ]}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}
