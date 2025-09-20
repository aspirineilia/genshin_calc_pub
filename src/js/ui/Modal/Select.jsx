import React from "react";
import "../../../css/Components/Modal/Select.css"

import { DialogContainer } from "../Components/Dialog/Container";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../Components/FullHeight";
import { TextInputWithButton } from "../Components/Inputs/Input";
import { Lang } from "../Lang";
import { StorageItemSettings } from "../../classes/StorageItem/Settings";

let lang = new Lang();

export class ModalSelectBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            filterString: '',
            sortString: '',
            selectedId: 0,
        };

        this.needSorting = true;
        this.needFiltering = true;

        this.reloadSettings();
        this.loadItems();
    }

    show(data) {
        data = Object.assign({}, data);

        this.callback = data.callback;
        this.closeCallback = data.closeCallback;
        this.needFiltering = true;
        this.reloadSettings();

        let newState = {
            isVisible: true,
            selectedId: data.selectedId || 0,
            ...this.getShowState(data),
        };

        this.setState(newState);
    }

    reloadSettings() {
        this.settings = new StorageItemSettings();
    }

    refresh() {
        this.setState({isVisible: this.state.isVisible});
    }

    getShowState(data) {
        return {}
    }

    loadItems() {}

    handleSortString(value) {
        this.needSorting = true;
        this.setState({sortString: value});
    }

    handleFilterString(value) {
        this.needFiltering = true;
        this.setState({filterString: value});
    }

    handleItemSelect(item) {
        if (this.callback) {
            this.callback(item);
        }
        this.handleClose();
    }

    handleClose() {
        if (this.closeCallback) {
            this.closeCallback();
        }
        this.setState({isVisible: false});
    }

    sortItems() {}
    filterItems() {}

    prepareItems() {
        this.sortItems();
        this.filterItems();
    }

    render() {
        if (this.state.isVisible) {
            this.prepareItems();
        }

        return (
            <DialogContainer
                addClass={'object-select-modal '+ this.props.addClass}
                width={this.props.width || 900}
                maxHeight={true}
                isVisible={this.state.isVisible}
                title={this.props.title}
                closeCallback={() => this.handleClose()}
            >
                <FullHeight>
                    <FullHeightStatic>
                        {this.getControls()}
                    </FullHeightStatic>
                    <FullHeightScrollable>
                        {this.getContent()}
                    </FullHeightScrollable>
                </FullHeight>
            </DialogContainer>
        );
    }

    getControls() {
        return null;
    }

    getContent() {
        return null;
    }
}

export function SearchInput(props) {
    return (
        <TextInputWithButton
            value={props.value}
            placeholder={lang.get('share_view.search')}
            text={lang.get('rotation_view.clear')}
            onChange={(value) => props.onChange(value)}
            onClick={() => props.onChange('')}
        />
    )
}
