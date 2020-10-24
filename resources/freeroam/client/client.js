"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from 'alt';
import * as game from 'natives';
import * as native from 'natives';

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
        "railing_start",
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
        "canyonriver01",
        "canyonriver01_lod",
        "cs3_05_water_grp1",
        "cs3_05_water_grp1_lod",
        "trv1_trail_start",
        "CanyonRvrShallow"
    ]
    var remove = [
        "FIBlobbyfake",
        "farm_burnt",
        "farm_burnt_lod",
        "farm_burnt_props",
        "farmint_cap",
        "farmint_cap_lod",
        "CS1_02_cf_offmission",
        "hei_bi_hw1_13_door",
        "v_carshowroom",
        "shutter_open",
        "shutter_closed",
        "shr_int",
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
        "RC12B_Fixed"
    ]
    alt.requestIpl('ex_dt1_02_office_02b');
    request.forEach(element => {
        game.requestIpl(element);
    });
    remove.forEach(element => {
        game.removeIpl(element);
    });
});

alt.onServer("freeroam:sendNotification", sendNotification);

function sendNotification(textColor, bgColor, message, blink){
    game.setColourOfNextTextComponent(textColor);
    game.setNotificationBackgroundColor(bgColor);
    game.setNotificationTextEntry("STRING");
    game.addTextComponentSubstringPlayerName(message);
    game.drawNotification(blink, false);
}