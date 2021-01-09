import * as native from 'natives';
import * as alt from 'alt';

export function Show(loadingText) {
    if (loadingText == null) {
        native.beginTextCommandBusyspinnerOn("");
    } else {
        native.beginTextCommandBusyspinnerOn("STRING");
        native.addTextComponentSubstringPlayerName(loadingText);
    }
    native.endTextCommandBusyspinnerOn("RegularClockwise");
};

export function Hide() {
    native.busyspinnerOff();
};

export default {
    Show,
    Hide
};

alt.on('disconnect', Hide);
