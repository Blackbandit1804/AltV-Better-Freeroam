import * as alt from 'alt';
import * as native from "natives";
import { loadipl, doorcontrol, proploader } from './functions.js';

function Interiors(ipls){
    ipls.forEach(element => {
        loadipl(element);
    });

    native.refreshInterior(274689)

    for(var i = 0; i <= 15; i++){
        native.setMinimapComponent(i, true, -1);
    };
};

function loaddoors(doors) {
    doors.forEach(element => {
        doorcontrol(element);
    });
};

function propload(props) {
    props.forEach(element => {
        proploader(element);
    });
};

alt.onServer("freeroam:proploader", propload);
alt.onServer("freeroam:loaddoors", loaddoors);
alt.onServer("freeroam:Interiors", Interiors);