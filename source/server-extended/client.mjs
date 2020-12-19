import alt from "alt";
import * as native from "natives";
var helpText, subtitle, loading, contextMenu, blips = new Map,
	markers = new Map,
	keybinds = new Map,
	messagesAboveHead = [],
	totalBlips = 0,
	totalMarkers = 0,
	drawHud = !0,
	drawCursor = !1,
	isChatOpen = !1;
class Marker
{
	constructor(e, t, o, i, r, a, n, s, l, d)
	{
		this.type = e, this.pos = t, this.dir = o, this.rot = i, this.scale = r, this.color = a, this.deleteOnEnter = s, this.markForDelete = !1, this.range = l, void 0 !== n && (this.color2 = n), null == o && (this.dir = {
			x: 0,
			y: 0,
			z: 0
		}), null == i && (this.rot = {
			x: 0,
			y: 0,
			z: 0
		}), null == d ? (totalMarkers += 1, this.uniqueID = `${totalMarkers}`) : this.uniqueID = d, markers.set(d, this)
	}
	Draw()
	{
		if (this.markForDelete) return void markers.delete(this.uniqueID);
		let e = Distance(alt.Player.local.pos, this.pos);
		this.deleteOnEnter && e <= this.range && (this.markForDelete = !0), void 0 !== this.color2 && e <= this.range ? native.drawMarker(this.type, this.pos.x, this.pos.y, this.pos.z, this.dir.x, this.dir.y, this.dir.z, this.rot.x, this.rot.y, this.rot.z, this.scale.x, this.scale.y, this.scale.z, this.color2.r, this.color2.g, this.color2.b, this.color2.alpha, !1, !1, 2, !1, void 0, void 0, !1) : native.drawMarker(this.type, this.pos.x, this.pos.y, this.pos.z, this.dir.x, this.dir.y, this.dir.z, this.rot.x, this.rot.y, this.rot.z, this.scale.x, this.scale.y, this.scale.z, this.color.r, this.color.g, this.color.b, this.color.alpha, !1, !1, 2, !1, void 0, void 0, !1)
	}
}
export class HelpText
{
	constructor(e, t)
	{
		this.text = e, this.time = Date.now() + t, helpText = this
	}
	Draw()
	{
		this.time < Date.now() && (helpText = void 0), native.beginTextCommandDisplayHelp("STRING"), native.addTextComponentSubstringPlayerName(this.text), native.endTextCommandDisplayHelp(0, !1, !0, 0)
	}
}
export class Subtitle
{
	constructor(e, t)
	{
		this.alpha = 255, this.text = e, this.time = Date.now() + t, this.res = native.getActiveScreenResolution(0, 0), subtitle = this
	}
	Draw()
	{
		this.time < Date.now() && (this.alpha -= 1), this.alpha <= 10 ? subtitle = void 0 : drawText(this.text, .5, .85, .8, 4, 255, 255, 255, this.alpha, !0)
	}
}
export class Loading
{
	constructor(e, t, o, i)
	{
		this.text = e, this.type = o, this.toggled = i, null != t && (this.time = Date.now() + t), loading = this, native.removeLoadingPrompt(), native.beginTextCommandBusyString("STRING"), native.addTextComponentSubstringPlayerName(this.text), native.endTextCommandBusyString(this.type)
	}
	Draw()
	{
		this.time < Date.now() && (loading = void 0, native.removeLoadingPrompt()), null === this.toggled || void 0 === this.toggled || this.toggled || (loading = void 0, native.removeLoadingPrompt())
	}
}
class KeyBind
{
	constructor(e, t, o)
	{
		this.key = e.toUpperCase(), this.eventNameToCall = t, this.isServer = o, keybinds.set(e, this)
	}
	Press()
	{
		null == this.press && (this.press = !0, this.isServer ? alt.emitServer(this.eventNameToCall) : alt.emit(this.eventNameToCall))
	}
	Release()
	{
		this.press = void 0
	}
}
class ContextMenu
{
	constructor(e, t, o)
	{
		this.show = !1, this.pos = e, this.itemHeight = t, this.itemWidth = o, this.items = [], contextMenu = this
	}
	AppendItem(e, t)
	{
		this.items.push(
		{
			text: e,
			event: t
		})
	}
	ShowMenu(e)
	{
		this.show = e, this.isContextOpen = !0
	}
	Draw()
	{
		if (this.show)
		{
			native.showCursorThisFrame();
			var e = native.getScreenCoordFromWorldCoord(this.pos.x, this.pos.y, this.pos.z, void 0, void 0);
			if (e[0])
				for (var t = 0; t < this.items.length; t++)
				{
					let o = native.getTextScaleHeight(.5, 4),
						i = o / 4 + o;
					this.isHovered(e[1], e[2] + t * i, this.itemWidth, i) ? (this.isPressed(t), this.drawRectangle(e[1], e[2] + t * i, this.itemWidth, i, 0, 0, 0, 100), this.drawContextText(this.items[t].text, e[1], e[2] + t * i, .5, 255, 255, 255, 255, 4, 0, !1, !0, o)) : (this.drawRectangle(e[1], e[2] + t * i, this.itemWidth, i, 0, 0, 0, 200), this.drawContextText(this.items[t].text, e[1], e[2] + t * i, .5, 255, 255, 255, 200, 4, 0, !1, !0, o))
				}
		}
	}
	isHovered(e, t, o, i)
	{
		var r = GetMousePOS();
		return !(r.x < e - o / 2) && (!(r.x > e + o / 2) && (!(r.y < t - i / 2) && !(r.y > t + i / 2)))
	}
	isPressed(e)
	{
		native.isDisabledControlJustPressed(0, 24) && (this.isContextOpen = !1, contextMenu = void 0, alt.emit(this.items[e].event, this.pos))
	}
	drawRectangle(e, t, o, i, r, a, n, s)
	{
		native.drawRect(e, t, o, i, r, a, n, s)
	}
	drawContextText(e, t, o, i, r, a, n, s, l, d, h, v, c)
	{
		native.setTextScale(1, i), native.setTextFont(l), native.setTextColour(r, a, n, s), native.setTextJustification(d), h && native.setTextDropshadow(0, 0, 0, 0, 255), v && native.setTextOutline(), native.beginTextCommandDisplayText("STRING"), native.addTextComponentSubstringPlayerName(e), native.endTextCommandDisplayText(t, o - c / 2)
	}
}
alt.on("keydown", e =>
{
	(27 == e && isChatOpen || 13 == e && isChatOpen) && (isChatOpen = !1), e != "T".charCodeAt(0) || isChatOpen || (isChatOpen = !0), isChatOpen || keybinds.forEach((t, o) =>
	{
		e === o.charCodeAt(0) && t.Press()
	})
}), alt.on("keyup", e =>
{
	isChatOpen || keybinds.forEach((t, o) =>
	{
		e === o.charCodeAt(0) && t.Release()
	})
}), alt.on("disconnect", () =>
{
	for (var [e] of Object.entries(blips)) native.removeBlip(e);
	native.freezeEntityPosition(alt.Player.local.scriptID, !1), native.renderScriptCams(!1, !1, 0, !1, !1), native.destroyAllCams(!0), native.doScreenFadeIn(1), native.transitionFromBlurred(1)
}), alt.everyTick(() =>
{
	markers.size >= 1 && markers.forEach(e =>
	{
		e.Draw()
	}), void 0 !== helpText && helpText.Draw(), void 0 !== subtitle && subtitle.Draw(), void 0 !== loading && loading.Draw(), drawHud || native.hideHudAndRadarThisFrame(), drawCursor && native.showCursorThisFrame(), void 0 !== contextMenu && contextMenu.show && contextMenu.Draw(), messagesAboveHead.length >= 1 && drawMessagesAboveHead()
}), alt.onServer("getForwardVector", () =>
{
	var e = native.getEntityForwardVector(alt.Player.local.scriptID);
	alt.emitServer("getForwardVector", e)
}), alt.onServer("getGroundZFrom3DCoord", e =>
{
	var t = native.getGroundZFor3dCoord(e.x, e.y, e.z, void 0, !0);
	alt.log(JSON.stringify(t)), alt.emitServer("getGroundZFrom3DCoord", t)
}), alt.onServer("createLocalBlip", (e, t, o, i, r, a, n) =>
{
	let s = native.addBlipForCoord(e.x, e.y, e.z);
	native.setBlipSprite(s, t), native.setBlipColour(s, o), native.setBlipScale(s, i), native.setBlipAsShortRange(s, a), native.beginTextCommandSetBlipName("STRING"), native.addTextComponentSubstringPlayerName(r), native.endTextCommandSetBlipName(s), null == n && (n = `${totalBlips+=1}`), void 0 !== blips[n] && native.removeBlip(blips[n]), blips[n] = s
}), alt.onServer("deleteLocalBlip", e =>
{
	void 0 !== blips[e] && (native.removeBlip(blips[e]), blips.delete(e))
}), alt.onServer("createLocalMarker", (e, t, o, i, r, a, n, s, l, d) =>
{
	new Marker(e, t, o, i, r, a, n, s, l, d)
}), alt.onServer("deleteLocalMarker", e =>
{
	markers.has(e) && (markers.get(e).markForDelete = !0, markers.delete(e))
}), alt.onServer("showNotification", (e, t, o, i) =>
{
	native.setNotificationTextEntry("STRING"), native.addTextComponentSubstringPlayerName(i), native.setNotificationMessageClanTag(e.toUpperCase(), e.toUpperCase(), !1, 4, t, o, 1, ""), native.drawNotification(!1, !1)
}), alt.onServer("freezePlayer", e =>
{
	native.freezeEntityPosition(alt.Player.local.scriptID, e)
}), alt.onServer("fadeOutScreen", (e, t) =>
{
	e ? native.doScreenFadeOut(t) : native.doScreenFadeIn(t)
}), alt.onServer("blurOutScreen", (e, t) =>
{
	e ? native.transitionToBlurred(t) : native.transitionFromBlurred(t)
}), alt.onServer("showCursor", e =>
{
	ShowCursor(e)
}), alt.onServer("drawHud", e =>
{
	DrawHUD(e)
}), alt.onServer("displayHelpText", (e, t) =>
{
	new HelpText(e, t)
}), alt.onServer("displaySubtitle", (e, t) =>
{
	new Subtitle(e, t)
}), alt.onServer("showLoading", (e, t, o, i) =>
{
	new Loading(e, t, o, i)
}), alt.onServer("displayMessageAboveHead", (e, t, o, i, r, a, n) =>
{
	messagesAboveHead.push(
	{
		player: e,
		message: t,
		time: Date.now() + o,
		completed: !1,
		r: i,
		g: r,
		b: a,
		a: n
	})
});
export function DrawHUD(e)
{
	drawHud = e
}
export function Distance(e, t)
{
	return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2) + Math.pow(e.z - t.z, 2))
}
export function ShowCursor(e)
{
	drawCursor = e
}
export function AddVector3(e, t)
{
	return {
		x: e.x + t.x,
		y: e.y + t.y,
		z: e.z + t.z
	}
}
export function SubVector3(e, t)
{
	return {
		x: e.x - t.x,
		y: e.y - t.y,
		z: e.z - t.z
	}
}
export function GetMousePOS()
{
	return {
		x: native.getControlNormal(0, 239),
		y: native.getControlNormal(0, 240)
	}
}
export function GetMousePOSAbs()
{
	var e = native.getControlNormal(0, 239),
		t = native.getControlNormal(0, 240),
		o = native.getActiveScreenResolution(0, 0);
	return {
		x: o[1] * e,
		y: o[2] * t
	}
}
export function Screen2dToWorld3dPosition(e, t, o, i, r)
{
	let a = native.getGameplayCamCoord(),
		n = processCoordinates(e, t),
		s = SubVector3(s2w(a, n.x, n.y), a),
		l = AddVector3(a, mulNumber(s, .05)),
		d = AddVector3(a, mulNumber(s, 300)),
		h = native.startShapeTestRay(l.x, l.y, l.z, d.x, d.y, d.z, o, i, 0);
	r(native.getShapeTestResult(h, void 0, void 0, void 0, void 0))
}
export function Get3DFrom2D(e, t, o)
{
	Screen2dToWorld3dPosition(e, t, 1, alt.Player.local.scriptID, e =>
	{
		o(e[2])
	})
}
export function CreateKeybind(e, t, o)
{
	new KeyBind(e, t, o)
}
export function CreateContextMenu(e, t, o)
{
	new ContextMenu(e, t, o)
}
export function AppendContextMenu(e, t)
{
	null != contextMenu ? contextMenu.AppendItem(e, t) : alt.log("====> Context Menu is UNDEFINED.")
}
export function ShowContextMenu(e)
{
	contextMenu.ShowMenu(e)
}

