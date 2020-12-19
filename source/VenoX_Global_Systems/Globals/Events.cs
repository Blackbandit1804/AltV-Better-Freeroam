using AltV.Net;
using System.Threading;

namespace VnXGlobalSystems.Globals
{
    public class Events : IScript
    {
        ////////////////////////// Resource Start/Stop /////////////////////////////////////////////////////////
        public static void OnResourceStart()
        {
            Functions.timer = new Timer(Functions.OnUpdate, null, Constants.UPDATEINTERVAL, Constants.UPDATEINTERVAL);
            Functions.LoadMainFunctions();
            if (Constants.AWESOME_SNAKE_MODE)
                Core.Debug.WriteLogs("debug", "Server Started with Debug Mode true!");
        }
        public static void OnResourceStop()
        {
            Functions.UnloadMainFunctions();
        }

    }
}
