"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from 'alt';
import * as game from 'natives';
import * as native from "natives";

let player = alt.Player.local;

alt.onServer("freeroam:spawned", function () {
    game.setPedDefaultComponentVariation(alt.Player.local.scriptID);
});

alt.onServer("freeroam:clearPedBloodDamage", function () {
    game.clearPedBloodDamage(alt.Player.local.scriptID);
});

alt.onServer("freeroam:switchInOutPlayer", (in_switch, instant_switch, switch_type) => {
    if(in_switch){
        game.switchInPlayer(alt.Player.local.scriptID);
    }else{
        game.switchOutPlayer(alt.Player.local.scriptID, instant_switch, switch_type);
    }
});

alt.onServer("freeroam:freeze", function () {
	game.freezeEntityPosition(alt.Player.local.scriptID, true);
});

alt.onServer("freeroam:unfreeze", function () {
	game.freezeEntityPosition(alt.Player.local.scriptID, false);
});

// Source: https://github.com/Stuyk/altV-Open-Roleplay/blob/5ccdeb9e960a7e0fde758cc89c366ed2953cc639/resources/orp/client/systems/interiors.mjs
alt.onServer('freeroam:Interiors', () => {
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
        "railing_end"
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
        "DT1_03_Shutter",
        "DT1_03_Gr_Closed",
        "RC12B_Default",
        "RC12B_Fixed",
        "canyonriver01",
        "railing_start"
    ];
	var casino1 = [
        "0x30240D11",
        "0xA3C89BB2"
    ];
	var casino2 = [
        "teste1",
        "teste2",
        "teste3",
        "teste4",
        "teste11",
        "teste17",
        "teste18",
        "teste19",
        "teste20",
        "teste21",
        "teste29",
        "teste32",
        "teste33",
        "teste34"
    ];
	var casino3 = [
        "teste1",
        "teste2",
        "teste3",
        "teste4",
        "teste11"
    ];

	let coordLoc = native.getInteriorAtCoords(-141.1987, -620.913, 168.8205);
    native.pinInteriorInMemory(coordLoc);
    alt.requestIpl('ex_dt1_02_office_02b');
	
	let interiorID = native.getInteriorAtCoords(1100.0, 220.0, -50.0);
    if (native.isValidInterior(interiorID)) {
		casino1.forEach(element => {
			native.activateInteriorEntitySet(interiorID, element);
		});
        native.refreshInterior(interiorID);
    };
    interiorID = native.getInteriorAtCoords(976.6364, 70.29476, 115.1641);
    if (native.isValidInterior(interiorID)) {
		casino2.forEach(element => {
			native.activateInteriorEntitySet(interiorID, element);
		});
		casino3.forEach(element => {
			native.activateInteriorEntitySet(interiorID, element, 3);
		});
        native.refreshInterior(interiorID);
    };
	
    request.forEach(element => {
        game.requestIpl(element);
    });
    remove.forEach(element => {
        game.removeIpl(element);
    });
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4981.012, -5712.747, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4984.134, -5709.249, 20.78103, true, 0, 0, 10);
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4990.681, -5715.106, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4987.587, -5718.635, 20.78103, true, 0, 0, 10);
	native.setDeepOceanScaler(0.0);
});

alt.onServer("freeroam:sendNotification", sendNotification);

function sendNotification(textColor, bgColor, message, blink){
    game.setColourOfNextTextComponent(textColor);
    game.setNotificationBackgroundColor(bgColor);
    game.setNotificationTextEntry("STRING");
    game.addTextComponentSubstringPlayerName(message);
    game.drawNotification(blink, false);
};

new alt.PointBlip(6500, -6500, 20).alpha = 0;
alt.setInterval(radar, 1);

function radar() {
	game.setRadarAsExteriorThisFrame();
	game.setRadarAsInteriorThisFrame(alt.hash("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);
};
