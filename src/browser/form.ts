import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
import type { Prettify } from '../types.ts';

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

export { makeEnhanceHandler };
