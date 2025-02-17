import type { Config } from 'tailwindcss';
import { mobileLock, utils } from './src/lib/tw-plugin';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [utils, mobileLock]
} satisfies Config;
