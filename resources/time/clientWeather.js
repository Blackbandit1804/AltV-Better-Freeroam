import * as alt from 'alt';
import * as game from 'natives';

alt.on('connectionComplete', ()=>{
    game.pauseClock(true);
});
