import { App } from "./classes/App.js"
// import "./ui.js"

document.addEventListener("DOMContentLoaded", function() {
    let app = new App(__VERSION__);

    UI.Layout.init(app);
    UI.Layout.refresh();
    app.checkHash();
    app.refresh();
    app.initSync();
});
