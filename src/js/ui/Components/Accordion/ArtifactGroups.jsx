import React from 'react';
import "../../../../css/Components/Accordion/ArtifactGroups.css";

import { GroupBox } from '../Inputs/GroupBox';
import { Checkbox } from '../Inputs/Input';

export function AccordionArtifactGroups(props) {
    let items = [];

    for (let item of props.items) {
        let title = `${item.title} (${item.count})`;

        items.push(
            <Checkbox
                key={item.value || '-'}
                title={title}
                checked={props.values[item.value]}
                onChange={(checked, keys) => props.onChange(item.value, checked, keys)}
            />
        );
    }

    return (
        <GroupBox className="accordion-artifact-groups">
            {items}
        </GroupBox>
    );
}
