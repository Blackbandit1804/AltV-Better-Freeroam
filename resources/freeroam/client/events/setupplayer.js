import * as alt from 'alt';
import * as native from 'natives';
import { createblip } from './functions.js';

const player = alt.Player.local;

function setambientzone() {
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
    native.pauseClock(false);
    alt.setMsPerGameMinute(60000);
    native.setPlayerTargetingMode(2);
    native.setWeatherTypePersist("EXTRASUNNY");
};

function setupblips(blip) {
    blip.forEach(element => {
        createblip(new alt.Vector3(element["x"], element["y"], element["z"]), element["blip"], element["state"], element["string"]);
    });
    new alt.PointBlip(6500, -6500, 20).alpha = 0;
};

function playerstats() {
    //set Infinite Oxygen
    let ped = native.playerPedId();
    native.setPedMaxTimeUnderwater(ped, 9999999980506448000.0);
    native.setRunSprintMultiplierForPlayer(player, 1.05);
};

function getdata() {
    native.pauseClock(false);
    alt.emitServer('getblips');
    alt.emitServer('getipls');
    alt.emitServer('getcurrentdate');
};

alt.onServer("freeroam:playerstats", playerstats);
alt.onServer("freeroam:setupblips", setupblips);
alt.on('connectionComplete', () => {
    getdata(); 
    setambientzone();
});