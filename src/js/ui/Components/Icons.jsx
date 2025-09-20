import React from 'react';
import "../../../css/Components/Icons.css"

export function CharIcon(props) {
    let size = props.size || 80;
    let rarity = 1;
    let element = '';
    let icon = 'char-icon-unknown';

    if (props.char) {
        rarity = props.char.getRarity();
        element = props.char.getElement();
        icon = props.char.getIcon();
    } else if (props.resetIcon) {
        icon = 'char-icon-empty';
    }

    return (
        <div
            onClick={props.onClick}
            className={`item-icon icon-${size} border-rarity-${rarity} background-element-${element}` + (props.addClass ? ' '+ props.addClass : '')}
        >
            <div className={`sprite sprite-char sprite-${size} ${icon}`} />
        </div>
    );
}

export function WeaponIcon(props) {
    let size = props.size || 80;

    return (
        <div
            onClick={props.onClick}
            className={`item-icon weapon icon-${size} border-rarity-${props.weapon.getRarity()}` + (props.addClass ? ' '+ props.addClass : '')}
        >
            <div className={`sprite sprite-weapon-${props.weapon.getType()} sprite-${size} ${props.weapon.getIcon()}`} />
        </div>
    )
}

export function EnemyIcon(props) {
    let size = props.size || 80;
    let icon = props.enemy ? props.enemy.getIcon() : ''

    return (
        <div
            onClick={props.onClick}
            className={`item-icon enemy icon-${size}` + (props.addClass ? ' '+ props.addClass : '')}
        >
            <div className={`sprite sprite-enemy sprite-${size} ${icon}`} />
        </div>
    )
}

export function ArtifactIcon(props) {
    let size = props.size || 80;

    return (
        <ArtifactSetIcon
            size={size}
            set={props.artifact.set}
            rarity={props.artifact.getRarity()}
            addClass={props.addClass}
            slot={props.artifact.getSlot()}
            locked={props.locked}
            onClick={props.onClick}
        />
    );
}

export function ArtifactSetIcon(props) {
    let size = props.size || 80;
    let artSet = typeof props.set == 'string' ? DB.Artifacts.Sets.get(props.set) : props.set;

    let className = `item-icon icon-${size}`

    if (props.rarity) {
        className += ` border-rarity-${props.rarity}`
    } else {
        className += ' no-border'
    }

    let slotName = props.slot || 'flower';
    if (artSet && !artSet.canEquipSlot(slotName)) {
        slotName = artSet.availableSlots()[0];
    }

    return (
        <div
            className={className + (props.addClass ? ' '+ props.addClass : '')}
            onClick={props.onClick}
        >
            <div className={`sprite sprite-artifact ${slotName} sprite-${size} ${artSet ? artSet.getImage() : 'artifact-icon-unknown'}`} />
            {props.locked ? <div className="locked" /> : ''}
        </div>
    );
}
