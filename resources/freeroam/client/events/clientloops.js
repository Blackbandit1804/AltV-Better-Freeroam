import * as alt from 'alt';
import * as native from "natives";

let player = alt.Player.local;

const radar = async() => {
    await native.setRadarAsExteriorThisFrame();
    native.setRadarAsInteriorThisFrame(alt.hash("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);
};

const resetstats = async() => {
    native.resetPlayerStamina(player.scriptID);
};

const idlecam = async() => {
    native.invalidateIdleCam();
    native._0x9E4CFFF989258472();
};

let electric = [
    2445973230,// neon
    1560980623,// airtug
    1147287684,// caddy
	3757070668,// caddy2
	3525819835,// caddy3
    3164157193,// dilettante
    2400073108,// surge
    544021352,// khamelion 
    2672523198,// voltic
	989294410,// voltic2
	4008920556,// rcbandito
	3162245632,// imorgon
	3040635986,// minitank
    1031562256,// tezeract
    1392481335,// cyclone
    2765724541// raiden
    ],
    view = new alt.WebView('http://resource/client/events/html/speedometer/speedometer.html');

const speedometer = async() => {
    let vehicle = alt.Player.local.vehicle;
    if (vehicle) {
        view.emit('status', true);
        view.emit('speedometer:data', {
            gear: parseInt(vehicle.gear),
            rpm: parseInt((vehicle.rpm * 10000).toFixed(0)),
            speed: parseInt((native.getEntitySpeed(vehicle.scriptID) * 2.23693).toFixed(0)),
            isElectric: electric.includes(vehicle.model)
        });
    } else {
        view.emit('status', false);
    };
};

export let radarinterval = alt.setInterval(radar, 1);
export let resetstatsinterval = alt.setInterval(resetstats, 1);
export let idlecaminterval = alt.setInterval(idlecam, 25000);
export let checkInterval = alt.setInterval(speedometer, 25);