import * as alt from 'alt';

alt.onClient('playerSpawnVehicle', (player, model) => {
    let limit = 1;
    if (player.vehicles.length >= limit) {
        player.vehicles[0].destroy();
        player.vehicles.splice(0, 1);
    }
    let vehicle = new alt.Vehicle(model, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
    alt.emitClient(player, 'setPedIntoVehicle', vehicle);
    player.vehicles.push(vehicle);
});

alt.on('GlobalSystems:PlayerReady', (player) => {
    player.vehicles = [];
});

alt.on('playerDisconnect', (player) => {
    const vehicles = player.vehicles;
    vehicles.forEach(vehicle => {
        vehicle.destroy();
    });
});