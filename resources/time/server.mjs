import * as alt from 'alt';
import Weather from './time';

let weatherSync = new Weather();

alt.on('resourceStart', () => {
    weatherSync.startSync();
});

alt.on('resourceStop', () => {
    weatherSync.stopSync();
});

