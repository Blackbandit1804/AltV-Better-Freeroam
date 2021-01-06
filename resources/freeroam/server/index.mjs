import * as alt from 'alt';
import chat from './chat.mjs';
import * as idle from './antiidle.mjs';
import * as constant from './constants.mjs';

let dateInterval,
    currentDate,
	checkInterval,
	spawns = constant.spawns,
	spawnModels = constant.spawnModels,
    ipls = constant.ipls,
    blip = constant.blip;

currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();

function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}

function getRandomListEntry(list){
    return randomNumber(0, list.length - 1);
}

alt.on('GlobalSystems:PlayerReady', function (player) {
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
    idle.setupidle(player);
});

alt.on('playerDeath', (player) => {
    alt.emitClient(player, "freeroam:switchInOutPlayer", false, 0, 2);
    setTimeout(function(){
        if(player !== undefined){
			alt.emitClient(player, "freeroam:clearPedBloodDamage");
            alt.emitClient(player, "freeroam:switchInOutPlayer", true);
			spawnplayer(player);
		}
	}, 3000);
});

function spawnplayer(player ){
	alt.emitClient(player, "freeroam:freeze", true);
	var spawn = spawns[getRandomListEntry(spawns)];
	player.spawn(spawn.x, spawn.y, spawn.z, 1);
	player.health = 200;
	player.armour = 100;
	alt.emitClient(player, "freeroam:playerstats");
	alt.emit('GlobalSystems:GiveWeapon', player, alt.hash("gadget_parachute"), 1, false);
	alt.setTimeout(() => {
        alt.emitClient(player, "freeroam:freeze", false);
    }, 1000);
};

alt.on('playerDisconnect', (player, reason) => {
    chat.broadcast(`{1cacd4}${player.name} {ffffff}has {ff0000}left {ffffff}the Server.. (${alt.Player.all.length -= 1} players online)`);
	alt.log(`${player.name} has leaved the server becauseof ${reason}`);
    playerDisconnect(player)
    idle.disconnectidle();
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

function init(){
    dateInterval = setInterval(()=> {
        currentDate = new Date();
        date = currentDate.getDate();
        hour = currentDate.getHours();
        minute = currentDate.getMinutes();
    }, 60000);
};

function stopSync(){
    if(dateInterval){
        clearInterval(dateInterval);
    }
};

function startSync(){
    if(dateInterval){
        clearInterval(dateInterval);
    }
    init();
};

function checksyncneeded() {
    if (dateInterval | alt.Player.all.length == 0) {
        stopSync();
    } else if (!dateInterval | alt.Player.all.length !== 0) {
        startSync();
    }
};

function playerGiveWeapon(player, hash) {
	alt.emit('GlobalSystems:GiveWeapon', player, alt.hash(hash), 1500, false);
};

function playerSpawnVehicle(player, model, position, rotation) {
    let vehicle = new alt.Vehicle(model, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    if (player.vehicles.length >= 1) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    player.vehicles.push(vehicle);
};

function playerDisconnect(player) {
    player.vehicles.forEach(vehicle => {
        vehicle.destroy();
	});
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
    player.setDateTime(date, month, year, hour, minute, 0);
};

alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => playerSpawnVehicle(player, model, position, rotation));
alt.onClient("playerGiveWeapon", (player, hash) => playerGiveWeapon(player, hash));
alt.onClient("changemodel", (player, model) => changemodel(player, model));
alt.onClient("getblips", pushblips);
alt.onClient("getipls", pushipls);
alt.onClient("getcurrentdate", pushdate);

checkInterval = setInterval(()=> {
    checksyncneeded();
}, 60000);

alt.on('resourceStart', () => {
    checksyncneeded();
});

alt.on('resourceStop', () => {
    alt.clearInterval(checkInterval);
    stopSync();
});