import * as alt from 'alt';

alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => {
    let limit = 1;
    if (player.vehicles.length >= limit) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }
    let vehicle = new alt.Vehicle(model, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
    player.vehicles.push(vehicle);
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
});

alt.on('GlobalSystems:PlayerReady', (player) => {
    player.vehicles = [];
});

alt.on('playerDisconnect', (player) => {
    player.vehicles.forEach(vehicle => {
        vehicle.destroy();
    });
});