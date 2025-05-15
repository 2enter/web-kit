<script lang="ts">
	import type { Theme } from 'daisyui';
	import { ThemeSwitcher, ImgBtn } from '@/components';
	// import { FullscreenChecker } from '@/components/index.js';

	let theme = $state<Theme>('synthwave');

	let fullscreen = $state(false);

	$effect(() => {
		console.log(fullscreen);
	});
</script>

<!-- <ThemeSwitcher themes={['synthwave', 'dark', 'cyberpunk', 'retro', 'night']} /> -->

<!-- <FullscreenChecker bind:fullscreen class="bg-red-500" /> -->

<ImgBtn src="/favicon.png" />
