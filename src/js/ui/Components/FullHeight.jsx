import React from 'react';
import SimpleBar from 'simplebar-react';
import { InView } from 'react-intersection-observer';

import "../../../css/Components/FullHeight.css"
import { Stats } from '../../classes/Stats';
import { TabLoading } from './Tab';

const OVERLAY_DELAY = 100;

export function FullHeight(props) {
    return (
        <div className={'full-height' + (props.addClass ? ' '+ props.addClass : '')}>{props.children}</div>
    );
}

export function FullHeightStatic(props) {
    return (
        <div className="block">{props.children}</div>
    );
}

export class FullHeightScrollable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoading: false,
        };

        this.prevLoading = false;

        this.timerId;
    }

    render() {
        if (!this.props.isLoading || this.prevLoading != this.props.isLoading) {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
        }
        this.prevLoading = this.props.isLoading;

        if (!this.props.isLoading) {
            this.state.showLoading = false;
        }

        if (this.props.isLoading) {
            this.timerId = setTimeout(() => {
                if (!this.state.showLoading) {
                    this.setState({showLoading: true});
                }
            }, OVERLAY_DELAY);
        }

        let style = {};
        if (this.props.maxHeight) {
            style.maxHeight = this.props.maxHeight;
        }
        if (this.props.minHeight) {
            style.minHeight = this.props.minHeight;
        }

        let progressMessages = [];

        if (this.props.isLoading) {
            let items = [];
            let progress = this.props.loadingProgress;
            if (progress && progress.total) {
                items.push(progress)
            }

            if (this.props.loadingSubProgress) {
                items = items.concat(this.props.loadingSubProgress);
            }

            for (let i = 0; i < items.length; ++i) {
                let item = items[i]
                progressMessages.push(
                    <div key={'item'+ i} className="loading-progress">
                        {Stats.format('text', item.completed) || 0}/{Stats.format('text', item.total)} ({item.total ? Math.round(100 * item.completed / item.total) : 0}%)
                    </div>
                )
            }
        }

        return (
            <div className="content">
                <SimpleBar autoHide={true} className="full-height-wrapper" style={style}>
                    <div className={'content-scrollbar'+ (this.props.noPadding ? ' no-padding' : '')}>
                        {this.props.children}
                    </div>
                </SimpleBar>
                {this.state.showLoading ?
                    <TabLoading>
                        <div>{this.props.loadingOverlay}</div>
                        {progressMessages}
                    </TabLoading>
                : null}
            </div>
        );
    }
}

export class FullHeightFloatTitle extends React.Component {
    constructor(props) {
        super(props);

        this.visibleItems = []
        this.state = {
            visibleTitle: '',
        }
    }

    handleChangeVisibility(index, value) {
        this.visibleItems[index] = value;
        let title = this.getFloatTitle();

        if (title != this.state.visibleTitle) {
            this.setState({visibleTitle: title});
        }
    }

    getFloatTitle() {
        let index = -1;

        for (let i = 0; i < this.visibleItems.length; ++i) {
            if (this.visibleItems[i]) {
                break;
            }
            index = i;
        }

        if (index >= 0 && this.props.children[index]) {
            return this.props.children[index].props.title;
        }
        return '';
    }

    render() {
        let items = [];

        let index = 0;
        for (let item of this.props.children) {
            let key = index;
            items.push(
                <InView
                    as="div"
                    key={'index'+ index}
                    threshold={1}
                    onChange={(visible) => this.handleChangeVisibility(key, visible)}
                >
                    {item}
                </InView>
            );
            ++index;
        }

        return (
            <div className="content">
                <SimpleBar autoHide={true} className="full-height-wrapper">
                    <div className={'content-scrollbar'+ (this.props.noPadding ? ' no-padding' : '')}>
                    {items}
                    </div>
                </SimpleBar>
                {this.state.visibleTitle ? <div className="title float-title odd">{this.state.visibleTitle}</div> : ''}
            </div>
        );
    }
}

export function FloatTitleBlock(props) {
    return (
        <div className="float-table-block">
            <div className="title">{props.title}</div>
            {props.children}
        </div>
    );
}
