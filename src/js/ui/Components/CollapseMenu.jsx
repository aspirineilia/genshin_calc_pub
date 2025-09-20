import React from "react";
import "../../../css/Components/CollapseMenu.css"

import { ControlsBar } from "./ControlsBar";
import { RoundButton, TitledButton } from "./Inputs/Buttons";

export class CollapseMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuVisible: false,
        };

        this.resizeEvent = () => this.refreshButtonsVisibility();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeEvent);
    }

    componentDidUpdate() {
        this.refreshButtonsVisibility();
    }

    refreshButtonsVisibility() {
        let buttons = this.root.children[0];
        let dots = this.root.children[1];
        let dotsMenu = this.root.children[2];

        let totalWidth = this.root.clientWidth;
        let hasInvisible = false;
        let itemsCount = buttons.children.length;
        let dotsWidth = 35;

        let visibility = [];

        for (let i = 0; i < itemsCount; ++i) {
            let item = buttons.children[i];
            item.classList.remove('hidden');
            let isLast = i == itemsCount - 1;
            let itemWidth = item.offsetWidth;

            if (itemWidth + (isLast ? 0 : dotsWidth) > totalWidth) {
                item.classList.add('hidden');
                hasInvisible = true;
                visibility.push(false);
            } else {
                visibility.push(true);
            }

            totalWidth -= itemWidth;
        }

        for (let i = 0; i < dotsMenu.children.length; ++i) {
            let item = dotsMenu.children[i];
            item.classList.toggle('hidden', visibility[i]);
        }

        dots.classList.toggle('hidden', !hasInvisible);
    }

    handleShowMenu() {
        this.setState({menuVisible: !this.state.menuVisible});
    }

    render() {
        let items = [];
        let hiddenItems = [];

        for (let i = 0; i < this.props.items.length; ++i) {
            let element = this.props.items[i];
            let key = 'id' + i;

            items.push(<TitledButton key={key} {...element} />);
            hiddenItems.push(<CollapseMenuItem key={key} {...element} />);
        }

        return (
            <div
                className="collapse-menu"
                ref={(obj) => this.root = obj}
            >
                <ControlsBar>{items}</ControlsBar>
                <div className="dots">
                    <RoundButton
                        icon={'dots'}
                        text="..."
                        onClick={() => this.handleShowMenu()}
                    />
                </div>
                <div
                    className={'dots-menu' + (this.state.menuVisible ? '' : ' hidden')}
                    onClick={() => this.handleShowMenu()}
                >
                    {hiddenItems}
                </div>
            </div>
        );
    }
}

function CollapseMenuItem(props) {
    return (
        <div className="item">
            <TitledButton {...props} />
        </div>
    );
}
