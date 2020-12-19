using System;
using VnXGlobalSystems.Globals;
using VnXGlobalSystems.Models;

namespace VnXGlobalSystems.Anticheat
{
    public class Main
    {
        
        public static void AntiGodmode(PlayerModel playerClass)
        {
            try
            {
                playerClass.Emit("VnXGlobalSystemsClient:SetProofs", playerClass.Proofs.BulletProof, playerClass.Proofs.FireProof, playerClass.Proofs.ExplosionProof, playerClass.Proofs.CollisionProof, playerClass.Proofs.MeleeProof, playerClass.Proofs.DrownProof);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        public static void AntiFly(PlayerModel playerClass)
        {
            try
            {
                if (playerClass.IsInVehicle || playerClass.NextFlyUpdate >= DateTime.Now || playerClass.Position.Z > 150) return;
                if (playerClass.EntityIsFlying)
                {
                    if (playerClass.FlyTicks > 5)
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        //Core.Debug.OutputDebugString("[INFO] : " + playerClass.Name + " got kicked! Reason : Fly-Anticheat!");
                        Core.Debug.WriteLogs("Anticheat", "[INFO] : " + playerClass.Name + " got kicked! Reason : Fly-Anticheat!");
                        Console.ResetColor();
                        string reason = "[VenoX Global Systems " + Constants.VNXGLOBALSYSTEMSVERSION + "] : Kicked by Anticheat";
                        playerClass.KickPlayer(reason);
                    }
                    playerClass.NextFlyUpdate = DateTime.Now.AddSeconds(3);
                }
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        
        public static void CheckWeapons(PlayerModel playerClass)
        {
            try
            {
                if (playerClass.Health <= 0 || playerClass.IsDead) return;
                if (playerClass.CurrentWeapon == (uint)AltV.Net.Enums.WeaponModel.Fist || playerClass.CurrentWeapon == 0 || playerClass.LastWeapon == playerClass.CurrentWeapon) return;
                if (!playerClass.Weapons.Contains(playerClass.CurrentWeapon))
                {
                    if (playerClass.WeaponTickCheck >= 3)
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Core.Debug.WriteLogs("Anticheat", "[INFO] : " + playerClass.Name + " got kicked! Reason : Weapon-Anticheat! [" + playerClass.CurrentWeapon + "][" + (AltV.Net.Enums.WeaponModel)playerClass.CurrentWeapon + "]");
                        Console.ResetColor();
                        string reason = "[VenoX Global Systems " + Constants.VNXGLOBALSYSTEMSVERSION + "] : Kicked by Anticheat";
                        playerClass.LastWeapon = playerClass.CurrentWeapon;
                        playerClass.RemoveAllWeapons();
                        playerClass.KickPlayer(reason);
                    }
                    playerClass.WeaponTickCheck += 1;
                    return;
                }
                playerClass.WeaponTickCheck = 0;
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        public static void CheckTick(PlayerModel playerClass)
        {
            try
            {
                if (playerClass.NextTickUpdate <= DateTime.Now)
                {
                    playerClass.NextTickUpdate = DateTime.Now.AddSeconds(7); // Just to fix the spam.
                    playerClass.KickPlayer("Connection to VenoX-Global-Systems lost.");
                    Core.Debug.WriteLogs("Anticheat", "[INFO] : " + playerClass.Name + " got kicked! Reason : Tick-Anticheat! [" + playerClass.NextTickUpdate + "]");
                }
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void CheckEmits(PlayerModel playerClass)
        {
            try
            {
                if (playerClass.EventCallCounter >= Constants.PLAYER_KICK_AFTER_EMITS)
                {
                    playerClass.Kick("Connection to VenoX-Global-Systems lost.");
                    //playerClass.KickPlayer("Connection to VenoX-Global-Systems lost.");
                    Core.Debug.WriteLogs("Anticheat", "[INFO] : " + playerClass.Name + " got kicked! Reason : Emit-Anticheat! [" + playerClass.EventCallCounter + "]");
                }
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
    }
}
