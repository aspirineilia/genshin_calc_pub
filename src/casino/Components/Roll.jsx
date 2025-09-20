import React from 'react';

export class Roll extends React.Component {
    roll() {
        this.speed = Math.random() * 20 + 100;
        this.tsStart = performance.now();
        this.tsEnd = this.tsStart + 3000 + Math.random() * 1000;

        window.requestAnimationFrame(() => this.animate());
    }

    animate() {
        let sec_diff = Math.max(0, this.tsEnd - performance.now()) / 1000;
        let speed = getSpeedWithAcc(this.speed, sec_diff);
        let offset = (sec_diff * speed) % this.totalOffset;

        this.setScrollTop(offset);

        if (sec_diff > 0) {
            window.requestAnimationFrame(() => this.animate());
        }
    }

    setScrollTop(offset) {
        offset ||= 0;
        let targetTop = this.itemOffsets[this.props.selected.id];
        let value = targetTop - offset;
        if (value < 0) {
            value += this.totalOffset
        }

        this.container.scrollTop = value;
    }

    componentDidUpdate() {
        if (this.props.isRolling) {
            this.roll();
        } else {
            this.setScrollTop();
        }
    }

    componentDidMount() {
        if (this.props.isRolling) {
            this.roll();
        } else {
            this.setScrollTop();
        }
    }

    render() {
        let allChars = [];
        this.totalOffset = 0;
        this.itemOffsets = {};

        for (let item of this.props.items) {
            if (this.totalOffset <= 0) {
                this.totalOffset += item.padding;
            }

            this.totalOffset += (item.height - item.padding);
            this.itemOffsets[item.id] = this.totalOffset - item.padding;

            allChars.push(
                <div className={'icon-big '+ item.iconClass1} key={item.id}>
                    <div className={item.iconClass2}></div>
                </div>
            );
        }

        let added = 3;
        for (let item of this.props.items) {
            if (--added < 0) {
                break;
            }

            allChars.push(
                <div className={'icon-big '+ item.iconClass1} key={'last'+ item.id}>
                    <div className={item.iconClass2}></div>
                </div>
            );
        }

        return (
            <div className="char-roll-item" ref={(elem) => this.container = elem}>
                {allChars}
            </div>
        );
    }
}

function getSpeedWithAcc(baseSpeed, secs) {
    let time = Math.min(6, secs) / 2;
    let acc = baseSpeed / 3;
    return baseSpeed + time * acc * acc / 2;
}
