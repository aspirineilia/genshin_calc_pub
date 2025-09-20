import React from 'react';
import "../../../css/Components/FeatureTable.css"

import { Stats } from '../../classes/Stats';
import { formatNumber } from '../../Utils';
import { Lang } from '../Lang';

const lang = new Lang();
const FEATURE_VALUES = ['normal', 'crit', 'average'];
const FEATURE_HEAL_EMPTY = ['normal', 'crit'];

export function FeatureTableHeader(props) {
    return (
        <div className="feature-table-header">
            <div className="flex-spacer">{props.title}</div>
            <div className="item">{lang.get('stat_view.normal')}</div>
            <div className="item">{lang.get('stat_view.crit')}</div>
            <div className="item">{lang.get('stat_view.average')}</div>
        </div>
    );
}

export function FeatureTableValues(props) {
    let items = [];
    let format = props.result ? {format: props.result.format, digits: props.result.digits, no_decimal_zero: true} : null;

    for (let name of FEATURE_VALUES) {
        let value = props.result ? props.result[name] : 0;
        let base = props.base ? props.base[name] : 0;

        if (props.result && props.result.noCritValues && FEATURE_HEAL_EMPTY.includes(name)) {
            base = value = 0;
        }

        items.push(
            <FeatureTableValue
                key={name}
                value={value}
                base={base}
                displayMode={props.displayMode}
                format={format}
            />
        )
    }

    return (
        <>{items}</>
    )
}

export function FeatureTableValue(props) {
    let value = '';
    let subValue;
    let addClass = '';
    let format = props.format ? props.format.format : '';

    if (format == 'percent') {
        value = formatNumber(props.value, {percent: true, digits: props.format.digits, no_decimal_zero: 1});
    } else if (format == 'decimal') {
        value = formatNumber(props.value, {digits: props.format.digits});
    } else {
        value = Stats.format('', props.value);
    }

    if (props.base) {
        if (props.displayMode == 'percent') {
            subValue = Stats.format('text_percent', props.value / props.base * 100, {decimal_digits: 1, no_decimal_zero: 1});
        } else if (props.displayMode == 'absolute') {
            let diff = Math.round(props.value - props.base, 5);
            subValue = Stats.format('', diff, {signed: true, minimize: true}) || '-';
            addClass = diff > 0 ? ' positive' : (diff < 0 ? ' negative' : '');
        }
    }

    return (
        <div className={'feature-table-value' + (value.length >= 8 ? ' big' : '')}>
            {value}
            {subValue !== undefined ? <div className={'remark'+ addClass}>{subValue}</div> : null}
        </div>
    );
}
