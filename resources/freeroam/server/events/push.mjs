import * as alt from 'alt';
import * as constant from '../constants.mjs';

const ipls = constant.ipls,
    blip = constant.blip,
    doors = constant.doors,
    props = constant.props;
let currentDate,
    year,
    month,
    date,
    hour,
    minute,
    second;

function resourcestart() {
    currentDate = new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    date = currentDate.getDate();
    hour = currentDate.getHours();
    minute = currentDate.getMinutes();
    second = currentDate.getSeconds();
};

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
    currentDate = new Date();
    date = currentDate.getDate();
    hour = currentDate.getHours();
    minute = currentDate.getMinutes();
    second = currentDate.getSeconds();
    //alt.log(date, month, year, hour, minute, second);
    player.setDateTime(date, month, year, hour, minute, second);
};

alt.onClient("getblips", pushblips);
alt.onClient("getipls", pushipls);
alt.onClient("getdoors", pushdoors);
alt.onClient("getcurrentdate", pushdate);
alt.onClient("getprops", pushprops);
alt.on('resourceStart', resourcestart);