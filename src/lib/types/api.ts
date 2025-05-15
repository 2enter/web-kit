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

export type { ApiError, ApiResponse };
