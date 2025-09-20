import React from 'react';

import { Lang } from '../../js/ui/Lang';
import { GroupBox } from '../../js/ui/Components/Inputs/GroupBox';
import { Checkbox } from '../../js/ui/Components/Inputs/Input';
import { TitledButton } from '../../js/ui/Components/Inputs/Buttons';

export class OptionList extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.state = {
            hidden: true,
        };

        this.strings = {
            show: this.lang.get('common.show_settings'),
            hide: this.lang.get('common.hide_settings'),
        };
    }

    toggleHidden() {
        this.setState({hidden: !this.state.hidden});
    }

    render() {
        let items = [];

        for (let item of this.props.items) {
            items.push(
                <div key={item.id}>
                    <div className='option-list'>
                        <div className={item.iconClass1}>
                            <div className={item.iconClass2}></div>
                        </div>
                        <Checkbox
                            checked={this.props.filters[item.id]}
                            onChange={(checked) => this.props.onChange(item.id, checked)}
                        />

                    </div>
                    <div className="unit-name">
                        {item.title}
                    </div>
                </div>
            );
        }

        return (
            <GroupBox>
                <TitledButton
                    icon="icon-ok"
                    title={this.state.hidden ? this.strings.show : this.strings.hide}
                    onClick={() => this.toggleHidden()}
                />
                { this.state.hidden ? ''
                    :  <div className="items-list">
                        {items}
                    </div>
                }
            </GroupBox>
        );
    }
}
