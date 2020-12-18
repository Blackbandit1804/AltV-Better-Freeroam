import * as alt from 'alt';

alt.onClient('playerSpawnVehicle', (player, model, position, rotation) => {
	try {
		player.vehicle.destroy();
	}
	catch(err) {
	} 
	finally {
		const vehicle = new alt.Vehicle(model, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
		alt.emitClient(player, 'setPedIntoVehicle', vehicle);
	};
});

alt.on('playerDeath', (player) => {
    try {
		player.vehicle.destroy();
	}
	catch(err) {
	} 
	finally {
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