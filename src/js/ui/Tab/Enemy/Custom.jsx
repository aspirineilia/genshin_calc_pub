import React from 'react';

import { Lang } from '../../Lang';
import { EnemyLevelLine } from '../../Components/ObjectBlock';

export class CustomEnemy extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();
        this.elements = DB.Objects.Elements.getList().map((v) => {return v.name});
    }

    render() {
        let items = [];

        for (const element of this.elements) {
            items.push(
                <EnemyLevelLine
                    key={element}
                    title={this.lang.get('stat.res_'+ element)}
                    value={this.props.resistances[element]}
                    minValue={-100}
                    maxValue={400}
                    onChange={(value) => {this.props.onResistanceChange(element, value)}}
                />
            );
        }

        return (
            <div className={this.props.hidden ? 'hidden' : ''}>
                {items}
            </div>
        );
    }
}
