import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
import type { Prettify } from '@/types';

interface AppState {
	startProcess: () => void;
	endProcess: () => void;
	popError: (error: any) => void;
}

function makeSubmit(config: {
	process: () => Promise<string | undefined>;
	state?: AppState;
	preStart?: () => void;
	onStart?: () => void;
	preFinish?: () => void;
	onFinish?: () => void;
	validate?: () => boolean;
	onError?: (error: string) => void;
	preError?: (error: string) => void;
	confirmMessage?: string;
}) {
	const {
		state,
		confirmMessage,
		onStart,
		onFinish,
		onError,
		preError,
		preStart,
		preFinish,
		process,
		validate
	} = config;
	return async () => {
		if (!(validate?.() ?? true) || confirmMessage ? confirm(confirmMessage) : false) return;

		preStart?.();
		state?.startProcess();
		onStart?.();

		const error = await process();

		if (error) {
			preError?.(error);
			onError?.(error);
		}

		preFinish?.();
		state?.endProcess();
		onFinish?.();
	};
}

/**
 * @typeParam ResultData -
 * @param {Function} args.handlers - Handlers for all action results
 * @param {Object} args.getFiles - A function to fetch files, which will append to formData
 * @see http://localhost:5173/packages/lib/#makeEnhanceHandler
 */
function makeEnhanceHandler<
	Success extends Record<string, unknown>,
	Failure extends Record<string, unknown>,
	Error = Failure
>(args: {
	handlers: {
		success?: (data: Success, status?: number) => Promise<any>;
		failure?: (data: Failure, status?: number) => Promise<any>;
		redirect?: (location: string, status?: number) => Promise<any>;
		error?: (error: Error, status?: number) => Promise<any>;
	};
	sysState?: AppState;
	getFiles?: () => Promise<{ name: string; file: File }[] | null>;
	preStart?: () => void; // before sysState.startProcess()
	onStart?: () => void; // after sysState.startProcess()
	preFinish?: () => void; // before sysState.endProcess()
	onFinish?: () => void; // after sysState.endProcess()
	validate?: () => string | null | undefined; // return error message if invalid
	confirmMessage?: () => string; // return confirm message
}): SubmitFunction<Success, Failure> {
	const {
		sysState,
		handlers,
		getFiles,
		confirmMessage,
		validate,
		preStart,
		onStart,
		preFinish,
		onFinish
	} = args;

	return async ({ cancel, formData }) => {
		if (validate) {
			const message = validate();
			if (message) {
				sysState?.popDialog('error', message);
				cancel();
				return;
			}
		}

		if (confirmMessage) {
			if (!confirm(confirmMessage())) {
				cancel();
				return;
			}
		}

		if (getFiles) {
			const files = await getFiles();
			if (files)
				for (const { name, file } of files) {
					formData.append(name, file, file.name);
				}
		}
		return async ({ update, result }) => {
			preStart?.();
			sysState?.startProcess();
			onStart?.();

			await update({ reset: false });

			const handler = handlers[result.type] ?? async function () {};
			if (handler) {
				const { status } = result;
				switch (result.type) {
					case 'redirect':
						await handler(result.location as any, status);
						break;
					case 'error':
						await handler(result.error, status);
						break;
					default:
						await handler(result.data as any, status);
				}
			}

			preFinish?.();
			sysState?.endProcess();
			onFinish?.();
		};
	};
}

export { makeEnhanceHandler, makeSubmit };
