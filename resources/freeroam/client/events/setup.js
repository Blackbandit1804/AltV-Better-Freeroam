import * as alt from 'alt';
import * as native from "natives";

const createblip = async(pos, id, customnamestate, label) => {
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

const setupblips = async() => {
    native.pauseClock(true);
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

const playerstats = async() => {
    //set Infinite Oxygen
    let ped = native.playerPedId();
    native.setPedMaxTimeUnderwater(ped, 9999999980506448000.0);
};

alt.on("ConnectionComplete", setupblips);
alt.onServer("freeroam:playerstats", playerstats);