function drawMessagesAboveHead()
{
	for (const e of messagesAboveHead)
	{
		if (e.completed) continue;
		if (e.time < Date.now())
		{
			e.completed = !0;
			continue
		}
		let t = Distance(e.player.pos, alt.Player.local.pos);
		if (t >= 25) continue;
		let o = native.getScreenCoordFromWorldCoord(e.player.pos.x, e.player.pos.y, e.player.pos.z + 1.2, void 0, void 0);
		if (!o[0]) continue;
		let i = t / 25;
		i < .5 && (i = .5), i > .6 && (i = .6);
		let r = t / 25 / 4;
		r > .05 && (r = .05);
		let a = o[2] - r;
		a <= 0 && (a = 0), drawText(e.message, o[1], a, .5, 4, e.r, e.g, e.b, e.a, !0, !1, 99)
	}
}

function mulNumber(e, t)
{
	var o = {};
	return o.x = e.x * t, o.y = e.y * t, o.z = e.z * t, o
}

function rotationToDirection(e)
{
	let t = degToRad(e.z),
		o = degToRad(e.x),
		i = Math.abs(Math.cos(o)),
		r = {};
	return r.x = -Math.sin(t) * i, r.y = Math.cos(t) * i, r.z = Math.sin(o), r
}

function w2s(e)
{
	let t = native.getScreenCoordFromWorldCoord(e.x, e.y, e.z, void 0, void 0);
	if (!t[0]) return;
	let o = {};
	return o.x = 2 * (t[1] - .5), o.y = 2 * (t[2] - .5), o.z = 0, o
}

