<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	const text = cva('', {
		variants: {
			intent: {
				h1: ['text-[64px]', 'font-bold'],
				h2: ['text-[48px]', 'font-medium'],
				h3: ['text-[32px]', 'font-medium'],
				h4: ['text-[24px]', 'font-bold'],
				h5: ['text-[20px]', 'font-medium'],
				h6: ['text-[18px]', 'font-medium'],
				p1: ['text-[16px]', '', '', ''],
				p2: ['text-[12px]', '', '', '']
			},
			variant: {
				normal: ['text-on-surface'],
				accent: ['text-primary'],
				dim: ['text-on-surface/80'],
				inverted: ['text-surface'],
				error: ['text-status-error'],
				success: ['text-status-success'],
				warning: ['text-status-warning'],
				info: ['text-status-info']
			}
		},
		compoundVariants: [{ intent: 'p1', variant: 'normal', class: '' }]
	});

	interface $$Props extends VariantProps<typeof text> {
		intent?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2';
		variant?: 'normal' | 'accent' | 'dim' | 'inverted' | 'error' | 'success' | 'warning' | 'info';
		class?: string;
	}

	export let intent: $$Props['intent'] = 'p1';
	export let variant: $$Props['variant'] = 'normal';
</script>

<p class={text({ intent, variant, class: $$props.class })}>
	<slot />
</p>

<style>
</style>
