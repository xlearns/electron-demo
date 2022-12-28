export type INTERFACE = {
	code: number;
	msg: string;
};

export interface LOGIN extends INTERFACE {
	data: {
		token: string;
		userId: string;
	};
}
