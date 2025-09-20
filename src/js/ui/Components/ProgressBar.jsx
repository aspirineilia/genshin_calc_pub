import React from "react";
import "../../../css/Components/ProgressBar.css"
import { Stats } from "../../classes/Stats";

export function ProgressBar(props) {
    let percent = (props.total ? props.count * 100 / props.total : 0).toFixed(1);
    let displayPercent = props.total ? Math.floor(percent) : 0;

    return (
        <div className={'progress-bar' + (props.addClass ? ' '+ props.addClass : '')}>
            <div className="bar" style={{width: percent +'%'}} />
            <div className="line">
                <div className="value left">{Stats.format('text_value', props.count) || 0}</div>
                <div className="sep">/</div>
                <div className="value right">{Stats.format('text_value', props.total) || 0} ({displayPercent}%)</div>
            </div>
        </div>
    );
}
