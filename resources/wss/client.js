import * as alt from "alt";
import * as native from "natives";
let loaded = !1,
    opened = !1;
const view = new alt.WebView("http://resource/html/index.html");

function menu(e) {
    opened = e, alt.showCursor(e), alt.toggleGameControls(!e), e ? view.focus() : view.unfocus(), view.emit("menu", e)
}

function promisify(e) {
    return new Promise((t, n) => {
        let o = alt.setInterval(() => {
            1 == e() && (t(!0), alt.clearInterval(o))
        }, 80)
    })
}
view.on("ready", () => {
    loaded = !0
}), view.on("menu", e => {
    menu(e)
}), view.on("select", e => {
    alt.emitServer("playerGiveWeapon", e)
}), alt.on("keyup", e => {
    loaded && (112 === e ? menu(!opened) : opened && 27 === e && menu(!1))
}), alt.log("[WSS] Client-Side Loaded.");