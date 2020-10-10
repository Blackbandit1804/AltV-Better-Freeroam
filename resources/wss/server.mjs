import*as alt from"alt";

const limit=1;


alt.onClient("playerGiveWeapon",(e,a)=>{
	alt.emit('GlobalSystems:GiveWeapon', e, alt.hash(a), 500, !1);
});