import * as alt from 'alt';
import * as native from 'natives';

alt.on('connectionComplete', ()=>{
    native.pauseClock(true);
});
