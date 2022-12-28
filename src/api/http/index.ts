import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpResponse, HttpRequestConfig } from "./types.d";
import qs from "qs";
import NProgress from "../progress";
const defaultConfig: AxiosRequestConfig = {
	baseURL: "http://192.168.8.51:9997",
	timeout: 10000,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
	paramsSerializer: {
		serialize: function (params) {
			return qs.stringify(params, { indices: false });
		},
	},
};

class Http {
	constructor() {
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}
	private static initConfig: HttpRequestConfig = {};
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
	private httpInterceptorsRequest() {
		const instance = Http.axiosInstance;
		instance.interceptors.request.use(
			(config: HttpRequestConfig) => {
				const _config = config;
				NProgress?.start();

				if (typeof config.beforeRequestCallback === "function") {
					config.beforeRequestCallback(_config);
					return _config;
				}
				if (Http.initConfig.beforeRequestCallback) {
					Http.initConfig.beforeRequestCallback(_config);
					return _config;
				}
				return _config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}
	private httpInterceptorsResponse() {
		const instance = Http.axiosInstance;
		instance.interceptors.response.use(
			(response: HttpResponse) => {
				const _config = response.config;
				NProgress?.done();
				if (typeof _config.beforeResponseCallback === "function") {
					_config.beforeResponseCallback(response);
					return response.data;
				}
				if (Http.initConfig.beforeResponseCallback) {
					Http.initConfig.beforeResponseCallback(response);
					return response.data;
				}
				return response.data;
			},
			(error) => {
				const _error = error;
				_error.isCancelRequest = Axios.isCancel(_error);
				NProgress?.done();
				return Promise.reject(_error);
			}
		);
	}
	public request(method: string, url: string, param?: any, axiosConfig?: any) {
		const config = {
			method,
			url,
			...param,
			...axiosConfig,
		};

		return new Promise((resolve, reject) => {
			Http.axiosInstance
				.request(config)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	public post(url: any, param?: any, config?: any) {
		return this.request("post", url, param, config);
	}
	public get(url: any, param?: any, config?: any) {
		return this.request("get", url, param, config);
	}
}

export const http = new Http();
