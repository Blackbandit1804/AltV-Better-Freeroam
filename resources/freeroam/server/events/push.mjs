import * as alt from 'alt';
import * as constant from '../constants.mjs';

const timeoffset = 0;

function pushblips(player) {
    alt.emitClient(player, "freeroam:setupblips", (constant.blip));
};

function pushipls(player) {
    alt.emitClient(player, "freeroam:Interiors", (constant.ipls));
};

function pushdoors(player) {
    alt.emitClient(player, "freeroam:loaddoors", (constant.doors));
};

function pushprops(player) {
    alt.emitClient(player, "freeroam:proploader", (constant.props));
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