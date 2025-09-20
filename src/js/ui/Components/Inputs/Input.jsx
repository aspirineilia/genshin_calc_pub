import React from 'react';

import "../../../../css/Components/Inputs/Input.css"
import { Lang } from '../../Lang';

let lang = new Lang();

export function TextInput(props) {
    let classes = ['inputs-text'];
    if (props.addClass) {
        classes.push(props.addClass);
    }

    return (
        <input
            type={props.type || "text"}
            value={props.value}
            placeholder={props.placeholder}
            className={classes.join(' ')}
            onChange={(e) => props.onChange(e.target.value)}
            onKeyDown={(e) => {if (e.key == 'Enter' && props.onEnter) { props.onEnter(); }}}
            autoComplete="off"
        />
    );
}

export class TextInputWithButton extends React.Component {
    render() {
        let itemClass = 'inputs-text with-button';

        if (this.props.addClass) {
            itemClass += ' ' + this.props.addClass;
        }

        return (
            <div className="inputs-text-wrapper">
                <input
                    type="text"
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    className={itemClass}
                    onChange={(e) => this.props.onChange(e.target.value)}
                    autoComplete="off"
                />
                <div
                    className="inputs-text-button"
                    onClick={() => this.props.onClick()}
                >
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export class TextInputWithCopy extends React.Component {
    handleChange() {
        this.setState({});
    }

    handleCopy() {
        navigator.clipboard.writeText(this.props.value);
    }

    render() {
        let itemClass = 'inputs-text with-button';

        if (this.props.addClass) {
            itemClass += ' ' + this.props.addClass;
        }

        return (
            <div className="inputs-text-wrapper">
                <input
                    ref={(obj) => this.obj = obj}
                    type="text"
                    value={this.props.value}
                    className={itemClass}
                    onChange={() => this.handleChange()}
                    onFocus={() => this.obj.select()}
                    onClick={() => this.obj.select()}
                    autoComplete="off"
                />
                <div
                    className="inputs-text-button"
                    onClick={() => this.handleCopy()}
                >
                    <span className="copy" />
                    {lang.get('share_view.copy')}
                </div>
            </div>
        );
    }
}

export class NumberInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            emptyValue: false,
            decimalValue: '',
        };
    }

    handleChange(value) {
        if (value === '') {
            if (this.props.nonEmpty) {
                this.setState({emptyValue: true});
            } else {
                this.props.onChange(value);
            }
            return;
        }

        this.state.emptyValue = false;

        if (this.props.isDecimal && value.match(/[\,\.]$/)) {
            value = value.replace(',', '.');
            this.setState({decimalValue: value});
            return;
        } else {
            this.state.decimalValue = '';
        }

        if (this.props.isDecimal) {
            value = parseFloat(value);
            let digits = this.props.decimalDigits || 1;
            if (digits) {
                let multi = Math.pow(10, digits);
                value = Math.floor(value * multi) / multi;
            }
        } else {
            value = parseInt(value);
        }

        value ||= 0;

        if (this.props.minValue) {
            if (this.props.allowMinZero && value == 0) {
                // allow zero value with minValue
            } else {
                if (value < this.props.minValue) {
                    this.setState({decimalValue: value});
                    return;
                }
                value = Math.max(value, this.props.minValue);
            }
        }

        if (this.props.maxValue) {
            value = Math.min(value, this.props.maxValue);
        }

        this.state.emptyValue = false;
        this.props.onChange(value);
    }

    restoreValue() {
        if (this.state.decimalValue) {
            let value;
            if (this.props.minValue && parseFloat(this.state.decimalValue) < this.props.minValue) {
                value = this.props.minValue;
            } else {
                value = parseFloat(this.state.decimalValue);
            }
            this.state.emptyValue = false;
            this.state.decimalValue = '';
            this.props.onChange(value);
        } else if (this.state.emptyValue) {
            this.state.emptyValue = false;
            this.props.onChange(this.props.value);
        }
    }

    render() {
        let itemClass = 'inputs-text';
        if (this.props.addClass) {
            itemClass += ' ' + this.props.addClass;
        }

        let displayValue = this.props.value;
        if (this.state.emptyValue) {
            displayValue = '';
        } else if (this.state.decimalValue) {
            displayValue = this.state.decimalValue;
        }

        let step = this.props.step || 1;

        let minus_value = this.props.value - step;
        if (minus_value < this.props.minValue) {
            minus_value = this.props.minValue;
        }

        let plus_value = this.props.value + step;
        if (plus_value > this.props.maxValue) {
            plus_value = this.props.maxValue;
        }

        return (
            <div className="input-number-line">
                {this.props.showButtons ? <div
                    className={'button button-minus'+ (this.props.value == this.props.minValue ? ' disabled' : '')}
                    onClick={() => this.props.onChange(minus_value)}
                /> : ''}
                <input
                    type="text"
                    size={this.props.size}
                    value={displayValue}
                    className={itemClass}
                    onChange={(e) => this.handleChange(e.target.value)}
                    onBlur={this.props.nonEmpty || this.state.decimalValue ? () => this.restoreValue() : undefined}
                    autoComplete="off"
                />
                {this.props.showButtons ? <div
                    className={'button button-plus'+ (this.props.value == this.props.maxValue ? ' disabled' : '')}
                    onClick={() => this.props.onChange(plus_value)}
                /> : ''}
            </div>
        );
    }
}

export function Checkbox(props) {
    return (
        <div
            className="checkbox-wrapper"
            onClick={(e) => props.onChange(!props.checked, commandKeys(e))}
        >
            <input
                autoComplete="off"
                className="checkbox"
                type="checkbox"
                checked={!!props.checked}
                onChange={() => {}}
            />
            <div className="checkbox-switcher"></div>
            <div className="checkbox-label">{props.title}</div>
        </div>
    )
}

export function CheckboxList(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        items.push(
            <div key={index++} className="checkbox-list-item">
                <Checkbox {...item} onChange={(value) => props.onChange(item.name, value)} />
            </div>
        );
    }

    return (
        <div className="checkbox-list-wrapper">
            {items}
        </div>
    );
}

export function RadioList(props) {
    let inputs = [];

    for (let item of props.items) {
        inputs.push(
            <Radio
                key={item.value}
                value={item.value}
                title={item.title}
                selected={item.value === props.selected}
                onChange={props.onChange}
            />
        );
    }

    return (
        <div className="inputs-radio-horizontal">
            {inputs}
        </div>
    );
}

export function Radio(props) {
    return (
        <label
            className={'inputs-radio' + (props.selected ? ' selected': '')}
            onClick={(e) => props.onChange(props.value, commandKeys(e))}
        >
            <div className="box">
                <div className="box-inner"/>
            </div>
            <div className="title">{props.title}</div>
        </label>
    );
}

export function FileInput(props) {
    return (
        <div className="input-file">
            <input
                type="file"
                onChange={props.onChange}
            />
        </div>
    );
}

function commandKeys(e) {
    return {
        alt: e.nativeEvent.altKey,
        shift: e.nativeEvent.shiftKey,
        ctrl: e.nativeEvent.ctrlKey || e.nativeEvent.metaKey,
    };
}
