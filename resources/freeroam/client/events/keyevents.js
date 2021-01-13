import * as alt from 'alt';
import Fingerpointing from './fingerpointing.js';

let pointing = new Fingerpointing();
alt.on('keydown', (key) => {
    if (key == 'B'.charCodeAt(0)) {
        pointing.start();
    }
});

alt.on('keyup', (key) => {
    if (key == 'B'.charCodeAt(0)) {
        pointing.stop();
    }
});

alt.log('Loaded: ./events/keyevents.js');