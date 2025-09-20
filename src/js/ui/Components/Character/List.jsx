import React from 'react';
import "../../../../css/Components/Char/List.css"

import { CharInfo } from './Info';

export function CharacterList(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        ++index;
        let key = item.key || index;

        items.push(
            <div key={key} className={'item' + (item.hidden ? ' hidden' : '')}>
                <CharInfo
                    title={item.title}
                    set={item.set}
                    callbackData={item.callbackData}
                    buttons={props.buttons}
                    moreButtons={props.moreButtons}
                    statDetails={props.statDetails}
                    artifactDetails={props.artifactDetails}
                />
            </div>
        );
    }

    return (
        <div className="char-list">
            {items}
        </div>
    )
}
