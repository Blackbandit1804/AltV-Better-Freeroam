import * as native from "natives";
import * as alt from 'alt';

const sendNotification = async(textColor, bgColor, message, blink) => {
    native.setColourOfNextTextComponent(textColor);
    native.setNotificationBackgroundColor(bgColor);
    native.setNotificationTextEntry("STRING");
    native.addTextComponentSubstringPlayerName(message);
    native.drawNotification(blink, false);
};

alt.onServer("freeroam:sendNotification", sendNotification);