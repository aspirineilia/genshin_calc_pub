import ReactDOM from 'react-dom/client'
import { waitForCondition } from '../Utils';

export class NonAppModal {
    constructor() {
        this.initialized = 0;
    }

    init() {
        if (this.initialized) {
            return;
        }

        let root = document.createElement('div');
        let container = ReactDOM.createRoot(root);
        let component = this.createContent();
        container.render(component);

        this.initialized = true;
    }

    show() {
        if (!this.initialized) {
            this.init();
        }

        waitForCondition(
            () => {return this.modal},
            () => {this.modal.show(...arguments)},
        );
    }
}

export class Modal extends NonAppModal {
    init(app) {
        this.app = app;
        super.init();
    }
}
