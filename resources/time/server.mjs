import * as alt from 'alt';

let dateInterval,
    date,
    currentDate,
    checkInterval;

function init(){
    dateInterval = setInterval(()=> {
    if(alt.Player.all.length !== 0){
        currentDate = new Date();
        date = currentDate;
        alt.Player.all.forEach((player)=>{
            setDate(player, date);
        });
    }
    }, 60000);
};

function setDate(player, date){
    player.setDateTime(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds());
};

function stopSync(){
    if(dateInterval){
        clearInterval(dateInterval);
    }
    //alt.log('RealWeatherTimeSync: stopped');
};

function checksyncneeded() {
    if (dateInterval | alt.Player.all.length == 0) {
        stopSync();
    } else if (!dateInterval | alt.Player.all.length !== 0) {
        startSync();
    }
};

function startSync(){
    if(dateInterval){
        clearInterval(dateInterval);
    }
    init();
    //alt.log('RealWeatherTimeSync: started');
};

alt.on('resourceStart', () => {
    checksyncneeded();
});

alt.on('resourceStop', () => {
    clearInterval(checkInterval);
    stopSync();
});

checkInterval = setInterval(()=> {
    checksyncneeded();
}, 60000);


