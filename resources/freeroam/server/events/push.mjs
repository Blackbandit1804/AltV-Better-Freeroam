import * as alt from 'alt';
import * as constant from '../constants.mjs';

const ipls = constant.ipls,
    blip = constant.blip,
    doors = constant.doors,
    props = constant.props;

const timeoffset = 1;

function pushblips(player) {
    alt.emitClient(player, "freeroam:setupblips", (blip));
};

function pushipls(player) {
    alt.emitClient(player, "freeroam:Interiors", (ipls));
};

function pushdoors(player) {
    alt.emitClient(player, "freeroam:loaddoors", (doors));
};

function pushprops(player) {
    alt.emitClient(player, "freeroam:proploader", (props));
};

function pushdate(player) {
    let currentDate = new Date();
    player.setDateTime(currentDate.getUTCDate(), currentDate.getUTCMonth(), currentDate.getUTCFullYear(), (currentDate.getUTCHours() + timeoffset), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
};

alt.onClient("getblips", pushblips);
alt.onClient("getipls", pushipls);
alt.onClient("getdoors", pushdoors);
alt.onClient("getcurrentdate", pushdate);
alt.onClient("getprops", pushprops);