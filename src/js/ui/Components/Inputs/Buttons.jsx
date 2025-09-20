import React from 'react';
import '../../../../css/Components/Inputs/Buttons.css'

export class TitledButton extends React.PureComponent {
    render() {
        return (
            <div
                className={'inputs-button' + (this.props.disabled ? ' disabled' : '')}
                onClick={this.props.disabled ? undefined : this.props.onClick}
            >
                <span className={'inputs-button-icon ' + this.props.icon} />
                {this.props.title}
            </div>
        );
    }
}

export function RoundButton(props) {
    return (
        <div
            className={'round-button ' + props.icon}
            data-tooltip={props.tooltip}
            onClick={props.onClick}
        >{props.text || ''}</div>
    );
}

export function ResultTableButton(props) {
    return (
        <div
            className={'result-table-button ' + props.icon}
            data-tooltip={props.tooltip}
            onClick={props.onClick}
        />
    );
}

export class ToggleRoundButton extends React.PureComponent {
    render() {
        let classes = ['round-button', 'toggled'];

        if (this.props.checked) {
            classes.push('active');
        }

        if (this.props.addClass) {
            classes.push(this.props.addClass);
        }

        if (this.props.icon) {
            classes.push(this.props.icon);
        }

        return (
            <div
                className={classes.join(' ')}
                data-tooltip={this.props.tooltip}
                onClick={() => this.props.onChange(!this.props.checked)}
            >{this.props.text || ''}</div>
        )
    }
}

export function MiniButton(props) {
    return (
        <div
            className={'mini-button '+ props.icon}
            onClick={props.onClick}
            data-tooltip={props.tooltip}
        />
    );
}
