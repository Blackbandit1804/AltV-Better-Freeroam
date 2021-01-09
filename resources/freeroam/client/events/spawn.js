import * as alt from 'alt';
import * as native from "natives";

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

function handledeath() {
    switchInOutPlayer(false, 0, 2);
    native.clearPedBloodDamage(alt.Player.local.scriptID);
    alt.setTimeout(() => {
        switchInOutPlayer(true);
    }, 1000);
};

alt.onServer("freeroam:freeze", (state) => freeze(state));
alt.onServer("freeroam:handledeath", handledeath);
