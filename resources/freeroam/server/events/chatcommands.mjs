import * as alt from 'alt';
import chat from '../chat.mjs';

chat.registerCmd("help", function (player) {
    alt.log(`F1=Weapon Menu | F2=Car Spawner | F3=Model Changer`);
    chat.send(player, `F1=Weapon Menu | F2=Car Spawner | F3=Model Changer`);
});

chat.registerCmd("players", function (player) {
    alt.log(`(${alt.Player.all.length}) players online`);
    chat.send(player, `(${alt.Player.all.length}) players online`);
});

chat.registerCmd("pos", function (player) {
    alt.log(`Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
    chat.send(player, `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
});

chat.registerCmd("devpos", function (player) {
    alt.log(`{ x:${player.pos.x}, y:${player.pos.y}, z:${player.pos.z} }`);
    chat.send(player, `{ x:${player.pos.x}, y:${player.pos.y}, z:${player.pos.z} }`);
});

chat.registerCmd("kill", function (player) {
    player.health = 0;
});