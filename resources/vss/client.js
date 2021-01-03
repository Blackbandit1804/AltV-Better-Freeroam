import * as alt from 'alt';
import * as native from 'natives';

let loaded = !1,
    opened = !1;
let player = alt.Player.local;

const view = new alt.WebView('http://resource/html/index.html');
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

view.on('select', (model) => {
    alt.emitServer('playerSpawnVehicle', model, player.pos, player.rot);
	menu(false);
});

alt.on('keyup', (key) => {
    if (!loaded) return;
    if (key === 0x71) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

alt.on('disconnect', () => { view.destroy() })

alt.onServer("setPedIntoVehicle", (vehicle) => {
    let cleared = false;
    const interval = alt.setInterval(() => {
        const vehicleScriptId = vehicle.scriptID;
        if (vehicleScriptId) {
            native.setPedIntoVehicle(player.scriptID, vehicleScriptId, -1);
            alt.clearInterval(interval);
            cleared = true;
        }
    }, 10);
    alt.setTimeout(() => {
        if (!cleared) {
            alt.clearInterval(interval);
        }
    }, 5000);
});