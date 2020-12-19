using AltV.Net;
using System;
using VnXGlobalSystems.Models;

namespace VnXGlobalSystems.Globals
{
    public class ClientEvents : IScript
    {
        /* Client Events */

        [ClientEvent("VnXGlobalSystems:KickPlayer")]
        public static void KickPlayer(PlayerModel player, string Reason = "")
        {
            try
            {
                player.Kick(Reason);
            }
            catch (Exception ex) { Core.Debug.CatchExceptions(ex); }
        }

        [ClientEvent("VnXGlobalSystems:OnTickCall")]
        public static void OnPlayerTickCall(PlayerModel player) => player.SetNextTick();

    }
}
