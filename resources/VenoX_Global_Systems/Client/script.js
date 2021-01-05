import alt from 'alt-client';
import * as game from "natives";

let localplayer = alt.Player.local;
let kicked = false;

alt.log("VnXGlobalSystemsClient:Loaded");

alt.onServer("VnXGlobalSystemsClient:SetPedCanRagdoll", (bool) => {
	try { game.setPedCanRagdoll(localplayer.scriptID, bool); }
	catch{ }
});
alt.onServer("VnXGlobalSystemsClient:SetProofs", () => {
	try { game.setEntityProofs(localplayer.scriptID, true, false, false, false, false, false, false, false); }
	catch{ }
});
alt.onServer('VnXGlobalSystemsClient:Kick', (reason) => {
	try {
		if (kicked) return;
		alt.log("~b~~c~------------------------------------");
		alt.log("~r~--------        Kicked by VenoX Global Systems!        -------");
		alt.log("~b~~c~------------------------------------");
		alt.emitServer('VnXGlobalSystems:KickPlayer');
		kicked = true;
	}
	catch{ }
});
alt.setInterval(function(){
	alt.emitServer("VnXGlobalSystems:OnTickCall");
}, 10000);