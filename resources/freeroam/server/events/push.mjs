import * as alt from 'alt';
import * as constant from '../constants.mjs';

const timeoffset = 0;

function pushdate(player) {
    let currentDate = new Date();
    player.setDateTime(currentDate.getUTCDate(), currentDate.getUTCMonth(), currentDate.getUTCFullYear(), (currentDate.getUTCHours() + timeoffset), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
};

alt.onClient("getblips", (player) => alt.emitClient(player, "freeroam:setupblips", (constant.blip)));
alt.onClient("getipls", (player) => alt.emitClient(player, "freeroam:Interiors", (constant.ipls)));
alt.onClient("getdoors", (player) => alt.emitClient(player, "freeroam:loaddoors", (constant.doors)));
alt.onClient("getcurrentdate", pushdate);
alt.onClient("getprops", (player) => alt.emitClient(player, "freeroam:proploader", (constant.props)));