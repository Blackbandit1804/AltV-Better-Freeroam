import * as alt from 'alt';
import * as native from "natives";
import * as functions from './functions.js';

const player = alt.Player.local;

function radar() {
    native.setRadarAsExteriorThisFrame();
    native.setRadarAsInteriorThisFrame(alt.hash("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);
};

function resetstats() {
    native.resetPlayerStamina(player.scriptID);
};

function idlecam() {
    native.invalidateIdleCam();
    native._0x9E4CFFF989258472();
};

function checkislandstate() {
    if(functions.checkisland() == true) {
        //disable Waves
        native.setDeepOceanScaler(0.0);
    } else {
        native.setDeepOceanScaler(1.0);
    };
};

const electric = [
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

function speedometer() {
    let vehicle = alt.Player.local.vehicle;
    if (vehicle != null) {
        view.emit('speedometer:data', {enabled: true, gear: parseInt(vehicle.gear), rpm: parseInt((vehicle.rpm * 10000).toFixed(0)), speed: parseInt((native.getEntitySpeed(vehicle.scriptID) * 2.23693).toFixed(0)), isElectric: electric.includes(vehicle.model)});
    } else {
        view.emit('speedometer:data', {enabled: false});
    };
};

let radarinterval = alt.setInterval(radar, 1);
let resetstatsinterval = alt.setInterval(resetstats, 1);
let idlecaminterval = alt.setInterval(idlecam, 25000);
let checkInterval = alt.setInterval(speedometer, 25);
let islandinterval = alt.setInterval(checkislandstate, 10000);

function disconnect() {
    alt.clearInterval(radarinterval);
    alt.clearInterval(resetstatsinterval);
    alt.clearInterval(idlecaminterval);
    alt.clearInterval(checkInterval);
    alt.clearInterval(islandinterval);
};

alt.on('disconnect', disconnect);

alt.log('Loaded: ./events/clientloops.js');