import * as alt from 'alt';
import chat from '../chat.mjs';
import * as constant from '../constants.mjs';
import functions from './functions.mjs';

function playerready(player) {
    let spawnModels = functions.shuffle(constant.spawnModels);
    player.vehicles = [];
	player.model = spawnModels[functions.getRandomListEntry(spawnModels)];
    spawnplayer(player);
    if(player !== undefined){
        chat.broadcast(`${player.name} has joined the Server..  (${alt.Player.all.length} players online)`);
		chat.send(player, "F1 Weapon Menu | F2 Car Spawner | F3 Model Changer");
    };
    alt.emitClient(player, 'showHelpText', 'F1=Weapon Menu | F2=Car Spawner | F3=Model Changer', 10000);
};

function playerdeath(player) {
    alt.emit('sethandledeath', player);
    spawnplayer(player);
    chat.broadcast(`${player.name} has Died.`);
};

function spawnplayer(player) {
    let spawns = functions.shuffle(constant.spawns);
    alt.emit('setplayerfreezestate', player, true);
	let spawn = spawns[functions.getRandomListEntry(spawns)];
    player.spawn(spawn.x, spawn.y, spawn.z, 1);
    alt.emit('setplayerstats', player);
	player.health = 200;
	player.armour = 100;
	alt.emit('playerrequestWeapon', player, 'gadget_parachute', 1, false);
	alt.setTimeout(() => {
        alt.emit('setplayerfreezestate', player, false);
    }, 1000);
};

function playerGiveWeapon(player, name, ammo, equiped) {
    player.giveWeapon(alt.hash(name), ammo, equiped);
};

function playerSpawnVehicle(player, model, position, rotation) {
    if (player.vehicles.length >= 1) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }
    let vehicle = new alt.Vehicle(model, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    alt.emit('setplayerinvehicle', player, vehicle);
    player.vehicles.push(vehicle);
};

function setplayerinvehicle(player, vehicle) {
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
};

function sethandledeath(player) {
    alt.emitClient(player, "freeroam:handledeath");
};

function setplayerstats(player) {
    alt.emitClient(player, "freeroam:playerstats");
};

function setplayerfreeze(player, state) {
    alt.emitClient(player, "freeroam:freeze", state);
};

function changemodel(player, model) {
    player.model = model;
    player.health = 200;
	player.armour = 100;
};

function playerdisconnect(player, reason) {
    chat.broadcast(`${player.name} has left the Server.. (${alt.Player.all.length -= 1} players online)`);
    alt.log(`${player.name} has leaved the server becauseof ${reason}`);
    player.vehicles.forEach(vehicle => {
        vehicle.destroy();
	});
};

alt.on('playerConnect', playerready);
alt.on('playerDeath', playerdeath);
alt.on('playerDisconnect', playerdisconnect);
alt.on('setplayerfreezestate', (player, state) => setplayerfreeze(player, state));
alt.on('setplayerstats', (player) => setplayerstats(player));
alt.on('sethandledeath', (player) => sethandledeath(player));
alt.on('setplayerinvehicle', (player, vehicle) => setplayerinvehicle(player, vehicle));
alt.on("playerrequestWeapon", (player, name, ammo, equiped) => playerGiveWeapon(player, name, ammo, equiped));
alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => playerSpawnVehicle(player, model, position, rotation));
alt.onClient("playerrequestWeapon", (player, name, ammo, equiped) => alt.emit('playerrequestWeapon', player, name, ammo, equiped));
alt.onClient("changemodel", (player, model) => changemodel(player, model));