import * as native from "natives";
import * as alt from 'alt';

export function drawNotification(imageName, headerMsg, detailsMsg, message) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostMessagetextTu(
        imageName.toUpperCase(),
        imageName.toUpperCase(),
        false,
        4,
        headerMsg,
        detailsMsg,
        1.5,
        ''
    );
    native.endTextCommandThefeedPostTicker(false, false);
}

alt.onServer('drawNotification', drawNotification);
alt.on('drawNotification', drawNotification);