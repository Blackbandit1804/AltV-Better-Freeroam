import * as alt from 'alt';
import * as constant from '../constants.mjs';

let ipls,
    blip,
    currentDate,
    year,
    month,
    date,
    hour,
    minute,
    second;

function resourcestart() {
    ipls = constant.ipls;
    blip = constant.blip;
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
alt.onClient("getcurrentdate", pushdate);
alt.on('resourceStart', resourcestart);