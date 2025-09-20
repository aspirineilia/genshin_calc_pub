import React from "react";
import "../../../../css/Components/Inputs/Slider.css"

export class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.container = null;
        this.handler = null;
        this.rendered = false;
    }

    componentDidUpdate() {
        this.positionHandler()
    }

    positionHandler() {
        let percent = this.sliderPercent();
        this.handler.style.left = `calc(${percent}% - 10px)`;
        this.progress1.style.width = percent +'%';
        this.progress2.style.width = (100 - percent) +'%';
    }

    handleMouseDown(e) {
        e.preventDefault();

        document.onmousemove = (e) => this.handleEvent(e);

        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    }

    handleTouchMove(e) {
        if (e.changedTouches.length) {
            this.handleEvent(e.changedTouches[0])
        }
    }

    handleEvent(e) {
        let width = this.container.clientWidth - 20;
        let minOffset = this.container.getBoundingClientRect().left + 10;
        let maxOffset = minOffset + width;

        let pos = Math.min(maxOffset, Math.max(minOffset, e.clientX)) - minOffset;
        let value = Math.round((this.props.max - this.props.min) * (pos / width)) + this.props.min;
        this.valueChanged(value);
    }

    sliderPercent() {
        let value = (this.props.value - this.props.min) / (this.props.max - this.props.min) * 100;
        return Math.max(0, Math.min(100, value));
    }

    valueChanged(value) {
        value = Math.max(this.props.min, Math.min(this.props.max, value));

        if (value != this.lastValue) {
            this.lastValue = value; // Slide events can be faster than render cycle
            this.props.onChange(value);
        }
    }

    render() {
        this.lastValue = this.props.value;

        let step = this.props.step || 1;
        let stepFrom = this.props.value*1;

        let minus_value;
        let plus_value;
        if (this.props.roundTo && stepFrom % this.props.roundTo) {
            minus_value = Math.floor(stepFrom / this.props.roundTo) * this.props.roundTo;
            plus_value = (Math.floor(stepFrom / this.props.roundTo) + 1) * this.props.roundTo;
        } else {
            minus_value = stepFrom - step;
            plus_value = stepFrom + step;
        }

        if (minus_value < this.props.min) {
            minus_value = this.props.min;
        }

        if (plus_value > this.props.max) {
            plus_value = this.props.max;
        }

        return (
            <div
                className="slider-wrapper"
                onTouchMove={(e) => this.handleTouchMove(e)}
            >
                <div
                    className={'slider slider-minus'+ (this.props.value == this.props.min ? ' disabled' : '')}
                    onClick={() => this.valueChanged(minus_value)}
                />
                <div
                    ref={obj => {this.container = obj}}
                    className="slider-container"
                    onMouseDown={(e) => this.handleEvent(e)}
                >
                    <div ref={obj => {this.progress1 = obj}} className="slider-progress"></div>
                    <div ref={obj => {this.progress2 = obj}} className="slider-progress gray"></div>
                    <div
                        ref={obj => {this.handler = obj}}
                        onMouseDown={(e) => this.handleMouseDown(e)}
                        className="slider-handler"
                    />
                </div>
                <div
                    className={'slider slider-plus'+ (this.props.value == this.props.max ? ' disabled' : '')}
                    onClick={() => this.valueChanged(plus_value)}
                />
            </div>
        )
    }
}

export class DoubleSlider extends React.Component {
    constructor(props) {
        super(props);

        this.container = null;
        this.handler = null;
    }

    componentDidUpdate() {
        this.positionHandler();
    }

    positionHandler() {
        let totalWindth = this.container.clientWidth - 20;
        let percent1 = (this.props.value1 - this.props.min) / (this.props.max - this.props.min);
        let position1 = totalWindth * percent1;
        let percent2 = (this.props.value2 - this.props.min) / (this.props.max - this.props.min);
        let position2 = totalWindth * percent2;

        let position_min = Math.min(position1, position2)
        let position_max = Math.max(position1, position2)

        this.handler1.style.left = position1 +'px';
        this.handler2.style.left = position2 +'px';

        this.progress1.style.width = (position_min + 10) +'px';
        this.progress2.style.left = (position_min + 10) +'px';
        this.progress2.style.width = (position_max - position_min) +'px';
        this.progress3.style.width = (totalWindth - position_max + 10) +'px';
    }

    handleMouseDown1(e) {
        e.preventDefault();
        let width = this.container.clientWidth - 20;
        let minOffset = this.container.getBoundingClientRect().left + 10;
        let maxOffset = minOffset + width;

        document.onmousemove = (e) => {
            let pos = Math.min(maxOffset, Math.max(minOffset, e.clientX)) - minOffset;
            let value = Math.round((this.props.max - this.props.min) * (pos / width)) + this.props.min;
            this.valueChanged(value, this.props.value2);
        };

        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    }

    handleMouseDown2(e) {
        e.preventDefault();
        let width = this.container.clientWidth - 20;
        let minOffset = this.container.getBoundingClientRect().left + 10;
        let maxOffset = minOffset + width;

        document.onmousemove = (e) => {
            let pos = Math.min(maxOffset, Math.max(minOffset, e.clientX)) - minOffset;
            let value = Math.round((this.props.max - this.props.min) * (pos / width)) + this.props.min;
            this.valueChanged(this.props.value1, value);
        };

        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    }

    valueChanged(value1, value2) {
        value1 = Math.max(this.props.min, Math.min(this.props.max, value1));
        value2 = Math.max(this.props.min, Math.min(this.props.max, value2));

        if (value1 != this.props.value1 || value2 != this.props.value2) {
            this.props.onChange(value1, value2)
        }
    }

    render() {
        let minValue = Math.min(this.props.value1, this.props.value2);
        let maxValue = Math.max(this.props.value1, this.props.value2);

        return (
            <div className="slider-wrapper">
                <div
                    className={'slider slider-min'+ (this.props.min == minValue ? ' disabled' : '')}
                    onClick={() => this.valueChanged(this.props.min, maxValue)}
                />
                <div ref={obj => {this.container = obj}} className="slider-container">
                    <div ref={obj => {this.progress1 = obj}} className="slider-progress left gray"></div>
                    <div ref={obj => {this.progress2 = obj}} className="slider-progress"></div>
                    <div ref={obj => {this.progress3 = obj}} className="slider-progress right gray"></div>
                    <div ref={obj => {this.handler1 = obj}} onMouseDown={(e) => this.handleMouseDown1(e)} className="slider-handler"/>
                    <div ref={obj => {this.handler2 = obj}} onMouseDown={(e) => this.handleMouseDown2(e)} className="slider-handler"/>
                </div>
                <div
                    className={'slider slider-max'+ (this.props.max == maxValue ? ' disabled' : '')}
                    onClick={() => this.valueChanged(minValue, this.props.max)}
                />
            </div>
        )
    }
}
