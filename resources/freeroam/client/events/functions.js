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
    if (element["status"] == undefined){
        native.requestIpl(element["ipl"]);
    } else if (element["status"] == 1) {
        native.removeIpl(element["ipl"]);
    }
};

export function doorcontrol(element) {
    native.doorControl(alt.hash(element["name"]), element["posx"], element["posy"], element["posz"], element["lockstate"], element["rotx"], element["roty"], element["rotz"]);
};

export function proploader(element) {
    let interiorID = native.getInteriorAtCoords(element["posx"], element["posy"], element["posz"]);
    if (native.isValidInterior(interiorID)) {
        element["pin"].forEach(element => {
            native.activateInteriorEntitySet(interiorID, element);
        });
        native.refreshInterior(interiorID);
    }
};

export default {
    createblip,
    checkisland,
    loadipl,
    doorcontrol,
    proploader
};

alt.log('Loaded: ./events/functions.js');