import * as alt from 'alt';
import * as native from "natives";

let player = alt.Player.local;

function spawned(){
    native.setPedDefaultComponentVariation(player);
    native.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE"); // Used to stop police sound in town
    native.cancelCurrentPoliceReport(); // Used to stop default police radio around/In police vehicle
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", 1, 0); // Turn off prison sound
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", 1, 0); // Turn off prison sound
    native.clearAmbientZoneState("AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", 1, 0); // Turn off prison sound
    native.setAmbientZoneState(0, 0, 0); // Set ambiant sound to 0,0,0
    native.clearAmbientZoneState("AZ_DISTANT_SASQUATCH", 0, 0);
    native.setAudioFlag("LoadMPData", true);
    native.setAudioFlag("DisableFlightMusic", true);
};

function clearPedBloodDamage(){
    native.clearPedBloodDamage(alt.Player.local.scriptID);
};

alt.onServer("freeroam:switchInOutPlayer", (in_switch, instant_switch, switch_type) => {
    if(in_switch){
        native.switchInPlayer(alt.Player.local.scriptID);
    }else{
        native.switchOutPlayer(alt.Player.local.scriptID, instant_switch, switch_type);
    }
});

function freeze(){
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
};

function unfreeze(){
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
};

function sendNotification(textColor, bgColor, message, blink){
    native.setColourOfNextTextComponent(textColor);
    native.setNotificationBackgroundColor(bgColor);
    native.setNotificationTextEntry("STRING");
    native.addTextComponentSubstringPlayerName(message);
    native.drawNotification(blink, false);
};

function setupblips(){
    let hospitals = [
        { x: 295.29229736328125, y: -1446.6856689453125, z: 29.953857421875 },
        { x: 360.3164978027344, y: -585.3230590820312, z: 28.80810546875 },
        { x: -449.26153564453125, y: -340.5230712890625, z: 34.4864501953125 },
        { x: 1152.0263671875, y: -1527.5867919921875, z: 34.84033203125 },
        { x: -676.7472534179688, y: 309.23077392578125, z: 83.081298828125 },
        { x: -874.7604370117188, y: -307.9120788574219, z: 39.5582275390625 },
        { x: 1821.1468446601941, y: 3674.7974053508206, z: 34.276729583740234 }
    ];
    
    var police = [
        { x: -1325.8495145631068, y: -1516.9403501258464, z: 10},
        { x: -1085.4065533980583, y: -819.3358596608708, z: 10},
        { x: 106.18932038834951, y: -729.8434740630345, z: 10},
        { x: 152.45752427184465, y: -649.4520090344707, z: 10},
        { x: 455.09708737864077, y: -985.4276600500763, z: 10},
        { x: 838.1371359223301, y: -1289.5500890732317, z: 10},
        { x: 364.8361650485437, y: -1592.914108048948, z: 10},
        { x: -584.0412621359224, y: -131.30285517892062, z: 10},
        { x: 618.9320388349514, y: -2.3731471142420197, z: 10},
        { x: 377.7305825242718, y: 802.3488872282135, z: 10},
        { x: 1846.9356796116504, y: 3686.1359426616445, z: 10},
        { x: -448.2706310679612, y: 6010.918628325745, z: 10}
    ];
    
    hospitals.forEach(hospital => {
        createblip(new alt.Vector3(hospital), 61, false, "");
    });
    
    police.forEach(police => {
        createblip(new alt.Vector3(police), 60, false, "");
    });

    createblip(new alt.Vector3(301.002197265625, 2645.68359375, 207.786865234375), 590, true, "Los Santos");
    createblip(new alt.Vector3(5089.52978515625, -5045.09033203125, 51.01611328125), 89, true, "Cayo Perico");
    createblip(new alt.Vector3(3059.7890625, -4724.55810546875, 15.968505859375), 424, true, "Aircraft carrier");
};

