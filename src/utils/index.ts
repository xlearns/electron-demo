//@ts-nocheck

import path from "path";
import elog from "electron-log";
import fs from "fs-extra";

export const isDev = process.env.NODE_ENV === "development";

export const log = (msg: string) => {
	elog.info(msg);
};

export class PathUtils {
	public static startPath = path.join(__dirname, "..");

	public static resolvePath = (dirPath: string) => {
		return path.join(PathUtils.startPath, dirPath || ".");
	};
}

export const getUploadFiles = (argv = process.argv, cwd = process.cwd()) => {
	const files = argv.slice(2); // 过滤['D:\\.exe', 'upload']这两个参数，直接获取需要上传的图片路径
	let result = [] as any;
	if (files.length > 0) {
		// 如果图片列表不为空
		result = files
			.map((item) => {
				if (path.isAbsolute(item)) {
					// 如果是绝对路径
					return {
						path: item,
					};
				} else {
					let tempPath = path.join(cwd, item); // 如果是相对路径，就拼接
					if (fs.existsSync(tempPath)) {
						// 判断文件是否存在
						return {
							path: tempPath,
						};
					} else {
						return null;
					}
				}
			})
			.filter((item) => item !== null); // 排除为null的路径
	}
	return result; // 返回结果
};
