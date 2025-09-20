import React from 'react';

import { GroupBox } from '../Inputs/GroupBox';
import { Checkbox } from '../Inputs/Input';

export function AccordionArtifactSlots(props) {
    let items = [];

    for (let slot of props.items) {
        items.push(
            <Checkbox
                key={slot}
                title={UI.Lang.get('artifact_set.'+ slot)}
                checked={props.values[slot]}
                onChange={(checked, keys) => props.onChange(slot, checked, keys)}
            />
        );
    }

    return <GroupBox>{items}</GroupBox>;
}
