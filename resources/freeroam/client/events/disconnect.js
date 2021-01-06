import * as alt from 'alt';

function disconnect() {
    alt.clearInterval(radarinterval);
    alt.clearInterval(resetstatsinterval);
    alt.clearInterval(idlecaminterval);
    alt.clearInterval(checkInterval);
    alt.clearInterval(dateInterval);
};

alt.on('disconnect', () => disconnect);