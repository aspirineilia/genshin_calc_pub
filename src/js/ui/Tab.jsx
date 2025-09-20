import $ from "jquery";
import ReactDOM from 'react-dom/client'

import "../../css/ui/Tab.css"

export class Tab {
    constructor() {
        this.initialized = 0;
    }

    init(app) {
        this.app = app;

        if (this.initialized) {
            return;
        }

        if (this.rightRab) {
            UI.Layout.addRightTab(this.id, 'gi-'+ this.id +'-tab', 'gi-'+ this.id +'-container');
        } else {
            UI.Layout.addLeftTab(this.id, 'gi-'+ this.id +'-tab', 'gi-'+ this.id +'-container');
        }

        this.root = $('.gi-'+ this.id +'-container');
        this.bindEvents();
        this.initialized = 1;

        let root = document.querySelector('.gi-'+ this.id +'-container');
        let container = ReactDOM.createRoot(root)
        let component = this.createContent();
        container.render(component);
        setTimeout(() => this.refresh(), 1);
    }

    bindEvents() {
        this.root.on('tab_active', () => {this.refresh()});
    }
}
