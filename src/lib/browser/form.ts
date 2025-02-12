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
			state?.popError(error);
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
function makeEnhanceHandler<ResultData>(args: {
	handlers: Prettify<Partial<Record<ActionResult['type'], (data?: ResultData) => Promise<any>>>>;
	getFiles?: () => Promise<{ name: string; file: File }[] | null>;
	onstart?: () => void;
	onfinish?: () => void;
	validate?: () => any;
	confirmMessage?: string;
}): SubmitFunction {
	const { handlers, getFiles, confirmMessage, validate, onstart, onfinish } = args;

	return async ({ cancel, formData }) => {
		if (!(validate?.() ?? true) || confirmMessage ? confirm(confirmMessage) : false) {
			cancel();
			return;
		}
		onstart?.();

		const files = await getFiles?.();

		if (files) {
			for (const { name, file } of files) {
				formData.append(name, file, file.name);
			}
		}

		return async ({ update, result }) => {
			await update({ reset: false });
			onfinish?.();

			const handler = handlers[result.type];
			if (!handler) return;

			if ('data' in result) {
				const data = result.data as ResultData;
				await handler(data);
			} else {
				await handler();
			}
		};
	};
}

export { makeEnhanceHandler, makeSubmit };
