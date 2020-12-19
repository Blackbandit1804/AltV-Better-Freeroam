using System;
using System.Numerics;
using VnXGlobalSystems.Models;

namespace VnXGlobalSystems.Globals
{
    public static class EventFunctions
    {
        /* Event Functions */
        public static void SetPlayerGodmode(this PlayerModel player, bool EntityGodmode)
        {
            try
            {
                player.EntityGodmode = EntityGodmode;
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
        public static void SetPlayerProofs(this PlayerModel player, bool BulletProof, bool FireProof, bool ExplosionProof, bool CollisionProof, bool MeleeProof, bool DrownProof)
        {
            try
            {
                player.Proofs.BulletProof = BulletProof;
                player.Proofs.FireProof = FireProof;
                player.Proofs.ExplosionProof = ExplosionProof;
                player.Proofs.CollisionProof = CollisionProof;
                player.Proofs.MeleeProof = MeleeProof;
                player.Proofs.DrownProof = DrownProof;
                Anticheat.Main.AntiGodmode(player);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void KickPlayer(this PlayerModel player, string reason)
        {
            try
            {
                player.Emit("VnXGlobalSystemsClient:Kick", reason);
                player.IsKicked = true;
                player.KickedDateTime = DateTime.Now.AddSeconds(10);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void GivePlayerWeapon(this PlayerModel player, uint WeaponHash, int ammo, bool selectWeapon)
        {
            try
            {
                if (player == null) return;
                player.Weapons.Add(WeaponHash);
                player.GiveWeapon(WeaponHash, ammo, selectWeapon);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void RemovePlayerWeapon(this PlayerModel player, uint WeaponHash)
        {
            try
            {
                if (player == null) return;
                player.RemoveWeapon(WeaponHash); player.Weapons.Remove(WeaponHash);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void RemoveAllPlayerWeapons(this PlayerModel player)
        {
            try { if (player == null) { return; } player.RemoveAllWeapons(); player.Weapons.Clear(); }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        public static void SetNextTick(this PlayerModel player)
        {
            try
            {
                if (player == null) return;
                player.NextTickUpdate = DateTime.Now.AddSeconds(Constants.PLAYER_TICK_INTERVAL);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }
    }
}
