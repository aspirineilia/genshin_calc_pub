import React from 'react';
import parse from 'html-react-parser';

import "../../../css/Components/TextBlocks.css"

import { Lang } from '../Lang';

let lang = new Lang();

export function BlockRemark(props) {
    return (
        <div className="block-remark">{props.children}</div>
    );
}

export function NotAvailable(props) {
    return (
        <div className="beta-warning">
            {lang.get('tab_content.not_avaliable')}
        </div>
    );
}

export function UnderDevelopment(props) {
    return (
        <div className="beta-warning">
            {parse(lang.get('tab_content.under_development'))}
        </div>
    );
}

export function BetaWarning(prors) {
    return (
        <div className="beta-warning">
            <span>{lang.get('object_view.beta_1')} </span>
            <span>{lang.get('object_view.beta_2')} </span>
        </div>
    );
}
