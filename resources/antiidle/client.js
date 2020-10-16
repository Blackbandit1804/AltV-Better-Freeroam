import * as alt from "alt";

const player = alt.Player.local;

var playerticks = 30000;

alt.on('keydown', (key) => {
    playerticks = 30000;
});

alt.on('keyup', (key) => {
    playerticks = 30000;
});

alt.everyTick(() => {
    playerticks -= 1;
    if(playerticks<0){
        alt.emitServer("kickme", player)
    }
});