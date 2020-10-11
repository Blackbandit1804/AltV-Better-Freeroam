import * as alt from "alt-client";
import * as native from "natives";
let currentWeather, oldWeather = "SUNNY";

function setWeather(e, t) {
    if (currentWeather = e, 0 === t) native.setWeatherTypeNowPersist(e);
    else {
        if (oldWeather != currentWeather) {
            let e = 0,
                a = alt.setInterval(() => {
                    ++e < 100 ? native.setWeatherTypeTransition(native.getHashKey(oldWeather), native.getHashKey(currentWeather), e / 100) : (alt.clearInterval(a), oldWeather = currentWeather)
                }, 10 * t)
        }
        "XMAS" === e ? (native.setForceVehicleTrails(!0), native.setForcePedFootstepsTracks(!0)) : (native.setForceVehicleTrails(!1), native.setForcePedFootstepsTracks(!1))
    }
}

function setTime(e, t) {
    native.getClockHours();
    let a = native.getClockMinutes();
    native.getClockSeconds();
    e.minute - a > 10 && (alt.log("[AWTS] Time is not the same, updating..."), native.setClockTime(e.hour, e.minute, e.second)), t != alt.getMsPerGameMinute() && alt.setMsPerGameMinute(t)
}
alt.onServer("syncWeather", setWeather);
alt.onServer("syncTime", setTime);