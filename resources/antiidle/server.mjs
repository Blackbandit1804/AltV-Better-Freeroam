import * as alt from "alt";

alt.on('playerConnect', setupidle);

function setupidle(player){
	var minutestotimeout = 10;
	let playerticksdefined = minutestotimeout * 60;
	let playerticks = playerticksdefined;

	let positionx1;
	let positiony1;

	function resetstate(){
		playerticks = playerticksdefined;
	};

	function getcords(player, type){
		if (type == "x") {
			let position = player.pos.x;
			return position;
		} else if (type == "y") {
			let position = player.pos.y;
			return position;
		} else {
			return;
		};
	};

	const intervalcheck = alt.setInterval(()=> {
		positionx1 = getcords(player, "x");
		positiony1 = getcords(player, "y");
	}, playerticksdefined * 1000 / 2);

	const intervalcheck2 = alt.setTimeout(() => {
		var positionx2 = getcords(player, "x");
		var positiony2 = getcords(player, "y");
		if(positionx1 != positionx2 | positiony1 != positiony2){
			resetstate();
		};
	}, playerticksdefined * 1000 / 4);
	
	const intervalkick = alt.setInterval(()=> {
		playerticks -= playerticksdefined / 2;
		if(playerticks<=0){
			alt.emit('GlobalSystems:KickPlayer', player, "Idle Kick");
			console.log("[IdleKick] Kicking Player " + player.name);
		}
	}, playerticksdefined * 1000 / 2);

	function disconnect(){
		alt.clearInterval(intervalcheck);
		alt.clearInterval(intervalcheck2);
		alt.clearInterval(intervalkick);
	};
	alt.on('playerDisconnect', disconnect);
};