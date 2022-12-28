import { http } from "./http";

export const decapply = (params?: any) => {
	return http.request("get", "/test", { params });
};
