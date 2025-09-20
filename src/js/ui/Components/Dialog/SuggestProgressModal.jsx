import React from "react";
import "../../../../css/Components/Dialog/SuggestProgressModal.css"

import { DialogContainer } from "./Container";
import { Lang } from "../../Lang";
import { ProgressBar } from "../ProgressBar";
import { ControlsBar, ControlsBarDivider } from "../ControlsBar";
import { TitledButton } from "../Inputs/Buttons";

let lang = new Lang();

export class SuggestProgressModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            total: 0,
            skipped: 0,
            isVisible: false,
            threads: [],
        };
    }

    show(data) {
        let threads = [];

        for (let i = 0; i < data.threads; ++i) {
            threads.push({count: 0, total: 0, skipped: 0});
        }

        this.closeCallback = data.closeCallback;

        this.setState({
            count: 0,
            total: 0,
            skipped: 0,
            isVisible: true,
            threads: threads,
            started: performance.now(),
        });
    }

    hide() {
        this.setState({isVisible: false});
    }

    handleClose() {
        this.closeCallback();
        this.hide();
    }

    updateProgress(data) {
        let count = 0;
        let total = 0;
        let skipped = 0;

        let threads = [];
        for (let item of data.workers) {
            count += item.count || 0;
            total += item.total || 0;
            skipped += item.skipped || 0;

            threads.push({
                count: item.count || 0,
                total: item.total || 0,
                skipped: item.skipped || 0,
            });
        }

        this.setState({
            count: count,
            total: total,
            skipped: skipped,
            threads: threads,
        });
    }

    render() {
        let threads = [];

        for (let data of this.state.threads) {
            let content;
            let threadId = threads.length;

            if (data.total) {
                content = <ProgressBar addClass="small" count={data.count} total={data.total} />
            } else {
                content = <div className="loading">{lang.get('artifacts_suggest.thread_loading')}</div>
            }

            threads.push(<div key={'item'+ threadId} className="thread">{content}</div>);
        }

        return (
            <DialogContainer
                addClass="artifact-progress-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.suggest_artifact')}
            >
                <ProgressBar count={this.state.count} total={this.state.total} />
                <ElapsedTime started={this.state.started} />
                {this.state.threads.length > 1 ?
                <>
                    <div className="info-line rem">{lang.get('artifacts_suggest.threads_info')}</div>
                    {threads}
                </> : ''}

                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-cancel"
                        title={lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        );
    }
}


function ElapsedTime(props) {
    return (
        <div className="info-line">
            <span className="rem">{lang.get('artifacts_suggest.elapsed_time')}</span> {formatSeconds(performance.now() - props.started)}
        </div>
    );
}

function formatSeconds(sec) {
    sec = Math.floor(sec / 1000) || 0;
    let parts = [];

    while (sec >= 60) {
        let number = sec % 60;
        sec = Math.floor(sec / 60);

        parts.push(number);
    }

    parts.push(sec);
    parts = parts.reverse();

    while (parts.length < 2) {
        parts.unshift(0);
    }

    return parts.map((i) => {return String(i).padStart(2, '0')}).join(':');
}
