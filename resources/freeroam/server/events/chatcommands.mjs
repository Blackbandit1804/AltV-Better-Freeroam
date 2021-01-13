import * as alt from 'alt';
import chat from '../chat.mjs';

chat.registerCmd("help", function (player) {
    let message = `F1=Weapon Menu | F2=Car Spawner | F3=Model Changer`;
    alt.log(message);
    chat.send(player, message);
});

chat.registerCmd("players", function (player) {
    let message = `(${alt.Player.all.length}) players online`;
    alt.log(message);
    chat.send(player, message);
});

chat.registerCmd("pos", function (player) {
    let message = `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`; 
    alt.log(message);
    chat.send(player, message);
});

chat.registerCmd("devpos", function (player) {
    let message = `{ x:${player.pos.x}, y:${player.pos.y}, z:${player.pos.z} }`;
    alt.log(message);
    chat.send(player, message);
});

chat.registerCmd("kill", function (player) {
    player.health = 0;
});

chat.registerCmd("killengine", function (player) {
    let vehicle = player.vehicle;
    if (vehicle) { 
        vehicle.engineHealth = -0, vehicle.engineOn = false;
     };
});