function processCoordinates(e, t)
{
	var o = native.getActiveScreenResolution(0, 0);
	let i = 1 - e / o[1] * 1 * 2,
		r = 1 - t / o[2] * 1 * 2;
	return {
		x: i = i > 0 ? -i : Math.abs(i),
		y: r = r > 0 ? -r : Math.abs(r)
	}
}

function s2w(e, t, o)
{
	let i = native.getGameplayCamRot(0),
		r = rotationToDirection(i),
		a = AddVector3(i,
		{
			x: 10,
			y: 0,
			z: 0
		}),
		n = AddVector3(i,
		{
			x: -10,
			y: 0,
			z: 0
		}),
		s = AddVector3(i,
		{
			x: 0,
			y: 0,
			z: -10
		}),
		l = SubVector3(rotationToDirection(AddVector3(i,
		{
			x: 0,
			y: 0,
			z: 10
		})), rotationToDirection(s)),
		d = SubVector3(rotationToDirection(a), rotationToDirection(n)),
		h = -degToRad(i.y),
		v = SubVector3(mulNumber(l, Math.cos(h)), mulNumber(d, Math.sin(h))),
		c = AddVector3(mulNumber(l, Math.sin(h)), mulNumber(d, Math.cos(h))),
		u = w2s(AddVector3(AddVector3(AddVector3(e, mulNumber(r, 10)), v), c));
	if (void 0 === u) return AddVector3(e, mulNumber(r, 10));
	let p = w2s(AddVector3(e, mulNumber(r, 10)));
	if (void 0 === p) return AddVector3(e, mulNumber(r, 10));
	if (Math.abs(u.x - p.x) < .001 || Math.abs(u.y - p.y) < .001) return AddVector3(e, mulNumber(r, 10));
	let m = (t - p.x) / (u.x - p.x),
		x = (o - p.y) / (u.y - p.y);
	return AddVector3(AddVector3(AddVector3(e, mulNumber(r, 10)), mulNumber(v, m)), mulNumber(c, x))
}

function degToRad(e)
{
	return e * Math.PI / 180
}
export function drawText(e, t, o, i, r, a, n, s, l, d = !0, h = !0, v = 0)
{
	native.setUiLayer(v), native.beginTextCommandDisplayText("STRING"), native.addTextComponentSubstringPlayerName(e), native.setTextFont(r), native.setTextScale(1, i), native.setTextWrap(0, 1), native.setTextCentre(!0), native.setTextColour(a, n, s, l), d && native.setTextOutline(), h && native.setTextDropShadow(), native.endTextCommandDisplayText(t, o)
}
alt.setInterval(() =>
{
	for (var e = messagesAboveHead.length; e--;) messagesAboveHead[e].completed && (messagesAboveHead.splice(e, 1), alt.log("Cleaned up message above head."))
}, 2500);