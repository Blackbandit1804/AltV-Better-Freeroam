import * as alt from 'alt';
import chat from '../chat.mjs';

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