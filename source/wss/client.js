import * as alt from 'alt';

let loaded = false;
let opened = false;

const view = new alt.WebView('http://resource/html/index.html');

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

view.on('ready', () => {
    loaded = true;
});

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('select', (weapon) => {
    alt.emitServer("playerGiveWeapon", weapon)
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