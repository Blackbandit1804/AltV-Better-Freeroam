import * as alt from 'alt';

alt.onClient('playerSpawnVehicle', (player, model, position) => {
	try {
		player.vehicle.destroy();
	}
	catch(err) {
	} 
	finally {
		const vehicle = new alt.Vehicle(model, position.x, position.y, position.z, 0, 0, 0);
		alt.emitClient(player, 'setPedIntoVehicle', vehicle);
	};
});

alt.on('playerDisconnect', (player) => {
    try {
		player.vehicle.destroy();
	}
	catch(err) {
	} 
	finally {
	};
});