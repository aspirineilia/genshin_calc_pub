import React from 'react';
import "../../../css/Components/Accordion.css"

export class Accordion extends React.Component {
    constructor(props) {
        super(props);

        let firstChild = this.props.children && Array.isArray(this.props.children) ? this.props.children[0] : this.props.children;

        this.state = {
            openedId: firstChild ? firstChild.props.id : '',
        };
    }

    handleOpen(itemId) {
        let current = this.state.openedId;
        if (current === itemId) {
            this.setState({openedId: ''});
        } else {
            this.setState({openedId: itemId});
        }
    }

    render() {
        let items = [];
        let children = this.props.children;
        if (!Array.isArray(children)) {
            children = [children];
        }

        for (let item of children) {
            if (!item) {
                continue;
            }

            items.push(
                <AccordionItemContainer
                    key={item.props.id}
                    onClick={() => this.handleOpen(item.props.id)}
                    isActive={item.props.id == this.state.openedId}
                    title={item.props.title}
                >
                    {item.props.children}
                </AccordionItemContainer>
            )
        }

        return (
            <>
                {items}
            </>
        )
    }
}

class AccordionItemContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'accordion-item' + (this.props.isActive ? ' active' : '')}>
                <div className="accordion-item-caption" onClick={this.props.onClick}>{this.props.title}</div>
                <div className="accordion-item-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export function AccordionItem(props) {}

