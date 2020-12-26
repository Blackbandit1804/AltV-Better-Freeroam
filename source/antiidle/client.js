import * as alt from "alt";

var minutestotimeout = 10;

const player = alt.Player.local;
var playerticks = minutestotimeout * 60;

function resetstate(){
    playerticks = minutestotimeout * 60;
};

alt.onServer('resetstate', ()=>{ resetstate(); });

alt.on('keydown', (key) => { resetstate(); });

alt.on('keyup', (key) => { resetstate(); });

alt.setInterval(()=> {
    var positionx1 = player.pos.x;
    var positiony1 = player.pos.y;
    alt.setTimeout(() => {
        var positionx2 = player.pos.x;
        var positiony2 = player.pos.y;
        if(positionx1 != positionx2 | positiony1 != positiony2){
            resetstate();
        }
    }, 25000);
}, 30000), 0;



alt.setInterval(()=> {
    playerticks -= 60;
    if(playerticks<=0){
        alt.emitServer("kickme", player)
    }
}, 60000), 1;

alt.on('disconnect', () => { alt.clearInterval(0), alt.clearInterval(1) })