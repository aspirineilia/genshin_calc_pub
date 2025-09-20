import React from 'react';

import { Roll } from './Roll';

export class RollsList extends React.Component {
    render() {
        let rolls = [];

        for (let i = 0; i < this.props.selected.length; ++i) {
            rolls.push(
                <Roll key={'char'+ i} isRolling={this.props.isRolling} items={this.props.items} selected={this.props.selected[i]} />
            )
        }

        return (
            <div className="chars-line">
                {rolls}
            </div>
        )
    }
}
