<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
	import { twMerge } from 'tailwind-merge';

	interface Props {
		resizing?: boolean;
		fullscreen?: boolean;
		children?: Snippet;
		class?: string;
		debug?: boolean;
	}

	let {
		resizing = $bindable(false),
		fullscreen = $bindable(false),
		class: className = '',
		children,
		debug = false
	}: Props = $props();

	const width = $derived(innerWidth.current);
	const height = $derived(innerHeight.current);
	let timeout: NodeJS.Timeout;

	function onResize(e: UIEvent) {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			resizing = true;
			fullscreen = width === screen.width && height === screen.height;
			resizing = false;
		});
	}

	onMount(() => {
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	if (debug) {
		$effect(() => {
			console.log(`${resizing ? 'resizing' : ''} ${fullscreen ? 'fullscreen' : ''}`);
		});
	}
</script>

{#if !fullscreen}
	<button
		class="{twMerge(
			'z-[2000] bg-black/30 backdrop-blur-xl full-screen center-content',
			className
		)} "
		onclick={() => document.documentElement.requestFullscreen()}
	>
		{#if children}
			{@render children()}
		{:else}
			Click anywhere to change fullscreen
		{/if}
	</button>
{/if}
