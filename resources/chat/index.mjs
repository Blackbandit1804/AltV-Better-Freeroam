import alt from "alt";
let cmdHandlers = {},
    mutedPlayers = new Map,
    rangedChat = !1,
    rangeOfChat = 25,
    cancelAllChat = !1;

function invokeCmd(e, t, a) {
    const n = cmdHandlers[t];
    n ? n(e, a) : send(e, `{FF0000} Unknown command /${t}`)
}

function Distance(e, t) {
    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2) + Math.pow(e.z - t.z, 2))
}
alt.onClient("chatmessage", (e, t) => {
    if ("/" === t[0]) {
        if ((t = t.trim().slice(1)).length > 0) {
            alt.log("[chat:cmd] " + e.name + ": /" + t);
            let a = t.split(" "),
                n = a.shift();
            invokeCmd(e, n, a)
        }
    } else {
        if (mutedPlayers.has(e.name) && mutedPlayers.get(e.name)) return void send(e, "{FF0000} You are currently muted.");
        if (cancelAllChat) return void alt.emit("chatIntercept", e, t);
        if ((t = t.trim()).length <= 0) return;
        if (alt.log("[==> CHAT] " + e.name + ": " + t), rangedChat) {
            var a = alt.Player.all.filter(t => Distance(e.pos, t.pos) <= rangeOfChat);
            if (a.length <= 0) return;
            var n = a.filter(t => Distance(e.pos, t.pos) <= rangeOfChat / 2),
                r = a.filter(t => Distance(e.pos, t.pos) >= rangeOfChat / 2);
            return n.forEach(a => {
                alt.emitClient(a, "chatmessage", e.name, t.replace(/</g, "&lt;").replace(/'/g, "&#39").replace(/"/g, "&#34"))
            }), void r.forEach(a => {
                alt.emitClient(a, "chatmessage", null, `{707070} ${e.name}: ${t.replace(/</g,"&lt;").replace(/'/g,"&#39").replace(/"/g,"&#34")}`)
            })
        }
        alt.emitClient(null, "chatmessage", e.name, t.replace(/</g, "&lt;").replace(/'/g, "&#39").replace(/"/g, "&#34"))
    }
});
export function send(e, t) {
    alt.emitClient(e, "chatmessage", null, t)
}
export function broadcast(e) {
    send(null, e)
}
export function registerCmd(e, t) {
    void 0 !== cmdHandlers[e] ? alt.logError(`Failed to register command /${e}, already registered`) : cmdHandlers[e] = t
}
export function mute(e) {
    mutedPlayers.set(e.name, !0)
}
export function unmute(e) {
    mutedPlayers.set(e.name, !1)
}
export function success(e) {
    broadcast(`{00FF00}[Success] ${e}`)
}
export function info(e) {
    broadcast(`{FFAB0F}[Info] ${e}`)
}
export function warning(e) {
    broadcast(`{FF8989}[Warning] ${e}`)
}
export function error(e) {
    broadcast(`{FF0000}[Error] ${e}`)
}
export function debug(e) {
    broadcast(`{FF00FF}[Debug] ${e}`)
}
export function setupPlayer(e) {
    e.sendMessage = (t => {
        send(e, t)
    }), e.mute = (t => {
        send(e, t ? "{FF0000} You were muted." : "{00FF00} You were unmuted."), mutedPlayers.set(e.name, t)
    })
}
alt.on("sendChatMessage", (e, t) => {
    send(e, t)
}), alt.on("broadcastMessage", e => {
    send(null, e)
});
export default {
    send: send,
    broadcast: broadcast,
    registerCmd: registerCmd,
    setupPlayer: setupPlayer,
    success: success,
    info: info,
    warning: warning,
    error: error,
    debug: debug
};