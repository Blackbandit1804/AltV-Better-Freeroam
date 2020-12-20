using AltV.Net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using VnXGlobalSystems.Models;

namespace VnXGlobalSystems.Globals
{
    public class Functions
    {
        public static Timer timer;
        public static AnticheatModel AnticheatModel;
        public static WeaponModel WeaponModel;
        public static GeneralModel GeneralModel;
        public static void LoadAnticheatConfig()
        {
            try
            {
                Console.ResetColor();
                Core.Debug.OutputLog("-------- Global Systems AntiFly = [ON] --------", ConsoleColor.Green);
                Core.Debug.OutputLog("-------- Global Systems AntiGodmode = [ON] --------", ConsoleColor.Green); LoadWeaponDamageConfig();
                Core.Debug.OutputLog("-------- Global Systems CheckWeapons = [ON] --------", ConsoleColor.Green);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        public static void OnUpdate(Object unused)
        {
            try
            {
                foreach (PlayerModel player in Main.ConnectedPlayers.ToList())
                {
                    if (player is null || !player.Exists) continue;
                    Anticheat.Main.CheckTick(player);
                    Anticheat.Main.AntiFly(player);
                    Anticheat.Main.CheckWeapons(player);
                    Anticheat.Main.CheckEmits(player);
                    if (Constants.NEXT_INGAME_NATIVE_CALL <= DateTime.Now)
                    {
                        Anticheat.Main.AntiGodmode(player);
                    }
                    if (Constants.NEXT_INGAME_EVENT_CALL_RESET <= DateTime.Now)
                    {
                        player.EventCallCounter = 0;
                        //Core.Debug.OutputDebugString("EventCallCounter : " + player.EventCallCounter);
                    }
                }
                if (Constants.NEXT_INGAME_BAN_CHECK <= DateTime.Now) Constants.NEXT_INGAME_BAN_CHECK = DateTime.Now.AddMinutes(Constants.INGAME_BAN_REFRESH_RATE);
                if (Constants.NEXT_INGAME_NATIVE_CALL <= DateTime.Now) Constants.NEXT_INGAME_NATIVE_CALL = DateTime.Now.AddMinutes(Constants.INGAME_NATIVE_CALL_RATE);
                if (Constants.NEXT_INGAME_EVENT_CALL_RESET <= DateTime.Now) Constants.NEXT_INGAME_EVENT_CALL_RESET = DateTime.Now.AddMinutes(Constants.INGAME_EVENT_CALL_RESET_RATE);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        public static void LoadMainFunctions()
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("------------------------------------------------------------------------");
            Console.WriteLine("-------- VenoX Global Systems is starting... --------");
            Console.WriteLine("-------- " + Constants.VNXGLOBALSYSTEMSVERSION + " --------");
            Console.WriteLine("-------- Loading Config File.... --------");
            Console.WriteLine("---------------------------------------------");
            //
            Console.ResetColor();
            //
            Core.Debug.OutputLog("-------- [Settings] : Anticheat Active! --------", ConsoleColor.Green);
            //
            Core.Debug.OutputLog("-------- [VenoX Global Systems started] --------", ConsoleColor.DarkGreen);
            //
            LoadAnticheatConfig();
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine("------------------------------------------------------------------------");
            Console.ResetColor();
        }
        public static void UnloadMainFunctions()
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("------------------------------------------------------------------------");
            Console.WriteLine("-------- VenoX Global Systems is stopping... --------");
            Console.WriteLine("-------- " + Constants.VNXGLOBALSYSTEMSVERSION + " --------");
            Console.WriteLine("-------- VenoX Global Systems stopped --------");
            Console.WriteLine("------------------------------------------------------------------------");
        }
        public static void LoadWeaponDamageConfig()
        {
            string jsonString = "{\"Headshot\":true,\"HeadDamage\":true,\"HeadDamageMultiplier\":1.9,\"SniperHeadshotOneshot\":false,\"SniperRifle\":20,\"FireExtinguisher\":20,\"CompactGrenadeLauncher\":20,\"Snowballs\":20,\"VintagePistol\":20,\"CombatPDW\":20,\"HeavySniperMkII\":20,\"HeavySniper\":20,\"SweeperShotgun\":20,\"MicroSMG\":20,\"PipeWrench\":20,\"Pistol\":20,\"PumpShotgun\":20,\"APPistol\":20,\"Baseball\":20,\"MolotovCocktail\":20,\"SMG\":20,\"StickyBomb\":20,\"JerryCan\":20,\"StunGun\":20,\"StoneHatchet\":20,\"AussaultRifleMkII\":20,\"HeavyShotgun\":20,\"Minigun\":20,\"GolfClub\":20,\"UnholyHellbringer\":20,\"FlareGun\":20,\"Flare\":20,\"GrenadeLauncherSmoke\":20,\"Hammer\":20,\"PumpShotgunMkII\":20,\"CombatPistol\":20,\"GusenbergSweeper\":20,\"CompactRifle\":20,\"HomingLauncher\":20,\"Nightstick\":20,\"MarksmanRifleMkII\":20,\"Railgun\":20,\"SawedOffShotgun\":20,\"SMGMkII\":20,\"BullpupRifle\":20,\"FireworkLauncher\":20,\"CombatMG\":20,\"CarbineRifle\":20,\"Crowbar\":20,\"BullpupRifleMkII\":20,\"SNSPistolMkII\":20,\"Flashlight\":20,\"AntiqueCavalryDagger\":20,\"Grenade\":20,\"PoolCue\":20,\"BaseballBat\":20,\"SpecialCarbineMkII\":20,\"DoubleActionRevolver\":20,\"Pistol50\":20,\"Knife\":20,\"MG\":20,\"BullpupShotgun\":20,\"BZGas\":20,\"Fist\":20,\"GrenadeLauncher\":20,\"Musket\":20,\"ProximityMines\":20,\"AdvancedRifle\":20,\"UpnAtomizer\":20,\"RPG\":20,\"Widowmaker\":20,\"PipeBombs\":20,\"MiniSMG\":20,\"SNSPistol\":20,\"PistolMkII\":20,\"AssaultRifle\":20,\"SpecialCarbine\":20,\"HeavyRevolver\":20,\"MarksmanRifle\":20,\"HeavyRevolverMkII\":20,\"BattleAxe\":20,\"HeavyPistol\":20,\"BrassKnuckles\":20,\"MachinePistol\":20,\"CombatMGMkII\":20,\"MarksmanPistol\":20,\"Machete\":20,\"Switchblade\":20,\"AssaultShotgun\":20,\"DoubleBarrelShotgun\":20,\"AssaultSMG\":20,\"Hatchet\":20,\"BrokenBottle\":20,\"CarbineRifleMkII\":20,\"TearGas\":20}";
            WeaponModel = JsonSerializer.Deserialize<WeaponModel>(jsonString);
            Console.ResetColor();
            Core.Debug.OutputLog("~~~~~~~~~~~~  [Weapon-Config]    ~~~~~~~~~~~~~~", ConsoleColor.Cyan);

            if (WeaponModel.Headshot) Core.Debug.OutputLog("-------- Global Systems Headshot = [ON] --------", ConsoleColor.Green);
            else Core.Debug.OutputLog("-------- Global Systems Headshot = [OFF] --------", ConsoleColor.Red);

            if (WeaponModel.HeadDamage) Core.Debug.OutputLog("-------- Global Systems HeadDamage = [ON] --------", ConsoleColor.Green);
            else Core.Debug.OutputLog("-------- Global Systems HeadDamage = [OFF] --------", ConsoleColor.Red);

            Constants.DamageList = new Dictionary<AltV.Net.Enums.WeaponModel, float>
            {
                { AltV.Net.Enums.WeaponModel.SniperRifle, WeaponModel.SniperRifle },
                { AltV.Net.Enums.WeaponModel.FireExtinguisher, WeaponModel.FireExtinguisher },
                { AltV.Net.Enums.WeaponModel.CompactGrenadeLauncher, WeaponModel.CompactGrenadeLauncher },
                { AltV.Net.Enums.WeaponModel.Snowballs, WeaponModel.Snowballs },
                { AltV.Net.Enums.WeaponModel.VintagePistol, WeaponModel.VintagePistol },
                { AltV.Net.Enums.WeaponModel.CombatPDW, WeaponModel.CombatPDW },
                { AltV.Net.Enums.WeaponModel.HeavySniperMkII, WeaponModel.HeavySniperMkII },
                { AltV.Net.Enums.WeaponModel.HeavySniper, WeaponModel.HeavySniper },
                { AltV.Net.Enums.WeaponModel.SweeperShotgun, WeaponModel.SweeperShotgun },
                { AltV.Net.Enums.WeaponModel.MicroSMG, WeaponModel.MicroSMG },
                { AltV.Net.Enums.WeaponModel.PipeWrench, WeaponModel.PipeWrench },
                { AltV.Net.Enums.WeaponModel.Pistol, WeaponModel.Pistol },
                { AltV.Net.Enums.WeaponModel.PumpShotgun, WeaponModel.PumpShotgun },
                { AltV.Net.Enums.WeaponModel.APPistol, WeaponModel.APPistol },
                { AltV.Net.Enums.WeaponModel.Baseball, WeaponModel.Baseball },
                { AltV.Net.Enums.WeaponModel.MolotovCocktail, WeaponModel.MolotovCocktail },
                { AltV.Net.Enums.WeaponModel.SMG, WeaponModel.SMG },
                { AltV.Net.Enums.WeaponModel.StickyBomb, WeaponModel.StickyBomb },
                { AltV.Net.Enums.WeaponModel.JerryCan, WeaponModel.JerryCan },
                { AltV.Net.Enums.WeaponModel.StunGun, WeaponModel.StunGun },
                { AltV.Net.Enums.WeaponModel.StoneHatchet, WeaponModel.StoneHatchet },
                { AltV.Net.Enums.WeaponModel.AssaultRifleMkII, WeaponModel.AussaultRifleMkII },
                { AltV.Net.Enums.WeaponModel.HeavyShotgun, WeaponModel.HeavyShotgun },
                { AltV.Net.Enums.WeaponModel.Minigun, WeaponModel.Minigun },
                { AltV.Net.Enums.WeaponModel.GolfClub, WeaponModel.GolfClub },
                { AltV.Net.Enums.WeaponModel.UnholyHellbringer, WeaponModel.UnholyHellbringer },
                { AltV.Net.Enums.WeaponModel.FlareGun, WeaponModel.FlareGun },
                { AltV.Net.Enums.WeaponModel.Flare, WeaponModel.Flare },
                { AltV.Net.Enums.WeaponModel.GrenadeLauncherSmoke, WeaponModel.GrenadeLauncherSmoke },
                { AltV.Net.Enums.WeaponModel.Hammer, WeaponModel.Hammer },
                { AltV.Net.Enums.WeaponModel.PumpShotgunMkII, WeaponModel.PumpShotgunMkII },
                { AltV.Net.Enums.WeaponModel.CombatPistol, WeaponModel.CombatPistol },
                { AltV.Net.Enums.WeaponModel.GusenbergSweeper, WeaponModel.GusenbergSweeper },
                { AltV.Net.Enums.WeaponModel.CompactRifle, WeaponModel.CompactRifle },
                { AltV.Net.Enums.WeaponModel.HomingLauncher, WeaponModel.HomingLauncher },
                { AltV.Net.Enums.WeaponModel.Nightstick, WeaponModel.Nightstick },
                { AltV.Net.Enums.WeaponModel.MarksmanRifleMkII, WeaponModel.MarksmanRifleMkII },
                { AltV.Net.Enums.WeaponModel.Railgun, WeaponModel.Railgun },
                { AltV.Net.Enums.WeaponModel.SawedOffShotgun, WeaponModel.SawedOffShotgun },
                { AltV.Net.Enums.WeaponModel.SMGMkII, WeaponModel.SMGMkII },
                { AltV.Net.Enums.WeaponModel.BullpupRifle, WeaponModel.BullpupRifle },
                { AltV.Net.Enums.WeaponModel.FireworkLauncher, WeaponModel.FireworkLauncher },
                { AltV.Net.Enums.WeaponModel.CombatMG, WeaponModel.CombatMG },
                { AltV.Net.Enums.WeaponModel.CarbineRifle, WeaponModel.CarbineRifle },
                { AltV.Net.Enums.WeaponModel.Crowbar, WeaponModel.Crowbar },
                { AltV.Net.Enums.WeaponModel.BullpupRifleMkII, WeaponModel.BullpupRifleMkII },
                { AltV.Net.Enums.WeaponModel.SNSPistolMkII, WeaponModel.SNSPistolMkII },
                { AltV.Net.Enums.WeaponModel.Flashlight, WeaponModel.Flashlight },
                { AltV.Net.Enums.WeaponModel.AntiqueCavalryDagger, WeaponModel.AntiqueCavalryDagger },
                { AltV.Net.Enums.WeaponModel.Grenade, WeaponModel.Grenade },
                { AltV.Net.Enums.WeaponModel.PoolCue, WeaponModel.PoolCue },
                { AltV.Net.Enums.WeaponModel.BaseballBat, WeaponModel.BaseballBat },
                { AltV.Net.Enums.WeaponModel.SpecialCarbineMkII, WeaponModel.SpecialCarbineMkII },
                { AltV.Net.Enums.WeaponModel.DoubleActionRevolver, WeaponModel.DoubleActionRevolver },
                { AltV.Net.Enums.WeaponModel.Pistol50, WeaponModel.Pistol50 },
                { AltV.Net.Enums.WeaponModel.Knife, WeaponModel.Knife },
                { AltV.Net.Enums.WeaponModel.MG, WeaponModel.MG },
                { AltV.Net.Enums.WeaponModel.BullpupShotgun, WeaponModel.BullpupShotgun },
                { AltV.Net.Enums.WeaponModel.BZGas, WeaponModel.BZGas },
                { AltV.Net.Enums.WeaponModel.Fist, WeaponModel.Fist },
                { AltV.Net.Enums.WeaponModel.GrenadeLauncher, WeaponModel.GrenadeLauncher },
                { AltV.Net.Enums.WeaponModel.Musket, WeaponModel.Musket },
                { AltV.Net.Enums.WeaponModel.ProximityMines, WeaponModel.ProximityMines },
                { AltV.Net.Enums.WeaponModel.AdvancedRifle, WeaponModel.AdvancedRifle },
                { AltV.Net.Enums.WeaponModel.UpnAtomizer, WeaponModel.UpnAtomizer },
                { AltV.Net.Enums.WeaponModel.RPG, WeaponModel.RPG },
                { AltV.Net.Enums.WeaponModel.Widowmaker, WeaponModel.Widowmaker },
                { AltV.Net.Enums.WeaponModel.PipeBombs, WeaponModel.PipeBombs },
                { AltV.Net.Enums.WeaponModel.MiniSMG, WeaponModel.MiniSMG },
                { AltV.Net.Enums.WeaponModel.SNSPistol, WeaponModel.SNSPistol },
                { AltV.Net.Enums.WeaponModel.PistolMkII, WeaponModel.PistolMkII },
                { AltV.Net.Enums.WeaponModel.AssaultRifle, WeaponModel.AssaultRifle },
                { AltV.Net.Enums.WeaponModel.SpecialCarbine, WeaponModel.SpecialCarbine },
                { AltV.Net.Enums.WeaponModel.HeavyRevolver, WeaponModel.HeavyRevolver },
                { AltV.Net.Enums.WeaponModel.MarksmanRifle, WeaponModel.MarksmanRifle },
                { AltV.Net.Enums.WeaponModel.HeavyRevolverMkII, WeaponModel.HeavyRevolverMkII },
                { AltV.Net.Enums.WeaponModel.BattleAxe, WeaponModel.BattleAxe },
                { AltV.Net.Enums.WeaponModel.HeavyPistol, WeaponModel.HeavyPistol },
                { AltV.Net.Enums.WeaponModel.BrassKnuckles, WeaponModel.BrassKnuckles },
                { AltV.Net.Enums.WeaponModel.MachinePistol, WeaponModel.MachinePistol },
                { AltV.Net.Enums.WeaponModel.CombatMGMkII, WeaponModel.CombatMGMkII },
                { AltV.Net.Enums.WeaponModel.MarksmanPistol, WeaponModel.MarksmanPistol },
                { AltV.Net.Enums.WeaponModel.Machete, WeaponModel.Machete },
                { AltV.Net.Enums.WeaponModel.Switchblade, WeaponModel.Switchblade },
                { AltV.Net.Enums.WeaponModel.AssaultShotgun, WeaponModel.AssaultShotgun },
                { AltV.Net.Enums.WeaponModel.DoubleBarrelShotgun, WeaponModel.DoubleBarrelShotgun },
                { AltV.Net.Enums.WeaponModel.AssaultSMG, WeaponModel.AssaultSMG },
                { AltV.Net.Enums.WeaponModel.Hatchet, WeaponModel.Hatchet },
                { AltV.Net.Enums.WeaponModel.BrokenBottle, WeaponModel.BrokenBottle },
                { AltV.Net.Enums.WeaponModel.CarbineRifleMkII, WeaponModel.CarbineRifleMkII },
                { AltV.Net.Enums.WeaponModel.TearGas, WeaponModel.TearGas },
            };
            if (!Constants.AWESOME_SNAKE_MODE) return;
            int c = 0;
            foreach (var weaponmodel in Constants.DamageList)
                Core.Debug.OutputDebugString("[" + ++c + "]--- WeaponModel loaded " + weaponmodel.Key + " | " + weaponmodel.Value + " ---");
        }
    }
}
