import SimpleBar from 'simplebar-react';
import React from 'react';
import parse from 'html-react-parser';

import "../../../../css/Components/Inputs/Dropdown.css"

const MAX_HEIGHT = 350;

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.optionsRef = null;
        this.ignoreEvent = false;
        this.state = {
            clickY: 0,
            opened: false,
            maxHeight: 0,
        };

        this.openEvent = () => this.handleDropdownEvent();

        document.addEventListener('dropdown_open', this.openEvent);
    }

    handleDropdownEvent() {
        if (this.ignoreEvent) {
            this.ignoreEvent = false;
            return;
        }

        if (this.state.opened) {
            this.setState({opened: false});
        }
    }

    toggleOpened(e) {
        let newState = !this.state.opened;
        this.ignoreEvent = true;
        document.dispatchEvent(new Event('dropdown_open'));

        this.setState({
            maxHeight: 0,
            clickY: e.clientY,
            opened: newState,
        });
    }

    selectItem(item) {
        if (this.props.isMultiple) {
            let alreadySelected = false;
            let selected = []
            for (let selectedItem of this.selectedItems) {
                if (selectedItem.value == item.value) {
                    alreadySelected = true;
                } else {
                    selected.push(selectedItem)
                }
            }

            if (!alreadySelected) {
                if (this.props.disableSelectNew) {
                    return;
                }
                selected.push(item);
            }

            this.props.onChange(selected);
        } else {
            this.props.onChange(item);
            this.setState({opened: false});
        }
    }

    shrinkOptionsHeight() {
        let observer = new IntersectionObserver((entries) => {
            let data = entries[0];
            if (data.intersectionRatio < 1) {
                let height = data.intersectionRect.height - 15;
                if (height > 100) {
                    this.setState({maxHeight: height});
                }
            }
            observer.disconnect();
        }, {
            threshold: 0,
        });

        observer.observe(this.optionsRef);
    }

    componentDidUpdate() {
        if (this.optionsRef && this.state.opened) {
            let itemsHeight = this.props.items.length * 26 + 10;
            let height = Math.min(itemsHeight, MAX_HEIGHT) + 30;

            this.optionsRef.classList.toggle('scroll', itemsHeight > MAX_HEIGHT);

            if (this.state.clickY > height && this.state.clickY + height > window.innerHeight) {
                this.optionsRef.classList.add('up');
            } else {
                this.optionsRef.classList.remove('up');
            }

            setTimeout(() => {this.shrinkOptionsHeight()}, 1)
        }
    }

    componentWillUnmount() {
        document.removeEventListener('dropdown_open', this.openEvent);
    }

    render() {
        var options = [];
        let selectedValues = Array.isArray(this.props.selected) ? this.props.selected : [this.props.selected];
        this.selectedItems = [];

        if (selectedValues.length == 0 && !this.props.isMultiple) {
            selectedValues = [this.props.items[0].value];
        }

        for (var item of this.props.items) {
            let selected = inSelected(item.value, selectedValues);
            if (selected) {
                this.selectedItems.push(item);
            }
            options.push(
                <DropdownOption
                    key={item.value}
                    item={item}
                    selected={selected}
                    disableSelect={this.props.disableSelectNew}
                    onClick={(i) => this.selectItem(i)}
                />
            );
        }

        let currentItems = [];
        for (let selectedItem of this.selectedItems) {
            let icons = [];
            let iconIndex = 0;

            if (this.props.textIcon) {
                ++iconIndex;
                icons.push(<div key={'icon-'+ iconIndex} className={'dropdown-icon icon-'+ this.props.textIcon} />)
            }

            if (selectedItem.textIcons) {
                for (let icon of selectedItem.textIcons) {
                    ++iconIndex;
                    icons.push(<div key={'icon-'+ iconIndex} className={'dropdown-icon icon-'+ icon} />)
                }
            }

            currentItems.push(
                <div key={selectedItem.value} className="dropdown-option">
                    {icons}
                    <div className="text">{parseText(selectedItem.text)}</div>
                </div>
            );
        }

        return (
            <DropdownWrapper addClass={this.props.addClass}>
                <div className={'dropdown-current' + (this.state.opened ? ' opened' : '')} onClick={(e) => this.toggleOpened(e)}>
                    {currentItems}
                </div>
                <div ref={obj => {this.optionsRef = obj}} className="dropdown-options">
                    <SimpleBar
                        ref={(obj) => {this.bar = obj}}
                        style={{ maxHeight: this.state.maxHeight ? this.state.maxHeight : this.props.height || 350 }}
                        autoHide={true}
                    >
                        {options}
                    </SimpleBar>
                </div>
            </DropdownWrapper>
        )
    }
}

function DropdownWrapper(props) {
    return (
        <div className={'dropdown-wrapper '+ (props.addClass || '')}>
            {props.children}
        </div>
    )
}

function DropdownOption(props) {
    if (props.item.isCaption) {
        return (
            <div className='dropdown-caption'>
                <span className="dropdown-option-text">{parseText(props.item.text)}</span>
            </div>
        );
    }

    let className = 'dropdown-option';
    if (props.selected) {
        className += ' selected';
    }
    if (props.item.isSubitem) {
        className += ' subitem';
    }
    if (props.item.isChild) {
        className += ' child';
    }
    if (!props.selected && props.disableSelect) {
        className += ' disabled';
    }

    let icons = [];
    let iconIndex = 0;

    if (props.item.textIcons) {
        for (let icon of props.item.textIcons) {
            ++iconIndex;
            icons.push(<div key={'icon-'+ iconIndex} className={'dropdown-icon icon-'+ icon} />)
        }
    }

    if (props.item.optionIcons) {
        for (let icon of props.item.optionIcons) {
            ++iconIndex;
            icons.push(<div key={'icon-'+ iconIndex} className={'dropdown-icon icon-'+ icon} />)
        }
    }

    return (
        <div className={className} onClick={() => props.onClick(props.item)}>
            {icons}
            <div className="text">{parseText(props.item.text)}</div>
            {props.item.number ? <div className="number">{props.item.number}</div> : ''}
        </div>
    );
}


function inSelected(value, list) {
    for (let item of list) {
        if (item == value) {
            return true;
    }
    }
    return false;
}

function parseText(value) {
    if (typeof value === 'string') {
        return parse(value);
    }
    return value;
}
