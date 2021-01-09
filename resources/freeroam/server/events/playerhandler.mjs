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
        chat.broadcast(`{1cacd4}${player.name} {ffffff}has {00ff00}joined {ffffff}the Server..  (${alt.Player.all.length} players online)`);
		chat.send(player, "{80eb34}Press {34dfeb}T {80eb34}and type {34dfeb}/help {80eb34}to see all available commands..");
		chat.send(player, "{34dfeb}F1 {80eb34}Weapon Menu | {34dfeb}F2 {80eb34}Car Spawner | {34dfeb}F3 {80eb34}Model Changer");
    };
};

function playerdeath(player) {
    alt.emit('sethandledeath', player);
	spawnplayer(player);
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
};

function playerdisconnect(player, reason) {
    chat.broadcast(`{1cacd4}${player.name} {ffffff}has {ff0000}left {ffffff}the Server.. (${alt.Player.all.length -= 1} players online)`);
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