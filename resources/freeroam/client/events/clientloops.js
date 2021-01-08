import * as alt from 'alt';
import * as native from "natives";
import * as blip from './spawn.js';

const player = alt.Player.local;
var minutestotimeout = 10;
var playerticks = minutestotimeout * 60;
let positioninterval

alt.setMsPerGameMinute(60000);

function resetstate(){
    playerticks = minutestotimeout * 60;
};

function positioncheck() {
    var positionx1 = player.pos.x;
    var positiony1 = player.pos.y;
    positioninterval = alt.setTimeout(() => {
        var positionx2 = player.pos.x;
        var positiony2 = player.pos.y;
        if(positionx1 != positionx2 | positiony1 != positiony2){
            resetstate();
        }
    }, 300000);
    alt.clearInterval(positioninterval);
    kickmecheck();
};

function kickmecheck() {
    playerticks -= 60;
    if(playerticks<=0){
        alt.emitServer("kickme", player);
    }
};

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

function getdate() {
    alt.emitServer('getcurrentdate');
};

let nearIsland = false;

function checkisland() {
	let distance = alt.Player.local.pos.distanceTo(new alt.Vector3(4840.571, -5174.425, 2.0));
    if(distance < 3000) {
        if(!nearIsland)
        {
            nearIsland = true;
            native.setDeepOceanScaler(1.0);
        }
    } else {
        if(nearIsland)
        {
            nearIsland = false;
            //disable Waves
            native.setDeepOceanScaler(0.0);
        }
    }
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

function speedometer() {
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

alt.on("connectionComplete", getdate);
alt.on('keydown', () => { resetstate(); });
alt.on('keyup', () => { resetstate(); });

let radarinterval = alt.setInterval(radar, 1);
let resetstatsinterval = alt.setInterval(resetstats, 1);
let idlecaminterval = alt.setInterval(idlecam, 25000);
let checkInterval = alt.setInterval(speedometer, 25);
let idleinterval = alt.setInterval(positioncheck, 60000);
let timeinterval = alt.setInterval(getdate, 1800000);
let islandinterval = alt.setInterval(checkisland, 10000);

function disconnect() {
    alt.clearInterval(radarinterval);
    alt.clearInterval(resetstatsinterval);
    alt.clearInterval(idlecaminterval);
    alt.clearInterval(checkInterval);
    alt.clearInterval(idleinterval);
    alt.clearInterval(positioninterval);
    alt.clearInterval(timeinterval);
    alt.clearInterval(islandinterval);
};

alt.on('connectionComplete', getdate);
alt.on('disconnect', disconnect);