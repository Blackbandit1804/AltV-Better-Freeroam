import * as alt from "alt";

var minutestotimeout = 10;
var playerticks = minutestotimeout * 60;

alt.on('playerConnect', setupidle);

function resetstate(){
    playerticks = minutestotimeout * 60;
};

function setupidle(player){
	alt.setInterval(()=> {
		var positionx1 = player.pos.x;
		var positiony1 = player.pos.y;
		alt.setTimeout(() => {
			var positionx2 = player.pos.x;
			var positiony2 = player.pos.y;
			if(positionx1 != positionx2 | positiony1 != positiony2){
				resetstate();
			}
		}, playerticks * 1000 / 4);
	}, playerticks * 1000 / 2), 0;
	
	alt.setInterval(()=> {
		playerticks -= playerticks / 2;
		if(playerticks<=0){
			alt.emit('GlobalSystems:KickPlayer', player, "Idle Kick");
			console.log("[IdleKick] Kicking Player " + player.name);
			alt.clearInterval(0);
			alt.clearInterval(1);
		}
	}, playerticks * 1000 / 2), 1;
};

function killidle(){
	alt.clearInterval(0);
	alt.clearInterval(1);
};

alt.on('playerDisconnect', killidle);