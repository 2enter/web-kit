import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '$lib/types';
import axios from 'axios';

class Api {
	readonly fetcher: AxiosInstance;

	constructor(fetcher?: AxiosInstance) {
		this.fetcher = fetcher ?? axios;
	}

	async fetch<T>(config: AxiosRequestConfig, printError = true) {
		const result = await this.fetcher(config).then((res) => res.data as ApiResponse<T>);
		if (printError && result.error) {
			console.error(result.error);
		}
		return result;
	}

	async force_fetch<T>(config: AxiosRequestConfig) {
		return await this.fetcher(config).then((res) => res.data.data as T);
	}
}

// const api = new Api();
// const { data } = await api.fetch<string[]>({ url: '/' });

export { Api };
