import * as alt from 'alt';
import * as native from "natives";

function playerblips (entity) {
    if(entity instanceof alt.Player)
    {
      alt.setTimeout(() => {
            if( !native.doesBlipExist( native.getBlipFromEntity( entity.scriptID ) ) ) {
              let blip = native.addBlipForEntity( entity.scriptID );
              native.setBlipDisplay( blip, 8 );
              native.showHeadingIndicatorOnBlip( blip, true);
              native.setBlipCategory( blip, 7 );
              native.setBlipAsFriendly( blip, true );
              native.setBlipAsShortRange( blip, true );
              native.setBlipSprite( bliptse, 439 );
              native.hideNumberOnBlip( blip );
              native.setBlipScale( blip, 1.0 );
              native.setBlipColour( blip, 0 );
          }
      }, 600);
    }
};

alt.on('nativeEntityCreate', (entity) => playerblips(entity)); 

alt.log('Loaded: ./events/nativeEntityCreate.js');