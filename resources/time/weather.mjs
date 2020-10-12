import * as alt from 'alt';

export default class Weather {

	constructor() {
        this.interval = null;
        this.dateInterval = null;
        this.currentWeatherData = {};
        this.currentDate = new Date();
        this.registerEvents();
        this.init();
    }

	registerEvents() {
        alt.on('playerConnect', (player) => {
            alt.emitClient(player, 'disableClock');
            this.setDate(player);
        });
    }

    init(){
        this.dateInterval = setInterval(()=> {
            if(alt.Player.all.length !== 0){
                this.currentDate = new Date();
                alt.Player.all.forEach((player)=>{
                    this.setDate(player);
                });
            }
        }, 10000);
    }

     syncNewData(){
        if(alt.Player.all.length !== 0){
            this.currentDate = new Date();
            alt.Player.all.forEach((player)=>{
                this.setDate(player);
            });
        }
    }

    setDate(player){
        player.setDateTime(this.currentDate.getDate(), this.currentDate.getMonth(), this.currentDate.getFullYear(),
            this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds());
    }

    stopSync(){
        if(this.interval){
            clearInterval(this.interval);
        }
        if(this.dateInterval){
            clearInterval(this.dateInterval);
        }
        alt.log('RealWeatherTimeSync: stopped');
    }

    startSync(){
        if(this.interval){
            clearInterval(this.interval);
        }
        if(this.dateInterval){
            clearInterval(this.dateInterval);
        }
        this.init();
        alt.log('RealWeatherTimeSync: started');
    }

    getCurrentData(){
        console.log("Time: " +this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds());
    }
}