function createblip(pos, id, customnamestate, label){
    let blip = native.addBlipForCoord(pos.x, pos.y, pos.z);
    native.setBlipSprite(blip, id);
    native.setBlipAsShortRange(blip, true);
    if (customnamestate == true){
        native.beginTextCommandSetBlipName('STRING');
        native.addTextComponentSubstringPlayerName(label);
        native.endTextCommandSetBlipName(blip);
    }
    else {

    };
};

function radar() {
	native.setRadarAsExteriorThisFrame();
	native.setRadarAsInteriorThisFrame(alt.hash("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);
};

function playerstats(){
    native.statSetInt(native.getHashKey("SP0_SPECIAL_ABILITY_UNLOCKED") , 100, true);
    native.statSetInt(native.getHashKey("SP0_STAMINA") , 100, true);
    native.statSetInt(native.getHashKey("SP0_STEALTH_ABILITY") , 100, true);
    native.statSetInt(native.getHashKey("SP0_LUNG_CAPACITY") , 100, true);
    native.statSetInt(native.getHashKey("SP0_FLYING_ABILITY") , 100, true);
    native.statSetInt(native.getHashKey("SP0_SHOOTING_ABILITY") , 100, true);
    native.statSetInt(native.getHashKey("SP0_STRENGTH") , 100, true);
    native.statSetInt(native.getHashKey("SP0_WHEELIE_ABILITY") , 100, true);
};

function Interiors(){
    var request = [
        "chop_props",
        "FIBlobby",
        "FBI_colPLUG",
        "FBI_repair",
        "v_tunnel_hole",
        "TrevorsMP",
        "TrevorsTrailer",
        "TrevorsTrailerTidy",
        "farm",
        "farmint",
        "farm_lod",
        "farm_props",
        "facelobby",
        "CS1_02_cf_onmission1",
        "CS1_02_cf_onmission2",
        "CS1_02_cf_onmission3",
        "CS1_02_cf_onmission4",
        "v_rockclub",
        "v_janitor",
        "bkr_bi_hw1_13_int",
        "ufo",
        "ufo_lod",
        "ufo_eye",
        "csr_afterMission",
        "v_carshowroom",
        "shr_int",
        "shutter_closed",
        "smboat",
        "smboat_distantlights",
        "smboat_lod",
        "smboat_lodlights",
        "cargoship",
        "sp1_10_real_interior",
        "sp1_10_real_interior_lod",
        "id2_14_during1",
        "coronertrash",
        "Coroner_Int_on",
        "refit_unload",
        "post_hiest_unload",
        "Carwash_with_spinners",
        "KT_CarWash",
        "ferris_finale_Anim",
        "ch1_02_open",
        "AP1_04_TriAf01",
        "CS2_06_TriAf02",
        "CS4_04_TriAf03",
        "scafendimap",
        "DT1_05_HC_REQ",
        "DT1_05_REQUEST",
        "dt1_05_hc_remove",
        "dt1_05_hc_remove_lod",
        "FINBANK",
        "golfflags",
        "airfield",
        "v_garages",
        "v_foundry",
        "hei_yacht_heist",
        "hei_yacht_heist_Bar",
        "hei_yacht_heist_Bedrm",
        "hei_yacht_heist_Bridge",
        "hei_yacht_heist_DistantLights",
        "hei_yacht_heist_enginrm",
        "hei_yacht_heist_LODLights",
        "hei_yacht_heist_Lounge",
        "hei_carrier",
        "hei_Carrier_int1",
        "hei_Carrier_int2",
        "hei_Carrier_int3",
        "hei_Carrier_int4",
        "hei_Carrier_int5",
        "hei_Carrier_int6",
        "hei_carrier_LODLights",
        "bkr_bi_id1_23_door",
        "lr_cs6_08_grave_closed",
        "hei_sm_16_interior_v_bahama_milo_",
        "CS3_07_MPGates",
        "cs5_4_trains",
        "v_lesters",
        "v_trevors",
        "v_michael",
        "v_comedy",
        "v_cinema",
        "V_Sweat",
        "V_35_Fireman",
        "redCarpet",
        "triathlon2_VBprops",
        "jetstenativeurnel",
        "Jetsteal_ipl_grp1",
        "v_hospital",
        "RC12B_Destroyed",
        "RC12B_HospitalInterior",
        "cs3_05_water_grp1",
        "cs3_05_water_grp1_lod",
        "trv1_trail_start",
        "CanyonRvrShallow",
		"vw_casino_penthouse",
		"vw_casino_main",
		"h4_islandairstrip",
		"h4_islandairstrip_props",
		"h4_islandx_mansion",
		"h4_islandx_mansion_props",
		"h4_islandx_props",
		"h4_islandxdock",
		"h4_islandxdock_props",
		"h4_islandxdock_props_2",
		"h4_islandxtower",
		"h4_islandx_maindock",
		"h4_islandx_maindock_props",
		"h4_islandx_maindock_props_2",
		"h4_IslandX_Mansion_Vault",
		"h4_islandairstrip_propsb",
		"h4_beach",
		"h4_beach_props",
		"h4_beach_bar_props",
		"h4_islandx_barrack_props",
		"h4_islandx_checkpoint",
		"h4_islandx_checkpoint_props",
		"h4_islandx_Mansion_Office",
		"h4_islandx_Mansion_LockUp_01",
		"h4_islandx_Mansion_LockUp_02",
		"h4_islandx_Mansion_LockUp_03",
		"h4_islandairstrip_hangar_props",
		"h4_IslandX_Mansion_B",
		"h4_islandairstrip_doorsclosed",
		"h4_Underwater_Gate_Closed",
		"h4_mansion_gate_closed",
		"h4_aa_guns",
		"h4_IslandX_Mansion_GuardFence",
		"h4_IslandX_Mansion_Entrance_Fence",
		"h4_IslandX_Mansion_B_Side_Fence",
		"h4_IslandX_Mansion_Lights",
		"h4_islandxcanal_props",
		"h4_beach_props_party",
		"h4_islandX_Terrain_props_06_a",
		"h4_islandX_Terrain_props_06_b",
		"h4_islandX_Terrain_props_06_c",
		"h4_islandX_Terrain_props_05_a",
		"h4_islandX_Terrain_props_05_b",
		"h4_islandX_Terrain_props_05_c",
		"h4_islandX_Terrain_props_05_d",
		"h4_islandX_Terrain_props_05_e",
		"h4_islandX_Terrain_props_05_f",
		"H4_islandx_terrain_01",
		"H4_islandx_terrain_02",
		"H4_islandx_terrain_03",
		"H4_islandx_terrain_04",
		"H4_islandx_terrain_05",
		"H4_islandx_terrain_06",
		"h4_ne_ipl_00",
		"h4_ne_ipl_01",
		"h4_ne_ipl_02",
		"h4_ne_ipl_03",
		"h4_ne_ipl_04",
		"h4_ne_ipl_05",
		"h4_ne_ipl_06",
		"h4_ne_ipl_07",
		"h4_ne_ipl_08",
		"h4_ne_ipl_09",
		"h4_nw_ipl_00",
		"h4_nw_ipl_01",
		"h4_nw_ipl_02",
		"h4_nw_ipl_03",
		"h4_nw_ipl_04",
		"h4_nw_ipl_05",
		"h4_nw_ipl_06",
		"h4_nw_ipl_07",
		"h4_nw_ipl_08",
		"h4_nw_ipl_09",
		"h4_se_ipl_00",
		"h4_se_ipl_01",
		"h4_se_ipl_02",
		"h4_se_ipl_03",
		"h4_se_ipl_04",
		"h4_se_ipl_05",
		"h4_se_ipl_06",
		"h4_se_ipl_07",
		"h4_se_ipl_08",
		"h4_se_ipl_09",
		"h4_sw_ipl_00",
		"h4_sw_ipl_01",
		"h4_sw_ipl_02",
		"h4_sw_ipl_03",
		"h4_sw_ipl_04",
		"h4_sw_ipl_05",
		"h4_sw_ipl_06",
		"h4_sw_ipl_07",
		"h4_sw_ipl_08",
		"h4_sw_ipl_09",
		"h4_islandx_mansion",
		"h4_islandxtower_veg",
		"h4_islandx_sea_mines",
		"h4_islandx",
		"h4_islandx_barrack_hatch",
		"h4_islandxdock_water_hatch",
		"h4_beach_party",
		"h4_mph4_terrain_01_grass_0",
		"h4_mph4_terrain_01_grass_1",
		"h4_mph4_terrain_02_grass_0",
		"h4_mph4_terrain_02_grass_1",
		"h4_mph4_terrain_02_grass_2",
		"h4_mph4_terrain_02_grass_3",
		"h4_mph4_terrain_04_grass_0",
		"h4_mph4_terrain_04_grass_1",
		"h4_mph4_terrain_04_grass_2",
		"h4_mph4_terrain_04_grass_3",
		"h4_mph4_terrain_05_grass_0",
		"h4_mph4_terrain_06_grass_0",
        "h4_mph4_airstrip_interior_0_airstrip_hanger",
        "shutter_open",
        "shr_int",
        "Plane_crash_trench",
        "prop_shamal_crash",
        "crashed_cargoplane",
        "canyonriver01_traincrash",
        "railing_end",
        "DT1_03_Shutter"
    ];
    var remove = [
        "FIBlobbyfake",
        "farm_burnt",
        "farm_burnt_lod",
        "farm_burnt_props",
        "farmint_cap",
        "farmint_cap_lod",
        "CS1_02_cf_offmission",
        "hei_bi_hw1_13_door",
        "shutter_closed",
        "sp1_10_fake_interior",
        "sp1_10_fake_interior_lod",
        "id2_14_during_door",
        "id2_14_during1",
        "id2_14_during2",
        "id2_14_on_fire",
        "id2_14_post_no_int",
        "id2_14_pre_no_int",
        "id2_14_during_door",
        "Coroner_Int_off",
        "bh1_16_refurb",
        "jewel2fake",
        "bh1_16_doors_shut",
        "ch1_02_closed",
        "scafstartimap",
        "DT1_05_HC_REMOVE",
        "DT1_03_Gr_Closed",
        "RC12B_Default",
        "RC12B_Fixed",
        "canyonriver01",
        "railing_start",
        "sunkcargoship"
    ];
	
    request.forEach(element => {
        native.requestIpl(element);
    });
    remove.forEach(element => {
        native.removeIpl(element);
    });
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4981.012, -5712.747, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4984.134, -5709.249, 20.78103, true, 0, 0, 10);
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4990.681, -5715.106, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4987.587, -5718.635, 20.78103, true, 0, 0, 10);
    native.setDeepOceanScaler(0.0);
    native.refreshInterior(274689)

    for(var i = 1; i <= 15; i++){
        native.setMinimapComponent(i, true);
    };
};

alt.onServer("freeroam:freeze", freeze);
alt.onServer("freeroam:unfreeze", unfreeze);
alt.onServer("freeroam:clearPedBloodDamage", clearPedBloodDamage);
alt.onServer("freeroam:spawned", spawned);
alt.onServer("freeroam:sendNotification", sendNotification);
alt.onServer("freeroam:setupblips", setupblips);
alt.onServer("freeroam:Interiors", Interiors);
alt.onServer("freeroam:playerstats", playerstats);

new alt.PointBlip(6500, -6500, 20).alpha = 0;
alt.setInterval(radar, 1);

alt.setInterval(() => {
    native.invalidateIdleCam();
    native._0x9E4CFFF989258472();
}, 25000);

alt.on( 'nativeEntityCreate', ( entity ) => {
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
} ); 