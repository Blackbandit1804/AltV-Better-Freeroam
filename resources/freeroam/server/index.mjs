import * as alt from 'alt';
import chat from './chat.mjs';
import * as idle from './antiidle.mjs';
import * as constant from './constants.mjs';

let	spawns = constant.spawns,
	spawnModels = constant.spawnModels,
    ipls = constant.ipls,
    blip = constant.blip;

function shuffle(array) {
    let counter = array.length;
    
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
    
        // Decrease counter by 1
        counter--;
    
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    
    return array;
};

function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}

function getRandomListEntry(list){
    return randomNumber(0, list.length - 1);
}

alt.on('GlobalSystems:PlayerReady', function (player) {
    spawnModels = shuffle(spawnModels);
    player.vehicles = [];
	player.model = spawnModels[getRandomListEntry(spawnModels)];
    spawnplayer(player);
    setTimeout(function(){ 
        if(player !== undefined){
            chat.broadcast(`{1cacd4}${player.name} {ffffff}has {00ff00}joined {ffffff}the Server..  (${alt.Player.all.length} players online)`);
			chat.send(player, "{80eb34}Press {34dfeb}T {80eb34}and type {34dfeb}/help {80eb34}to see all available commands..");
			chat.send(player, "{34dfeb}F1 {80eb34}Weapon Menu | {34dfeb}F2 {80eb34}Car Spawner | {34dfeb}F3 {80eb34}Model Changer");
        }
	}, 100);
});

alt.on('playerDeath', (player) => {
    alt.emitClient(player, "freeroam:handledeath");
	spawnplayer(player);
});

function spawnplayer(player) {
    var spawn = shuffle(spawns);
	alt.emitClient(player, "freeroam:freeze", true);
	spawn = spawns[getRandomListEntry(spawns)];
	player.spawn(spawn.x, spawn.y, spawn.z, 1);
	player.health = 200;
	player.armour = 100;
	alt.emit('GlobalSystems:GiveWeapon', player, alt.hash("gadget_parachute"), 1, false);
	alt.setTimeout(() => {
        alt.emitClient(player, "freeroam:freeze", false);
    }, 1000);
};

alt.on('playerDisconnect', (player, reason) => {
    chat.broadcast(`{1cacd4}${player.name} {ffffff}has {ff0000}left {ffffff}the Server.. (${alt.Player.all.length -= 1} players online)`);
    alt.log(`${player.name} has leaved the server becauseof ${reason}`);
    player.vehicles.forEach(vehicle => {
        vehicle.destroy();
	});
});

chat.registerCmd("help", function (player) {
    chat.send(player, "{ff0000}========== {eb4034}HELP {ff0000} ==========");
    chat.send(player, "{ff0000}= {34abeb}/pos {40eb34} {ffffff} Get your Position in the game world");
	chat.send(player, "{80eb34}= {34dfeb}F1={80eb34}Weapon Menu {34dfeb}F2={80eb34}Car Spawner {34dfeb}F3={80eb34}Model Changer");
    chat.send(player, "{ff0000} ========================");
});

chat.registerCmd("pos", function (player) {
    alt.log(`Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
    chat.send(player, `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
});

function playerGiveWeapon(player, hash) {
	alt.emit('GlobalSystems:GiveWeapon', player, alt.hash(hash), 1500, false);
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

function pushblips(player) {
    alt.emitClient(player, "freeroam:setupblips", (blip));
};

function pushipls(player) {
    alt.emitClient(player, "freeroam:Interiors", (ipls));
};

function pushdate(player) {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
    player.setDateTime(date, month, year, hour, minute, second);
};

alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => playerSpawnVehicle(player, model, position, rotation));
alt.onClient("playerGiveWeapon", (player, hash) => playerGiveWeapon(player, hash));
alt.onClient("changemodel", (player, model) => changemodel(player, model));
alt.onClient("getblips", pushblips);
alt.onClient("getipls", pushipls);
alt.onClient("getcurrentdate", pushdate);