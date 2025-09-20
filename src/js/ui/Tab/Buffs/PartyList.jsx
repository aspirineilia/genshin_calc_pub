import React from "react";
import { CharIcon } from "../../Components/Icons";

export class PartyList extends React.Component {
    handleCharSelect(index) {
        let currentIds = [
            this.props.settings.party_char_1,
            this.props.settings.party_char_2,
            this.props.settings.party_char_3,
        ];
        let excludeIds = [this.props.settings.char_id].concat(currentIds);

        UI.CharSelectReact.show({
            excludeIds: excludeIds,
            showEmpty: true,
            callback: (char) => {
                currentIds[index - 1] = char ? char.getId() : 0;
                this.props.onChange(currentIds);
            },
        });
    }

    render() {
        let items = [];

        items.push(
            <CharIcon key={this.props.settings.char_id} char={DB.Chars.getById(this.props.settings.char_id)} />
        );

        for (let i = 1; i <= 3; i++) {
            let char = DB.Chars.getById(this.props.settings['party_char_'+ i]);
            items.push(
                <CharIcon
                    key={'party_char_'+ i}
                    char={char}
                    addClass="item"
                    onClick={() => this.handleCharSelect(i)}
                />
            );
        }

        return (
            <div className="buffs-char-list">
                {items}
            </div>
        );
    }
}
