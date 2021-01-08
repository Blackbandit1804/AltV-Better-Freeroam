import * as alt from 'alt';
import * as constant from '../constants.mjs';

let ipls = constant.ipls,
    blip = constant.blip;

function pushblips(player) {
    alt.emitClient(player, "freeroam:setupblips", (blip));
};

function pushipls(player) {
    alt.emitClient(player, "freeroam:Interiors", (ipls));
};

function pushdate(player) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
    player.setDateTime(date, month, year, hour, minute, second);
};

alt.onClient("getblips", pushblips);
alt.onClient("getipls", pushipls);
alt.onClient("getcurrentdate", pushdate);