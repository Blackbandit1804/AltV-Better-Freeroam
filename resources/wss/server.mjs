import*as alt from"alt";

const limit=1;


alt.onClient("playerGiveWeapon",(e,a)=>{
	GiveWeapon( e, alt.hash(a), 500, !1);
});

function GiveWeapon(player, weaponHash, ammo, selectWeapon){
	alt.emit('GlobalSystems:GiveWeapon', player, weaponHash, ammo, selectWeapon);
}