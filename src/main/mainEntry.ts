import { app, BrowserWindow, dialog, ipcMain, Notification } from "electron";
import { isDev, getUploadFiles } from "../utils";
import { CustomScheme } from "./customScheme";
import { trayInit } from "./tray";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		let files = getUploadFiles(commandLine, workingDirectory);
		if (files.length > 0) {
			new Notification({
				title: "ok",
				body: JSON.stringify(files, null, 2),
			}).show();
			mainWindow.webContents.send("uploadfiles", files);
		} else {
			if (mainWindow) {
				if (mainWindow.isMinimized()) {
					mainWindow.restore();
				}
				mainWindow.focus();
			}
		}
	});

	app.whenReady().then(() => {
		let config = {
			frame: false,
			webPreferences: {
				nodeIntegration: true,
				webSecurity: false,
				allowRunningInsecureContent: true,
				contextIsolation: false,
				webviewTag: true,
				spellcheck: false,
				disableHtmlFullscreenWindowResize: true,
			},
		};
		mainWindow = new BrowserWindow(config);
		isDev && mainWindow.webContents.openDevTools({ mode: "undocked" });

		if (process.argv[2]) {
			mainWindow.loadURL(process.argv[2]);
		} else {
			CustomScheme.registerScheme();
			mainWindow.loadURL(`app://index.html`);
		}
		trayInit(mainWindow);
	});
}

ipcMain.on("changeWindowSize", (e, arg) => {
	if (!mainWindow) return;
	mainWindow.setSize(arg.width, arg.height);
	mainWindow.center();
});

ipcMain.on("display", (e, state) => {
	state ? mainWindow.show() : mainWindow.hide();
});

ipcMain.on("msg", (e, msg, title = "通知") => {
	const notification = new Notification({
		title: title,
		body: msg,
	});
	notification.show();
});
