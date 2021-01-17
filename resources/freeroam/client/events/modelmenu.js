import * as alt from "alt";

let loaded = !1,
    opened = !1;
const player = alt.Player.local;
const view = new alt.WebView("http://resource/client/events/html/models/index.html");
loaded = true;

function menu(e) {
    opened = e, alt.showCursor(e), alt.toggleGameControls(!e), e ? view.focus() : view.unfocus(), view.emit("menu", e)
}

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('select', (model) => {
	alt.emitServer("changemodel", model)
    menu(false);
    alt.emit('drawNotification', 'CHAR_BLANK_ENTRY', 'Notification', player.name, 'Your new Playermodel: ' + model, 40);
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

alt.log('Loaded: ./events/modelmenu.js');