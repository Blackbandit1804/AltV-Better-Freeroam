import * as alt from 'alt';
import * as native from "natives";

export function createblip(pos, id, customnamestate, label) {
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

export function checkisland() {
	let distance = alt.Player.local.pos.distanceTo(new alt.Vector3(4840.571, -5174.425, 2.0));
    if(distance < 2500) {
        return true;
    } else {
        return false;
    }
};

export function loadipl(element) {
    if (element["status"] == 0){
        native.requestIpl(element["ipl"]);
    } else {
        native.removeIpl(element["ipl"]);
    }
};

export default {
    createblip,
    checkisland,
    loadipl
};