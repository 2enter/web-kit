type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type ParseEnum<T extends string | number | bigint | boolean | null | undefined> = `${T}`;

type ApiError = {
	code: number;
	message: string;
	details?: string;
	hint?: string;
};

type ApiResponse<T> = {
	data?: T;
	error?: ApiError;
};

export type { Prettify, ParseEnum, ApiResponse, ApiError };
