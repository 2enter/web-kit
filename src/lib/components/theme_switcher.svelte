<script lang="ts">
	import { capitalize } from '$lib/calc';
	import type { Theme } from 'daisyui';

	interface Props {
		themes: Theme[];
		current?: Theme;
	}

	let { themes, current = $bindable() }: Props = $props();
</script>

<div class="join join-vertical">
	{#each themes as theme}
		<input
			type="radio"
			name="theme-buttons"
			class="theme-controller btn join-item"
			aria-label={capitalize(theme)}
			value={theme}
			bind:group={current}
		/>
	{/each}
</div>
