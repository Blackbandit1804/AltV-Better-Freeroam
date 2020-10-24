import * as alt from"alt";

alt.onClient("playerGiveWeapon",(e,a)=>{
	alt.emit('GlobalSystems:GiveWeapon', e, alt.hash(a), 500, false);
});