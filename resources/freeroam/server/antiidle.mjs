import * as alt from "alt";

let intervalkick;
let intervalcheck;
let intervalcheck2;

export function setupidle(player){
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

	var minutestotimeout = 10;
	const playerticksdefined = minutestotimeout * 60;
	var playerticks = minutestotimeout * 60;

	var positionx1 = getcords(player, "x");;
	var positiony1 = getcords(player, "y");;

	intervalcheck = alt.setInterval(()=> {
		positionx1 = getcords(player, "x");
		positiony1 = getcords(player, "y");
	}, playerticksdefined * 100 / 2);

	intervalcheck2 = alt.setInterval(() => {
		let positionx2 = getcords(player, "x");
		let positiony2 = getcords(player, "y");
		if(positionx1 != positionx2 | positiony1 != positiony2){
			playerticks = minutestotimeout * 60;
		}
	}, playerticksdefined * 100 / 3);
	
	intervalkick = alt.setInterval(()=> {
		playerticks -= playerticksdefined / 10;
		if(playerticks<=0){
			alt.emit('GlobalSystems:KickPlayer', player, "Idle Kick");
		}
	}, playerticksdefined * 100);
};

export function disconnectidle(){
    alt.clearInterval(intervalcheck);
    alt.clearInterval(intervalcheck2);
    alt.clearInterval(intervalkick);
};

export default {
    setupidle,
    disconnectidle
};