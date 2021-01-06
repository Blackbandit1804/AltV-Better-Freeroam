import * as alt from 'alt';
import * as native from "natives";

function createblip(pos, id, customnamestate, label) {
    let blip = native.addBlipForCoord(pos.x, pos.y, pos.z);
    native.setBlipSprite(blip, id);
    native.setBlipAsShortRange(blip, true);
    if (customnamestate == true){
        native.beginTextCommandSetBlipName('STRING');
        native.addTextComponentSubstringPlayerName(label);
        native.endTextCommandSetBlipName(blip);
    }
    else {

    };
};

function setupblips(blip) {
    native.pauseClock(true);
    blip.forEach(element => {
        createblip(new alt.Vector3(element["x"], element["y"], element["z"]), element["blip"], element["state"], element["string"]);
    });
    new alt.PointBlip(6500, -6500, 20).alpha = 0;
};

function playerstats() {
    //set Infinite Oxygen
    let ped = native.playerPedId();
    native.setPedMaxTimeUnderwater(ped, 9999999980506448000.0);
};

function getdata() {
    alt.emitServer('getblips');
    alt.emitServer('getipls');
};

alt.onServer("freeroam:playerstats", playerstats);
alt.onServer("freeroam:setupblips", setupblips);
alt.on("connectionComplete", getdata);