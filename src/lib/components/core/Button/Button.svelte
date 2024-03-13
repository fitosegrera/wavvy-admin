<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const button = cva('rounded-xl', {
		variants: {
			intent: {
				unstyled: [''],
				primary: [
					'text-on-secondary-light',
					'bg-secondary',
					'border-none',
					'transition-all',
					'duration-300',
					'disabled:bg-status-disabled/70',
					'font-medium'
				],
				secondary: [
					'text-on-surface',
					'bg-transparent',
					'border-2',
					'border-status-disabled',
					'transition-all',
					'duration-300',
					'disabled:bg-status-disabled/70'
				],
				text: [
					'text-on-surface/70',
					'font-medium',
					'bg-transparent',
					'disabled:text-status-disabled/70'
				],
				icon: ['text-primary', 'bg-transparent', 'border-none']
			},
			size: {
				small: $$props.intent !== 'text' && ['text-[14px]', 'px-[12px]', 'py-[8px]'],
				medium: $$props.intent !== 'text' && ['text-[16px]', 'px-[24px]', 'py-[12px]'],
				large: $$props.intent !== 'text' && ['text-[16px]', 'px-[32px]', 'py-[12px]']
			},
			fullWidth: {
				true: 'w-full',
				false: 'max-w-fit'
			}
		},
		compoundVariants: [{ intent: 'primary', size: 'medium', class: '' }]
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {
		intent?: 'unstyled' | 'primary' | 'secondary' | 'text' | 'icon';
		size?: 'small' | 'medium' | 'large';
		fullWidth?: boolean;
		onClick?: () => void;
		class?: string;
	}

	export let intent: $$Props['intent'] = 'primary';
	export let size: $$Props['size'] = 'medium';
	export let fullWidth: $$Props['fullWidth'] = false;
</script>

<button
	{...$$props}
	class={button({ intent, size, fullWidth, class: $$props.class })}
	on:click={() => {
		$$props.onClick && $$props.onClick();
	}}
>
	<slot />
</button>

<style>
</style>
