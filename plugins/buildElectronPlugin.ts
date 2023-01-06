//@ts-nocheck
const path = require("path");
const fs = require("fs");

class BuildObj {
	//编译主进程代码
	buildMain() {
		require("esbuild").buildSync({
			entryPoints: ["./src/main/mainEntry.ts"],
			bundle: true,
			platform: "node",
			minify: true,
			outfile: "./dist/mainEntry.js",
			external: ["electron", "ffi-napi"],
		});
	}
	//为生产环境准备package.json
	preparePackageJson() {
		let pkgJsonPath = path.join(process.cwd(), "package.json");
		let localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
		let electronConfig = localPkgJson.devDependencies.electron.replace("^", "");
		localPkgJson.main = "mainEntry.js";
		delete localPkgJson.scripts;
		delete localPkgJson.devDependencies;
		localPkgJson.devDependencies = { electron: electronConfig };
		let tarJsonPath = path.join(process.cwd(), "dist", "package.json");
		fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
		fs.mkdirSync(path.join(process.cwd(), "dist/node_modules"));
	}
	//使用electron-builder制成安装包
	buildInstaller() {
		let options = {
			config: {
				directories: {
					output: path.join(process.cwd(), "release"),
					app: path.join(process.cwd(), "dist"),
					buildResources: "resources",
				},
				files: ["**"],
				extends: null,
				productName: "electron",
				asar: true,
				win: {
					icon: "../src/assets/logo.ico",
				},
				extraResources: {
					from: "./statc",
					to: "./",
				},
				nsis: {
					shortcutName: "Electron",
					oneClick: false,
					allowToChangeInstallationDirectory: true,
					include: "installer.nsh",
				},
				publish: [{ provider: "generic", url: "http://localhost:5500/" }],
			},
			project: process.cwd(),
		};
		return require("electron-builder").build(options);
	}
}

export let buildElectronPlugin = () => {
	return {
		name: "build-electron-plugin",
		closeBundle: () => {
			let buildObj = new BuildObj();
			buildObj.buildMain();
			buildObj.preparePackageJson();
			buildObj.buildInstaller();
		},
	};
};
