<script lang="ts">
	interface Picture {
		sources: Record<string, string>;
		img: {
			src: string;
			w: number;
			h: number;
		};
	}

	interface Props {
		src: string | { idle: string; touched: string };
		srcPreprocessor?: (src: string) => string | Picture;
		onclick?: () => void;
		ontouchstart?: () => void;
		ontouchend?: () => void;
		scale?: number;
		type?: 'button' | 'submit' | 'reset' | null;
		form?: string;
		class?: string;
	}

	let {
		class: className,
		src,
		srcPreprocessor = (src) => src,
		onclick = () => {},
		scale = 0.9,
		ontouchstart,
		ontouchend,
		...others
	}: Props = $props();

	let touched = $state(false);
	let img = $state<HTMLImageElement>();

	function scaleImg(num: number) {
		if (!img) return;
		img.style.transform = `scale(${num})`;
	}
</script>

<button
	class="{className} "
	aria-label="button"
	{...others}
	{onclick}
	ontouchstart={() => {
		scaleImg(scale);
		touched = true;
		ontouchstart?.();
	}}
	ontouchend={() => {
		scaleImg(1);
		touched = false;
		ontouchend?.();
	}}
>
	<enhanced:img
		bind:this={img}
		src={typeof src === 'string'
			? srcPreprocessor(src)
			: touched
				? srcPreprocessor(src.touched)
				: srcPreprocessor(src.idle)}
		alt=""
		class="w-full transition-transform duration-100"
	/>
</button>
