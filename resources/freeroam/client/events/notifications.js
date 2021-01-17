import * as native from "natives";
import * as alt from 'alt';

const player = alt.Player.local;

//function drawNotification(imageName, headerMsg, detailsMsg, message) {
//    native.beginTextCommandThefeedPost('STRING');
//    native.addTextComponentSubstringPlayerName(message);
//    native.endTextCommandThefeedPostMessagetextTu(
//        imageName.toUpperCase(),
//        imageName.toUpperCase(),
//        false,
//        4,
//        headerMsg,
//        detailsMsg,
//        1.0,
//        ''
//    );
//    native.endTextCommandThefeedPostTicker(false, false);
//};

//only simple notifications, because the complex notifications are broken 
function drawNotification(imageName, headerMsg, detailsMsg, message, color, playername) {
    //alt.log(imageName, headerMsg, detailsMsg, message);
    native.beginTextCommandThefeedPost('STRING');
    if (playername) { message = playername + ': ' + message};
    native.addTextComponentSubstringPlayerName(message);
    if (color) native.thefeedSetNextPostBackgroundColor(color);
    native.endTextCommandThefeedPostTicker(false, false);  
};

function showHelpText() {
    drawNotification('CHAR_SOCIAL_CLUB', 'Notification', player.name, 'F1=Weapon Menu ~n~ F2=Car Spawner ~n~ F3=Model Changer', null);
};

alt.onServer('drawNotification', drawNotification);
alt.onServer('showHelpText', showHelpText);
alt.on('drawNotification', drawNotification);

alt.log('Loaded: ./events/notifications.js');