import*as alt from"alt";

alt.onClient("kickme",(player)=>{
	player.kick("Idle Kick");
	console.log("[IdleKick] Kicking Player " + player)
});