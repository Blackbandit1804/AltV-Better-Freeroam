import * as alt from 'alt';

let loaded = !1,
    opened = !1;

const player = alt.Player.local;
const view = new alt.WebView('http://resource/client/events/html/weapons/index.html');
loaded = true;

function menu(toggle) {
    opened = toggle;

    alt.showCursor(toggle);
    alt.toggleGameControls(!toggle);

    if (toggle) {
        view.focus();
    } else {
        view.unfocus();
    }

    view.emit('menu', toggle);
}

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('select', (weapon) => {
    alt.emitServer("playerrequestWeapon", weapon, 1500, false);
    alt.emit('drawNotification', 'CHAR_AMMUNATION', 'Notification', player.name, 'Your new Weapon: ' + weapon);
});

alt.on('keyup', (key) => {
    if (!loaded) return;

    if (key === 0x70) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

alt.on('disconnect', () => {view.destroy()})