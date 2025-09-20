import React from 'react';

import { Lang } from '../../js/ui/Lang';
import { RollsList } from './RollList';
import { OptionList } from './OptionList';
import { TitledButton } from '../../js/ui/Components/Inputs/Buttons';
import { Dropdown } from '../../js/ui/Components/Inputs/Dropdown';
import { ControlsBar } from '../../js/ui/Components/ControlsBar';

export class Casino extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.allItems = [];
        this.byKey = {};

        let allowed = {}
        for (let item of this.props.items) {
            allowed[item.id] = true;
            this.allItems.push(item);
            this.byKey[item.id] = item;
        }

        this.state = {
            selected: [],
            top: [],
            filters: allowed,
            isRolling: false,
        };

        this.loadFromStorage();
        this.filterItems();

        this.numberItems = [
            {value: 1, text: 1},
            {value: 2, text: 2},
            {value: 3, text: 3},
            {value: 4, text: 4},
            {value: 5, text: 5},
            {value: 6, text: 6},
            {value: 7, text: 7},
            {value: 8, text: 8},
            {value: 9, text: 9},
            {value: 10, text: 10},
        ];

        this.state.number = Math.min(this.props.number, this.filteredItems.length)
    }

    loadFromStorage() {
        let str = localStorage.getItem(this.props.storageName);
        let data;

        try {
            data = JSON.parse(str);
        } catch(e) {
            return null;
        }

        if (data) {
            for (let item of this.allItems) {
                this.state.filters[item.id] = !!data[item.id];
            }
        }
    }

    saveToStorage() {
        localStorage.setItem(this.props.storageName, JSON.stringify(this.state.filters))
    }

    handleNumberChange(item) {
        this.setState({
            isRolling: false,
            number: item.value,
        });
    }

    setRandomItems(isRolling) {
        let shuffled = shuffle([].concat(this.filteredItems));
        let items = [];

        for (let i = 0; i < this.state.number; ++i) {
            items.push(shuffled[i]);
        }

        this.setState({
            isRolling: isRolling === false ? false : true,
            selected: items,
        });
    }

    handleItemFilter(charId, selected) {
        let filters = this.state.filters;
        filters[charId] = selected;

        this.filterItems();
        this.setState({
            isRolling: false,
            filters: filters,
            number: Math.min(Math.max(1, this.state.number), this.filteredItems.length),
        });
        this.saveToStorage();
    }

    filterItems() {
        this.filteredItems = [];

        for (let item of this.allItems) {
            if (this.state.filters[item.id]) {
                this.filteredItems.push(Object.assign({}, item));
            }
        }
    }

    componentDidMount() {
        this.setRandomItems(false);
    }

    render() {
        return (
            <div className={this.props.wrapperClass}>
                <RollsList
                    ref={(elem) => this.rollsList = elem}
                    items={this.filteredItems}
                    selected={this.state.selected}
                    isRolling={this.state.isRolling}
                />
                <ControlsBar>
                    <div className="dropdown-number">
                        <Dropdown
                            items={this.numberItems}
                            selected={this.state.number}
                            onChange={(item) => this.handleNumberChange(item)}
                        />
                    </div>
                    <div>
                        <TitledButton
                            icon="icon-replace"
                            title={this.lang.get('common.roll')}
                            onClick={() => this.setRandomItems()}
                        />
                    </div>
                </ControlsBar>
                <OptionList
                    items={this.allItems}
                    filters={this.state.filters}
                    onChange={(char, selected) => this.handleItemFilter(char, selected)}
                />
            </div>
        )
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}
