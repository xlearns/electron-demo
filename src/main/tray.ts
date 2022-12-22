import path from "path";
import { Tray, nativeImage, Menu, app, BrowserWindow } from "electron";
import { isDev } from "../util/emoji";
const icon = "../src/assets/logo.png";
let tray = null;
const iconUrl = isDev
  ? path.join(__dirname, icon)
  : path.join(__dirname, "logo.png");

export function trayInit(win: BrowserWindow) {
  tray = new Tray(nativeImage.createFromPath(iconUrl));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "列表",
      click: () => {
        jump(win, "/list");
      },
    },
    {
      label: "登录",
      click: () => {
        jump(win, "/");
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

function jump(win: BrowserWindow, name: string) {
  if (!win) return;
  win.show();
  win.webContents.executeJavaScript(
    `history.pushState({},"","${name}");dispatchEvent(new Event("popstate"))`
  );
}
