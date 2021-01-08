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
    alt.emitClient(player, "freeroam:handledeath");
	spawnplayer(player);
};

function spawnplayer(player) {
    let spawns = functions.shuffle(constant.spawns);
	alt.emitClient(player, "freeroam:freeze", true);
	let spawn = spawns[functions.getRandomListEntry(spawns)];
    player.spawn(spawn.x, spawn.y, spawn.z, 1);
    alt.emitClient(player, "freeroam:playerstats");
	player.health = 200;
	player.armour = 100;
	alt.emit('GlobalSystems:GiveWeapon', player, alt.hash("gadget_parachute"), 1, false);
	alt.setTimeout(() => {
        alt.emitClient(player, "freeroam:freeze", false);
    }, 1000);
};

function playerGiveWeapon(player, hash) {
    player.giveWeapon(alt.hash(hash), 1500, false);
};

function playerSpawnVehicle(player, model, position, rotation) {
    if (player.vehicles.length >= 1) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }
    let vehicle = new alt.Vehicle(model, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    player.vehicles.push(vehicle);
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
alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => playerSpawnVehicle(player, model, position, rotation));
alt.onClient("playerGiveWeapon", (player, hash) => playerGiveWeapon(player, hash));
alt.onClient("changemodel", (player, model) => changemodel(player, model));