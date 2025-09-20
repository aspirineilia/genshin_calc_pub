import React from 'react';
import "../../../css/Components/Tab.css"

export function ReactTab(props) {
    return (
        <React.StrictMode>
            <TabRoot>
                <TabHeader
                    title={props.title}
                    backButton={props.backButton}
                    backButtonCallback={props.backButtonCallback}
                />
                <TabContent>
                    {props.children}
                </TabContent>
            </TabRoot>
        </React.StrictMode>
    )
}

function TabRoot(props) {
    return (
        <div className="react-tab">
            {props.children}
        </div>
    );
}

function TabHeader(props) {
    return (
        <div className="tab-header">
            {props.backButton ? <div className="gi-tab-button-back" onClick={props.backButtonCallback}></div> : ''}
            {props.title}
        </div>
    )
}

function TabContent(props) {
    return (
        <div className="tab-content">
            {props.children}
        </div>
    )
}

export function TabDisclaimer(props) {
    return (
        <div className="tab-disclaimer">
            {props.children}
        </div>
    )
}

export class TabLoading extends React.Component {
    preventDefault(e) {
        e.preventDefault();
        e.returnValue = false;
    }

    enableScroll() {
        document.removeEventListener('wheel', this.preventDefault, false);
    }

    disableScroll() {
        document.addEventListener('wheel', this.preventDefault, {
            passive: false,
        });
    }

    componentWillUnmount() {
        this.enableScroll();
    }

    render() {
        return (
            <div
                className="tab-loading"
                onMouseEnter={(e) => this.disableScroll(e)}
                onMouseLeave={(e) => this.enableScroll(e)}
            >
                <div className="text">{this.props.children}</div>
            </div>
        )
    }
}
