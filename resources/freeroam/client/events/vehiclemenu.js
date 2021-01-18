import * as alt from 'alt';
import * as native from 'natives';

const player = alt.Player.local;
let loaded = !1,
    opened = !1,
    vehicles = [];

const view = new alt.WebView('http://resource/client/events/html/vehicles/index.html');
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
    //custom vehicle colors on: true off: false
    let colorstate = true;
    if (vehicles.length >= 1) {
        vehicles[0].destroy();
        vehicles.splice(0, 1);
    }
    alt.emitServer('playerSpawnVehicle', model, player.pos, player.rot, colorstate);
    menu(false);
    alt.emit('drawNotification', 'CHAR_PEGASUS_DELIVERY', 'Notification', player.name, 'Your new Vehicle: ' + model, 40);
});

alt.on('keyup', (key) => {
    if (!loaded) return;
    if (key === 0x71) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

function setPedIntoVehicle(vehicle) {
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
};

alt.on('disconnect', () => { view.destroy() })
alt.onServer("setPedIntoVehicle", (vehicle) => setPedIntoVehicle(vehicle));

alt.log('Loaded: ./events/vehiclemenu.js');