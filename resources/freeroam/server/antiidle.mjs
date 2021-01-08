import * as alt from "alt";

alt.onClient("kickme", (player) => {
	alt.emit('GlobalSystems:KickPlayer', player, "Idle Kick");
	console.log("[IdleKick] Kicking Player " + player.name);
});