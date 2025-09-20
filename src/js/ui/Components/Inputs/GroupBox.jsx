import React from 'react';
import "../../../../css/Components/Inputs/GroupBox.css"

export function GroupBox(props) {
    return (
        <div className={'group-box ' + (props.addClass ? props.addClass : '')}>
            {props.title ? <div className="title">{props.title}</div> : null}
            {props.children}
        </div>
    )
}

export class GroupBoxCollapse extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            collapsed: !!props.collapsed,
        };
    }

    toggleCollapsed() {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        let classes = ['group-box collapse'];

        if (this.props.addClass) {
            classes.push(this.props.addClass);
        }
        if (this.state.collapsed) {
            classes.push('collapsed');
        }

        return (
            <div className={classes.join(' ')}>
                {this.props.title ?
                    <div className="title" onClick={() => this.toggleCollapsed()}>
                        {this.props.title}
                        <div className="button">{this.state.collapsed ? '⮟' : '⮝'}</div>
                    </div> : null}
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}
