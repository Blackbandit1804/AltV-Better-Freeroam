using AltV.Net;
using System.Numerics;
using VnXGlobalSystems.Models;

namespace VnXGlobalSystems.Globals
{
    public class ServerEvents : IScript
    {
        /* Server Events */

        [ServerEvent("GlobalSystems:GiveWeapon")]
        public static void OnWeaponEventCall(PlayerModel player, uint WeaponHash, int ammo, bool selectWeapon) => player.GivePlayerWeapon(WeaponHash, ammo, selectWeapon);

        [ServerEvent("GlobalSystems:RemovePlayerWeapon")]
        public static void RemovePlayerWeapon(PlayerModel player, uint WeaponHash) => player.RemovePlayerWeapon(WeaponHash);

        [ServerEvent("GlobalSystems:RemoveAllPlayerWeapons")]
        public static void RemoveAllPlayerWeapon(PlayerModel player) => player.RemoveAllPlayerWeapons();

        [ServerEvent("GlobalSystems:KickPlayer")]
        public static void KickPlayer(PlayerModel player, string reason) => player.Kick(reason);

        ////////////////////////// Player Anticheat /////////////////////////////////////////////////////////
        [ServerEvent("GlobalSystems:PlayerGodmode")]
        public static void PlayerGodmode(PlayerModel player, bool Godmode) => player.SetPlayerGodmode(Godmode);

        [ServerEvent("GlobalSystems:PlayerProofs")]
        public static void Playerteam(PlayerModel player, bool BulletProof, bool FireProof, bool ExplosionProof, bool CollisionProof, bool MeleeProof, bool DrownProof) => player.SetPlayerProofs(BulletProof, FireProof, ExplosionProof, CollisionProof, MeleeProof, DrownProof);
    }
}