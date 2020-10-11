import * as alt from "alt-server";
let currentWeather = "SUNNY";
const weathers = ["EXTRASUNNY", "CLEAR", "SMOG", "FOGGY", "OVERCAST", "CLOUDS", "RAIN", "THUNDER"];
let time = {
        hour: 6,
        minute: 0,
        second: 0
    },
    msperminute = 1e3;
alt.on("GlobalSystems:PlayerReady", e => {
    setTimeout(() => {
        alt.emitClient(e, "syncWeather", currentWeather, 0), alt.emitClient(e, "syncTime", time, msperminute)
    }, 5e3)
}), alt.on("changeCurrentWeather", changeCurrentWeather), alt.on("changeCurrentTime", changeCurrentTime);
export function changeCurrentWeather(e, t) {
    currentWeather = e, console.log(`[AWTS] Changed weather to ${e}`), alt.Player.all.forEach(e => {
        alt.emitClient(e, "syncWeather", currentWeather, t)
    })
}
export function changeCurrentTime(e, t, n) {
    time.hour = e, time.minute = t, time.second = n, console.log(`[AWTS] Changed time to ${e}:${t}:${n}`), alt.Player.all.forEach(e => {
        alt.emitClient(e, "syncTime", time, msperminute)
    })
}

function randomInt(e) {
    return Math.floor(Math.random() * e)
}
setInterval(() => {
    changeCurrentWeather(weathers[randomInt(weathers.length)], 30)
}, 6e5), setInterval(() => {
    console.log("[AWTS] Syncing time..."), alt.Player.all.forEach(e => {
        alt.emitClient(e, "syncTime", time, msperminute)
    })
}, 12e4), setInterval(() => {
    time.minute + 1 < 60 ? time.minute++ : (time.minute = 0, time.hour++, time.second = 0)
}, msperminute);