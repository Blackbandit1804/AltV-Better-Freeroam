let app = new Vue({
    el: "#app",
    data: {
        categories: ["All", "Melee", "Handguns", "Submachine Guns", "Shotguns", "Assault Rifles", "Ligth Maschine Guns", "Sinper Rifles", "Heavy Weapons", "Throwables", "Miscellaneous"],
        models: [{
            category: 1,
            model: "weapon_dagger"
        }, {
            category: 1,
            model: "weapon_bat"
        }, {
            category: 1,
            model: "weapon_bottle"
        }, {
            category: 1,
            model: "weapon_crowbar"
        }, {
            category: 1,
            model: "weapon_flashlight"
        }, {
            category: 1,
            model: "weapon_golfclub"
        }, {
            category: 1,
            model: "weapon_hammer"
        }, {
            category: 1,
            model: "weapon_hatchet"
        }, {
            category: 1,
            model: "weapon_knuckle"
        }, {
            category: 1,
            model: "weapon_knife"
        }, {
            category: 1,
            model: "weapon_machete"
        }, {
            category: 1,
            model: "weapon_switchblade"
        }, {
            category: 1,
            model: "weapon_nightstick"
        }, {
            category: 1,
            model: "weapon_wrench"
        }, {
            category: 1,
            model: "weapon_battleaxe"
        }, {
            category: 1,
            model: "weapon_poolcue"
        }, {
            category: 1,
            model: "weapon_stone_hatchet"
        }, {
            category: 2,
            model: "weapon_pistol"
        }, {
			category: 2,
            model: "weapon_gadgetpistol"
        }, {
            category: 2,
            model: "weapon_pistol_mk2"
        }, {
            category: 2,
            model: "weapon_combatpistol"
        }, {
            category: 2,
            model: "weapon_appistol"
        }, {
            category: 2,
            model: "weapon_stungun"
        }, {
            category: 2,
            model: "weapon_pistol50"
        }, {
            category: 2,
            model: "weapon_snspistol"
        }, {
            category: 2,
            model: "weapon_snspistol_mk2"
        }, {
            category: 2,
            model: "weapon_heavypistol"
        }, {
            category: 2,
            model: "weapon_vintagepistol"
        }, {
            category: 2,
            model: "weapon_flaregun"
        }, {
            category: 2,
            model: "weapon_marksmanpistol"
        }, {
            category: 2,
            model: "weapon_revolver"
        }, {
            category: 2,
            model: "weapon_revolver_mk2"
        }, {
            category: 2,
            model: "weapon_doubleaction"
        }, // { category: 2, model: "weapon_raypistol"}, 
        {
            category: 2,
            model: "weapon_ceramicpistol"
        }, {
            category: 2,
            model: "weapon_navyrevolver"
        }, {
            category: 3,
            model: "weapon_microsmg"
        }, {
            category: 3,
            model: "weapon_smg"
        }, {
            category: 3,
            model: "weapon_smg_mk2"
        }, {
            category: 3,
            model: "weapon_assaultsmg"
        }, {
            category: 3,
            model: "weapon_combatpdw"
        }, {
            category: 3,
            model: "weapon_machinepistol"
        }, {
            category: 3,
            model: "weapon_minismg"
        }, // { category: 3, model: "weapon_raycarbine"}, 
        {
            category: 4,
            model: "weapon_pumpshotgun"
        }, {
            category: 4,
            model: "weapon_combatshotgun"
        }, {
            category: 4,
            model: "weapon_pumpshotgun_mk2"
        }, {
            category: 4,
            model: "weapon_sawnoffshotgun"
        }, {
            category: 4,
            model: "weapon_assaultshotgun"
        }, {
            category: 4,
            model: "weapon_bullpupshotgun"
        }, {
            category: 4,
            model: "weapon_musket"
        }, {
            category: 4,
            model: "weapon_heavyshotgun"
        }, {
            category: 4,
            model: "weapon_dbshotgun"
        }, {
            category: 4,
            model: "weapon_autoshotgun"
        }, {
            category: 5,
            model: "weapon_assaultrifle"
        }, {
			category: 5,
            model: "weapon_militaryrifle"
        }, {
            category: 5,
            model: "weapon_assaultrifle_mk2"
        }, {
            category: 5,
            model: "weapon_carbinerifle"
        }, {
            category: 5,
            model: "weapon_carbinerifle_mk2"
        }, {
            category: 5,
            model: "weapon_advancedrifle"
        }, {
            category: 5,
            model: "weapon_specialcarbine"
        }, {
            category: 5,
            model: "weapon_specialcarbine_mk2"
        }, {
            category: 5,
            model: "weapon_bullpuprifle"
        }, {
            category: 5,
            model: "weapon_bullpuprifle_mk2"
        }, {
            category: 5,
            model: "weapon_compactrifle"
        }, {
            category: 6,
            model: "weapon_mg"
        }, {
            category: 6,
            model: "weapon_combatmg"
        }, {
            category: 6,
            model: "weapon_combatmg_mk2"
        }, {
            category: 6,
            model: "weapon_gusenberg"
        }, {
            category: 7,
            model: "weapon_sniperrifle"
        }, {
            category: 7,
            model: "weapon_heavysniper"
        }, {
            category: 7,
            model: "weapon_heavysniper_mk2"
        }, {
            category: 7,
            model: "weapon_marksmanrifle"
        }, {
            category: 7,
            model: "weapon_marksmanrifle_mk2"
        }, {
            category: 8,
            model: "weapon_rpg"
        }, {
            category: 8,
            model: "weapon_grenadelauncher"
        }, {
            category: 8,
            model: "weapon_grenadelauncher_smoke"
        }, {
            category: 8,
            model: "weapon_minigun"
        }, {
            category: 8,
            model: "weapon_firework"
        }, {
            category: 8,
            model: "weapon_railgun"
        }, {
            category: 8,
            model: "weapon_hominglauncher"
        }, {
            category: 8,
            model: "weapon_compactlauncher"
        }, // { category: 8, model: "weapon_rayminigun"}, 
        {
            category: 9,
            model: "weapon_grenade"
        }, {
            category: 9,
            model: "weapon_bzgas"
        }, {
            category: 9,
            model: "weapon_molotov"
        }, {
            category: 9,
            model: "weapon_stickybomb"
        }, {
            category: 9,
            model: "weapon_proxmine"
        }, {
            category: 9,
            model: "weapon_snowball"
        }, {
            category: 9,
            model: "weapon_pipebomb"
        }, {
            category: 9,
            model: "weapon_ball"
        }, {
            category: 9,
            model: "weapon_smokegrenade"
        }, {
            category: 9,
            model: "weapon_flare"
        }, {
            category: 10,
            model: "weapon_petrolcan"
        }, {
            category: 10,
            model: "weapon_fireextinguisher"
        }, {
            category: 10,
            model: "weapon_hazardcan"
        }],
        keyword: "",
        storage: [],
        visible: !1
    },
    watch: {
        keyword: function(e) {
            e.length > 0 ? this.storage = this.models.filter(o => o.model.toLocaleLowerCase().includes(e.toLowerCase())) : this.storage = []
        }
    },
    methods: {
        close() {
            this.visible = !1, alt.emit("menu", !1)
        },
        select(e) {
            alt.emit("select", e)
        }
    }
});