import React from 'react'
import ReactDOM from 'react-dom';

import "../../../../css/Components/Dialog/Container.css"

export class DialogContainer extends React.Component {
    render() {
        return (
            <Modal
                width={this.props.width}
                height={this.props.height}
                maxHeight={this.props.maxHeight}
                isVisible={this.props.isVisible}
                addClass={this.props.addClass}
            >
                <div className="dialog-border">
                    <div className="dialog-corner top-left"></div>
                    <div className="dialog-corner top-right"></div>
                    <div className="dialog-corner bottom-left"></div>
                    <div className="dialog-corner bottom-right"></div>
                </div>
                <div className="dialog-wrapper">
                    <div className="dialog-caption">
                        <span className="dialog-caption-text">{this.props.title}</span>
                        {this.props.closeCallback ? <div className="dialog-close" onClick={this.props.closeCallback}></div> : ''}
                    </div>
                    <div className="dialog-content">
                        {this.props.children}
                    </div>
                </div>

            </Modal>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            top: 0,
            width: props.width,
        };

        this.resizeCallback = () => this.resizeModal();
    }

    resizeModal() {
        let left = 6;
        let top = 6;
        let width = 0;
        let windowHeight = UI.Layout.windowHeight();
        let modalHeight  = this.props.height || this.el.clientHeight;
        let useMaxHeight = this.props.maxHeight || modalHeight + 90 > windowHeight;

        if (!UI.Layout.isMobile()) {
            let windowWidth  = UI.Layout.windowWidth();
            let modalWidth   = this.el.clientWidth;

            left = Math.max(6, (windowWidth - modalWidth) / 2);
            top = Math.max(6, (windowHeight - modalHeight) / 2);

            width = this.props.width;
        }

        if (useMaxHeight) {
            this.el.querySelector('.dialog-wrapper').style.height = (windowHeight - 90) +'px';
            this.el.style.top = null;
        } else {
            this.el.style.top = top +'px';
        }

        this.el.style.left = left +'px';
        this.el.style.width = width ? width +'px' : null;
        this.el.classList.toggle('max-height', useMaxHeight)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeCallback);
        this.resizeModal();
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCallback);
    };

    componentDidUpdate() {
        this.resizeModal();
        setTimeout(() => {this.resizeModal()}, 1);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isVisible || nextProps.isVisible;
    }

    dialogNode() {
        let hiddenClass = this.props.isVisible ? '' : ' hidden';
        let classPart = hiddenClass + (this.props.addClass ? ' '+ this.props.addClass : '');
        return (
            <>
                <div ref={el => this.el = el} className={'dialog' + classPart}>
                    {this.props.children}
                </div>
                <div className={'dialog-back' + classPart}/>
            </>
        );
    }

    render() {
        return ReactDOM.createPortal(
            this.dialogNode(),
            document.body,
        );
    }
}

