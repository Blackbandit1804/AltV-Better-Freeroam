import * as alt from 'alt';
import * as native from "natives";

const player = alt.Player.local;

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

function freeze(state){
    native.freezeEntityPosition(alt.Player.local.scriptID, state);
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
    new alt.PointBlip(6500, -6500, 20).alpha = 0;
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
    //set Infinite Oxygen
    let ped = native.playerPedId();
    native.setPedMaxTimeUnderwater(ped, 9999999980506448000.0);
};

function resetstats() {
    native.resetPlayerStamina(player.scriptID);
};

function idlecam() {
    native.invalidateIdleCam();
    native._0x9E4CFFF989258472();
};

function Interiors(){
    // 0 = request, 1 = remove
    let ipls = [
        { status: 0, ipl: 'ex_dt1_02_office_02b' },
        { status: 0, ipl: 'chop_props' },
        { status: 0, ipl: 'FIBlobby' },
        { status: 1, ipl: 'FIBlobbyfake' },
        { status: 0, ipl: 'FBI_colPLUG' },
        { status: 0, ipl: 'FBI_repair' },
        { status: 0, ipl: 'v_tunnel_hole' },
        { status: 0, ipl: 'TrevorsMP' },
        { status: 0, ipl: 'TrevorsTrailer' },
        { status: 0, ipl: 'TrevorsTrailerTidy' },
        { status: 1, ipl: 'farm_burnt' },
        { status: 1, ipl: 'farm_burnt_lod' },
        { status: 1, ipl: 'farm_burnt_props' },
        { status: 1, ipl: 'farmint_cap' },
        { status: 1, ipl: 'farmint_cap_lod' },
        { status: 0, ipl: 'farm' },
        { status: 0, ipl: 'farmint' },
        { status: 0, ipl: 'farm_lod' },
        { status: 0, ipl: 'farm_props' },
        { status: 0, ipl: 'facelobby' },
        { status: 1, ipl: 'CS1_02_cf_offmission' },
        { status: 0, ipl: 'CS1_02_cf_onmission1' },
        { status: 0, ipl: 'CS1_02_cf_onmission2' },
        { status: 0, ipl: 'CS1_02_cf_onmission3' },
        { status: 0, ipl: 'CS1_02_cf_onmission4' },
        { status: 0, ipl: 'v_rockclub' },
        { status: 0, ipl: 'v_janitor' },
        { status: 1, ipl: 'hei_bi_hw1_13_door' },
        { status: 0, ipl: 'bkr_bi_hw1_13_int' },
        { status: 0, ipl: 'ufo' },
        { status: 0, ipl: 'ufo_lod' },
        { status: 0, ipl: 'ufo_eye' },
        { status: 1, ipl: 'v_carshowroom' },
        { status: 1, ipl: 'shutter_open' },
        { status: 1, ipl: 'shutter_closed' },
        { status: 1, ipl: 'shr_int' },
        { status: 0, ipl: 'csr_afterMission' },
        { status: 0, ipl: 'v_carshowroom' },
        { status: 0, ipl: 'shr_int' },
        { status: 0, ipl: 'shutter_closed' },
        { status: 0, ipl: 'smboat' },
        { status: 0, ipl: 'smboat_distantlights' },
        { status: 0, ipl: 'smboat_lod' },
        { status: 0, ipl: 'smboat_lodlights' },
        { status: 0, ipl: 'cargoship' },
        { status: 0, ipl: 'railing_start' },
        { status: 1, ipl: 'sp1_10_fake_interior' },
        { status: 1, ipl: 'sp1_10_fake_interior_lod' },
        { status: 0, ipl: 'sp1_10_real_interior' },
        { status: 0, ipl: 'sp1_10_real_interior_lod' },
        { status: 1, ipl: 'id2_14_during_door' },
        { status: 1, ipl: 'id2_14_during1' },
        { status: 1, ipl: 'id2_14_during2' },
        { status: 1, ipl: 'id2_14_on_fire' },
        { status: 1, ipl: 'id2_14_post_no_int' },
        { status: 1, ipl: 'id2_14_pre_no_int' },
        { status: 1, ipl: 'id2_14_during_door' },
        { status: 0, ipl: 'id2_14_during1' },
        { status: 1, ipl: 'Coroner_Int_off' },
        { status: 0, ipl: 'coronertrash' },
        { status: 0, ipl: 'Coroner_Int_on' },
        { status: 1, ipl: 'bh1_16_refurb' },
        { status: 1, ipl: 'jewel2fake' },
        { status: 1, ipl: 'bh1_16_doors_shut' },
        { status: 0, ipl: 'refit_unload' },
        { status: 0, ipl: 'post_hiest_unload' },
        { status: 0, ipl: 'Carwash_with_spinners' },
        { status: 0, ipl: 'KT_CarWash' },
        { status: 0, ipl: 'ferris_finale_Anim' },
        { status: 1, ipl: 'ch1_02_closed' },
        { status: 0, ipl: 'ch1_02_open' },
        { status: 0, ipl: 'AP1_04_TriAf01' },
        { status: 0, ipl: 'CS2_06_TriAf02' },
        { status: 0, ipl: 'CS4_04_TriAf03' },
        { status: 1, ipl: 'scafstartimap' },
        { status: 0, ipl: 'scafendimap' },
        { status: 1, ipl: 'DT1_05_HC_REMOVE' },
        { status: 0, ipl: 'DT1_05_HC_REQ' },
        { status: 0, ipl: 'DT1_05_REQUEST' },
        { status: 0, ipl: 'dt1_05_hc_remove' },
        { status: 0, ipl: 'dt1_05_hc_remove_lod' },
        { status: 0, ipl: 'FINBANK' },
        { status: 1, ipl: 'DT1_03_Shutter' },
        { status: 1, ipl: 'DT1_03_Gr_Closed' },
        { status: 0, ipl: 'golfflags' },
        { status: 0, ipl: 'airfield' },
        { status: 0, ipl: 'v_garages' },
        { status: 0, ipl: 'v_foundry' },
        { status: 0, ipl: 'hei_yacht_heist' },
        { status: 0, ipl: 'hei_yacht_heist_Bar' },
        { status: 0, ipl: 'hei_yacht_heist_Bedrm' },
        { status: 0, ipl: 'hei_yacht_heist_Bridge' },
        { status: 0, ipl: 'hei_yacht_heist_DistantLights' },
        { status: 0, ipl: 'hei_yacht_heist_enginrm' },
        { status: 0, ipl: 'hei_yacht_heist_LODLights' },
        { status: 0, ipl: 'hei_yacht_heist_Lounge' },
        { status: 0, ipl: 'hei_carrier' },
        { status: 0, ipl: 'hei_Carrier_int1' },
        { status: 0, ipl: 'hei_Carrier_int2' },
        { status: 0, ipl: 'hei_Carrier_int3' },
        { status: 0, ipl: 'hei_Carrier_int4' },
        { status: 0, ipl: 'hei_Carrier_int5' },
        { status: 0, ipl: 'hei_Carrier_int6' },
        { status: 0, ipl: 'hei_carrier_LODLights' },
        { status: 0, ipl: 'bkr_bi_id1_23_door' },
        { status: 0, ipl: 'lr_cs6_08_grave_closed' },
        { status: 0, ipl: 'hei_sm_16_interior_v_bahama_milo_' },
        { status: 0, ipl: 'CS3_07_MPGates' },
        { status: 0, ipl: 'cs5_4_trains' },
        { status: 0, ipl: 'v_lesters' },
        { status: 0, ipl: 'v_trevors' },
        { status: 0, ipl: 'v_michael' },
        { status: 0, ipl: 'v_comedy' },
        { status: 0, ipl: 'v_cinema' },
        { status: 0, ipl: 'V_Sweat' },
        { status: 0, ipl: 'V_35_Fireman' },
        { status: 0, ipl: 'redCarpet' },
        { status: 0, ipl: 'triathlon2_VBprops' },
        { status: 0, ipl: 'jetstenativeurnel' },
        { status: 0, ipl: 'Jetsteal_ipl_grp1' },
        { status: 0, ipl: 'v_hospital' },
        { status: 1, ipl: 'RC12B_Default' },
        { status: 1, ipl: 'RC12B_Fixed' },
        { status: 0, ipl: 'RC12B_Destroyed' },
        { status: 0, ipl: 'RC12B_HospitalInterior' },
        { status: 0, ipl: 'canyonriver01' },
        { status: 0, ipl: 'canyonriver01_lod' },
        { status: 0, ipl: 'cs3_05_water_grp1' },
        { status: 0, ipl: 'cs3_05_water_grp1_lod' },
        { status: 0, ipl: 'trv1_trail_start' },
        { status: 0, ipl: 'CanyonRvrShallow' },

        // CASINO
        { status: 0, ipl: 'vw_casino_penthouse' },
        { status: 0, ipl: 'vw_casino_main' },
        { status: 0, ipl: 'vw_casino_carpark' },
        { status: 0, ipl: 'vw_dlc_casino_door' },
        { status: 0, ipl: 'vw_casino_door' },
        { status: 0, ipl: 'hei_dlc_windows_casino' },
        { status: 0, ipl: 'hei_dlc_casino_door' },
        { status: 0, ipl: 'hei_dlc_casino_aircon' },
        { status: 0, ipl: 'vw_casino_garage' },
        
        // Island
        { status: 0, ipl: 'h4_islandairstrip' },
        { status: 0, ipl: 'h4_islandairstrip_props' },
        { status: 0, ipl: 'h4_islandx_mansion' },
        { status: 0, ipl: 'h4_islandx_mansion_props' },
        { status: 0, ipl: 'h4_islandx_props' },
        { status: 0, ipl: 'h4_islandxdock' },
        { status: 0, ipl: 'h4_islandxdock_props' },
        { status: 0, ipl: 'h4_islandxdock_props_2' },
        { status: 0, ipl: 'h4_islandxtower' },
        { status: 0, ipl: 'h4_islandx_maindock' },
        { status: 0, ipl: 'h4_islandx_maindock_props' },
        { status: 0, ipl: 'h4_islandx_maindock_props_2' },
        { status: 0, ipl: 'h4_IslandX_Mansion_Vault' },
        { status: 0, ipl: 'h4_islandairstrip_propsb' },
        { status: 0, ipl: 'h4_beach' },
        { status: 0, ipl: 'h4_beach_props' },
        { status: 0, ipl: 'h4_beach_bar_props' },
        { status: 0, ipl: 'h4_islandx_barrack_props' },
        { status: 0, ipl: 'h4_islandx_checkpoint' },
        { status: 0, ipl: 'h4_islandx_checkpoint_props' },
        { status: 0, ipl: 'h4_islandx_Mansion_Office' },
        { status: 0, ipl: 'h4_islandx_Mansion_LockUp_01' },
        { status: 0, ipl: 'h4_islandx_Mansion_LockUp_02' },
        { status: 0, ipl: 'h4_islandx_Mansion_LockUp_03' },
        { status: 0, ipl: 'h4_islandairstrip_hangar_props' },
        { status: 0, ipl: 'h4_IslandX_Mansion_B' },
        { status: 0, ipl: 'h4_islandairstrip_doorsclosed' },
        { status: 0, ipl: 'h4_Underwater_Gate_Closed' },
        { status: 0, ipl: 'h4_mansion_gate_closed' },
        { status: 0, ipl: 'h4_aa_guns' },
        { status: 0, ipl: 'h4_IslandX_Mansion_GuardFence' },
        { status: 0, ipl: 'h4_IslandX_Mansion_Entrance_Fence' },
        { status: 0, ipl: 'h4_IslandX_Mansion_B_Side_Fence' },
        { status: 0, ipl: 'h4_IslandX_Mansion_Lights' },
        { status: 0, ipl: 'h4_islandxcanal_props' },
        { status: 0, ipl: 'h4_beach_props_party' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_06_a' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_06_b' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_06_c' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_a' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_b' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_c' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_d' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_e' },
        { status: 0, ipl: 'h4_islandX_Terrain_props_05_f' },
        { status: 0, ipl: 'H4_islandx_terrain_01' },
        { status: 0, ipl: 'H4_islandx_terrain_02' },
        { status: 0, ipl: 'H4_islandx_terrain_03' },
        { status: 0, ipl: 'H4_islandx_terrain_04' },
        { status: 0, ipl: 'H4_islandx_terrain_05' },
        { status: 0, ipl: 'H4_islandx_terrain_06' },
        { status: 0, ipl: 'h4_ne_ipl_00' },
        { status: 0, ipl: 'h4_ne_ipl_01' },
        { status: 0, ipl: 'h4_ne_ipl_02' },
        { status: 0, ipl: 'h4_ne_ipl_03' },
        { status: 0, ipl: 'h4_ne_ipl_04' },
        { status: 0, ipl: 'h4_ne_ipl_05' },
        { status: 0, ipl: 'h4_ne_ipl_06' },
        { status: 0, ipl: 'h4_ne_ipl_07' },
        { status: 0, ipl: 'h4_ne_ipl_08' },
        { status: 0, ipl: 'h4_ne_ipl_09' },
        { status: 0, ipl: 'h4_nw_ipl_00' },
        { status: 0, ipl: 'h4_nw_ipl_01' },
        { status: 0, ipl: 'h4_nw_ipl_02' },
        { status: 0, ipl: 'h4_nw_ipl_03' },
        { status: 0, ipl: 'h4_nw_ipl_04' },
        { status: 0, ipl: 'h4_nw_ipl_05' },
        { status: 0, ipl: 'h4_nw_ipl_06' },
        { status: 0, ipl: 'h4_nw_ipl_07' },
        { status: 0, ipl: 'h4_nw_ipl_08' },
        { status: 0, ipl: 'h4_nw_ipl_09' },
        { status: 0, ipl: 'h4_se_ipl_00' },
        { status: 0, ipl: 'h4_se_ipl_01' },
        { status: 0, ipl: 'h4_se_ipl_02' },
        { status: 0, ipl: 'h4_se_ipl_03' },
        { status: 0, ipl: 'h4_se_ipl_04' },
        { status: 0, ipl: 'h4_se_ipl_05' },
        { status: 0, ipl: 'h4_se_ipl_06' },
        { status: 0, ipl: 'h4_se_ipl_07' },
        { status: 0, ipl: 'h4_se_ipl_08' },
        { status: 0, ipl: 'h4_se_ipl_09' },
        { status: 0, ipl: 'h4_sw_ipl_00' },
        { status: 0, ipl: 'h4_sw_ipl_01' },
        { status: 0, ipl: 'h4_sw_ipl_02' },
        { status: 0, ipl: 'h4_sw_ipl_03' },
        { status: 0, ipl: 'h4_sw_ipl_04' },
        { status: 0, ipl: 'h4_sw_ipl_05' },
        { status: 0, ipl: 'h4_sw_ipl_06' },
        { status: 0, ipl: 'h4_sw_ipl_07' },
        { status: 0, ipl: 'h4_sw_ipl_08' },
        { status: 0, ipl: 'h4_sw_ipl_09' },
        { status: 0, ipl: 'h4_islandx_mansion' },
        { status: 0, ipl: 'h4_islandxtower_veg' },
        { status: 0, ipl: 'h4_islandx_sea_mines' },
        { status: 0, ipl: 'h4_islandx' },
        { status: 0, ipl: 'h4_islandx_barrack_hatch' },
        { status: 0, ipl: 'h4_islandxdock_water_hatch' },
        { status: 0, ipl: 'h4_beach_party' },
        { status: 0, ipl: 'h4_mph4_terrain_01_grass_0' },
        { status: 0, ipl: 'h4_mph4_terrain_01_grass_1' },
        { status: 0, ipl: 'h4_mph4_terrain_02_grass_0' },
        { status: 0, ipl: 'h4_mph4_terrain_02_grass_1' },
        { status: 0, ipl: 'h4_mph4_terrain_02_grass_2' },
        { status: 0, ipl: 'h4_mph4_terrain_02_grass_3' },
        { status: 0, ipl: 'h4_mph4_terrain_04_grass_0' },
        { status: 0, ipl: 'h4_mph4_terrain_04_grass_1' },
        { status: 0, ipl: 'h4_mph4_terrain_04_grass_2' },
        { status: 0, ipl: 'h4_mph4_terrain_04_grass_3' },
        { status: 0, ipl: 'h4_mph4_terrain_05_grass_0' },
        { status: 0, ipl: 'h4_mph4_terrain_06_grass_0' },
        { status: 0, ipl: 'h4_mph4_airstrip_interior_0_airstrip_hanger' }
    ];
	
    ipls.forEach(element => {
        if (element["status"] == 0){
            native.requestIpl(element["ipl"]);
        } else {
            native.removeIpl(element["ipl"]);
        }
    });

	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4981.012, -5712.747, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4984.134, -5709.249, 20.78103, true, 0, 0, 10);
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4990.681, -5715.106, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4987.587, -5718.635, 20.78103, true, 0, 0, 10);

    //disable Waves
    native.setDeepOceanScaler(0.0);
    native.waterOverrideSetStrength(1.0);

    native.refreshInterior(274689)

    for(var i = 0; i <= 15; i++){
        native.setMinimapComponent(i, true, -1);
    };
};

function disconnect() {
    alt.clearInterval(radarinterval);
    alt.clearInterval(resetstatsinterval);
    alt.clearInterval(idlecaminterval);
};

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


let radarinterval = alt.setInterval(radar, 1);
let resetstatsinterval = alt.setInterval(resetstats, 1);
let idlecaminterval = alt.setInterval(idlecam, 25000);

alt.onServer("freeroam:freeze", (state) => freeze(state));
alt.onServer("freeroam:clearPedBloodDamage", clearPedBloodDamage);
alt.onServer("freeroam:spawned", spawned);
alt.onServer("freeroam:sendNotification", sendNotification);
alt.onServer("freeroam:setupblips", setupblips);
alt.onServer("freeroam:Interiors", Interiors);
alt.onServer("freeroam:playerstats", playerstats);
alt.on('nativeEntityCreate', (entity) => playerblips(entity)); 
alt.on('disconnect', () => disconnect);