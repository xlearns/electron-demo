import { Tray, nativeImage, Menu, app, BrowserWindow } from "electron";
import { PathUtils, isDev } from "../utils";
let tray = null;
const iconUrl = isDev
	? PathUtils.resolvePath("statc/Vue.png")
	: PathUtils.resolvePath("Vue.png");

export function trayInit(win: BrowserWindow) {
	const _jump = jump(win);
	tray = new Tray(nativeImage.createFromPath(iconUrl));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "test",
			click: () => {
				_jump("/test");
			},
		},
		{
			label: "login",
			click: () => {
				_jump("/");
			},
		},
		{
			label: "退出",
			click: () => {
				app.exit(0);
			},
		},
	]);
	tray.on("click", () => {
		win.isVisible() ? win.hide() : win.show();
	});
	tray.setToolTip("");
	tray.setContextMenu(contextMenu);
}

function jump(win: BrowserWindow) {
	return (name: string) => {
		if (!win) return;
		win.show();
		win.webContents.executeJavaScript(
			`history.pushState({},"","${name}");dispatchEvent(new Event("popstate"))`
		);
	};
}
