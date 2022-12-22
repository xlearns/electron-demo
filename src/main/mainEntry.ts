import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { CustomScheme } from "./CustomScheme";
import { trayInit } from "./tray";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

let mainWindow: BrowserWindow;
Menu.setApplicationMenu(null); // null值取消顶部菜单栏
app.whenReady().then(() => {
  let config = {
    width: 265,
    height: 400,
    frame: false, // 默认标题栏隐藏
    webPreferences: {
      nodeIntegration: true, // 把 Node.js 环境集成到渲染进程中
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false, // 在同一个 JavaScript 上下文中使用 Electron API
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  mainWindow.loadURL(process.argv[2]);

  trayInit(mainWindow);
});

ipcMain.on("changeWindowSize", (e, arg) => {
  if (!mainWindow) return;
  mainWindow.setSize(arg.width, arg.height);
  mainWindow.center();
});

ipcMain.on("display", (e, state) => {
  if (state) {
    mainWindow.show();
  } else {
    mainWindow.hide();
  }
});
