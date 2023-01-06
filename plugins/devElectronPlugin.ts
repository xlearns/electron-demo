//plugins\devPlugin.ts
import { ViteDevServer } from "vite";
export let devElectronPlugin = () => {
	return {
		name: "dev-electron-plugin",
		configureServer(server: ViteDevServer) {
			require("esbuild").buildSync({
				entryPoints: ["./src/main/mainEntry.ts"],
				bundle: true,
				platform: "node",
				outfile: "./dist/mainEntry.js",
				external: ["electron", "ffi-napi"],
			});
			if (!server.httpServer) return;
			server.httpServer.once("listening", () => {
				let { spawn } = require("child_process");
				let addressInfo = server!.httpServer!.address() as any;
				let httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
				let electronProcess = spawn(
					require("electron").toString(),
					["./dist/mainEntry.js", httpAddress],
					{
						cwd: process.cwd(),
						stdio: "inherit",
					}
				);
				electronProcess.on("close", () => {
					server.close();
					process.exit();
				});
			});
		},
	};
};

// plugins\devPlugin.ts
export let getReplacer = () => {
	let externalModels = [
		"os",
		"fs",
		"path",
		"events",
		"child_process",
		"crypto",
		"http",
		"buffer",
		"url",
		"better-sqlite3",
		"knex",
	];
	let result = {} as any;
	for (let item of externalModels) {
		result[item] = () => ({
			find: new RegExp(`^${item}$`),
			code: `const ${item} = require('${item}');export { ${item} as default }`,
		});
	}
	result["electron"] = () => {
		let electronModules = [
			"clipboard",
			"ipcRenderer",
			"nativeImage",
			"shell",
			"webFrame",
		].join(",");
		return {
			find: new RegExp(`^electron$`),
			code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
		};
	};
	return result;
};
