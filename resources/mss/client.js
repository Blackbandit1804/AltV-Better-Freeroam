import * as alt from "alt";

let loaded = !1,
    opened = !1;
const view = new alt.WebView("http://resource/html/index.html");

function menu(e) {
    opened = e, alt.showCursor(e), alt.toggleGameControls(!e), e ? view.focus() : view.unfocus(), view.emit("menu", e)
}

view.on('ready', () => {
    loaded = true;
});

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('select', (model) => {
	alt.emitServer("changemodel", model)
	menu(false);
});

alt.on('keyup', (key) => {
    if (!loaded) return;

    if (key === 0x72) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

alt.on('disconnect', () => {view.destroy()})