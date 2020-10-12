import * as alt from 'alt';
import Weather from './weather';

let weatherSync = new Weather();

alt.on('resourceStart', () => {
    weatherSync.startSync();
});

alt.on('resourceStop', () => {
    weatherSync.stopSync();
});

alt.on('consoleCommand', (msg) => {
    switch(msg){
        case "currentData": weatherSync.getCurrentData();
            break;
        default: break;
    }
});

