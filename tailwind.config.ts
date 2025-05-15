import type { Theme } from 'daisyui';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import { mobileLock, utils } from './src/lib/tw-plugin';

const themes: Theme[] = ['dark', 'cyberpunk', 'synthwave', 'retro', 'night'];

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [utils, mobileLock, daisyui],
	daisyui: { themes }
} satisfies Config;
