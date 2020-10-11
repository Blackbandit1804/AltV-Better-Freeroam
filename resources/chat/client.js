import * as alt from "alt";
import * as game from "natives";
let buffer = [],
    loaded = !1,
    opened = !1,
    hidden = !1,
    view = new alt.WebView("http://resource/html/index.html");

function addMessage(e, t) {
    e ? view.emit("addMessage", e, t) : view.emit("addString", t)
}
view.on("chatloaded", () => {
    for (const e of buffer) addMessage(e.name, e.text);
    loaded = !0
}), view.on("chatmessage", e => {
    alt.emitServer("chatmessage", e), void 0 !== e && e.length >= 1 && alt.emit("messageSent", e), opened = !1, alt.emit("chatClosed"), alt.toggleGameControls(!0)
});
export function pushMessage(e, t) {
    loaded ? addMessage(e, t) : buffer.push({
        name: e,
        text: t
    })
}
export function pushLine(e) {
    pushMessage(null, e)
}
export function isChatHidden() {
    return hidden
}
export function isChatOpen() {
    return opened
}
alt.onServer("chatmessage", pushMessage), alt.on("keyup", e => {
    loaded && (!opened && 84 === e && alt.gameControlsEnabled() ? (opened = !0, view.emit("openChat", !1), alt.emit("chatOpened"), alt.toggleGameControls(!1)) : !opened && 191 === e && alt.gameControlsEnabled() ? (opened = !0, view.emit("openChat", !0), alt.emit("chatOpened"), alt.toggleGameControls(!1)) : opened && 27 == e && (opened = !1, view.emit("closeChat"), alt.emit("chatClosed"), alt.toggleGameControls(!0)), 118 == e && (hidden = !hidden, game.displayHud(!hidden), game.displayRadar(!hidden), view.emit("hideChat", hidden)))
});
export default {
    pushMessage: pushMessage,
    pushLine: pushLine,
    isChatHidden: isChatHidden,
    isChatOpen: isChatOpen
};