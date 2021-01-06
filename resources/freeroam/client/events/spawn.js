import * as alt from 'alt';
import * as native from "natives";

let player = alt.Player.local;

function spawned() {
    native.setPedDefaultComponentVariation(player);
    native.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE"); // Used to stop police sound in town
    native.cancelCurrentPoliceReport(); // Used to stop default police radio around/In police vehicle
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", 1, 0); // Turn off prison sound
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", 1, 0); // Turn off prison sound
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", 1, 0); // Turn off prison sound
    native.setAmbientZoneState(0, 0, 0); // Set ambiant sound to 0,0,0
    native.clearAmbientZoneState("AZ_DISTANT_SASQUATCH", 0, 0);
    native.setAudioFlag("LoadMPData", true);
    native.setAudioFlag("DisableFlightMusic", true);
};

function clearPedBloodDamage() {
    native.clearPedBloodDamage(alt.Player.local.scriptID);
};

function switchInOutPlayer(in_switch, instant_switch, switch_type) {
    if(in_switch){
        native.switchInPlayer(alt.Player.local.scriptID);
    }else{
        native.switchOutPlayer(alt.Player.local.scriptID, instant_switch, switch_type);
    }
};

function freeze(state){
    native.freezeEntityPosition(alt.Player.local.scriptID, state);
};

alt.onServer("freeroam:freeze", (state) => freeze(state));
alt.onServer("freeroam:clearPedBloodDamage", clearPedBloodDamage);
alt.onServer("freeroam:switchInOutPlayer", (in_switch, instant_switch, switch_type) => switchInOutPlayer(in_switch, instant_switch, switch_type));
alt.on("connectionComplete", spawned);