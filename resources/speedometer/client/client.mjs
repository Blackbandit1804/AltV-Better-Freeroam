import * as alt from "alt";
import * as native from "natives";
let electric = [2445973230, 1560980623, 1147287684, 3164157193, 2400073108, 544021352, 2672523198, 1031562256, 1392481335, 2765724541],
	handbrakeActive = !1;
alt.on("keydown", e =>
{
	if (32 === e && (handbrakeActive = !0), 35 === e)
	{
		let e = alt.Player.local.vehicle;
		if (e)
		{
			native.getIsVehicleEngineRunning(e.scriptID) ? native.setVehicleEngineOn(e.scriptID, !1, !0, !0) : native.setVehicleEngineOn(e.scriptID, !0, !0, !0)
		}
	}
}), alt.on("keyup", e =>
{
	32 === e && (handbrakeActive = !1)
});
let webView = null,
	fuelPercentage = 80;
alt.everyTick(() =>
{
	let e = alt.Player.local.vehicle;
	if (e)
		if (webView)
		{
			let t = native.getVehicleLightsState(e.scriptID, !1, !1),
				i = 0;
			t[1] && !t[2] && (i = 1), t[1] && t[2] && (i = 2), webView.emit("speedometer:data",
			{
				gear: parseInt(e.gear),
				rpm: parseInt((1e4 * e.rpm).toFixed(0)),
				speed: parseInt((3.6 * native.getEntitySpeed(e.scriptID)).toFixed(0)),
				isElectric: electric.includes(e.model),
				isEngineRunning: native.getIsVehicleEngineRunning(e.scriptID),
				isVehicleOnAllWheels: native.isVehicleOnAllWheels(e.scriptID),
				handbrakeActive: handbrakeActive,
				lightState: i,
				fuelPercentage: fuelPercentage
			})
		}
	else(webView = new alt.WebView("http://resource/client/html/speedometer.html")).focus();
	else webView && (webView.destroy(), webView = null)
});