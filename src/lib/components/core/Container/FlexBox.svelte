<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	const container = cva('', {
		variants: {
			intent: {
				unstyled: [''],
				flexColCenter: ['flex', 'flex-col', 'items-center', 'justify-center'],
				flexColTop: ['flex', 'flex-col', 'items-center', 'justify-start'],
				flexColLeft: ['flex', 'flex-col', 'items-start', 'justify-start'],
				flexRowLeft: ['flex', 'flex-row', 'items-center', 'justify-start'],
				flexRowRight: ['flex', 'flex-row', 'items-center', 'justify-end', 'w-full'],
				flexRowCenter: ['flex', 'flex-row', 'items-center', 'justify-center'],
				flexRowWrap: ['flex', 'flex-row', 'flex-wrap', 'items-center', 'justify-between', 'w-full'],
				flexRowBetween: ['flex', 'flex-row', 'items-center', 'justify-between', 'w-full']
			},
			px: {
				none: [''],
				xsmall: ['px-[8px]'],
				small: ['px-[16px]'],
				medium: ['px-[24px]'],
				large: ['px-[48px]'],
				xlarge: ['px-[64px]'],
				'2xlarge': ['px-[80px]']
			},
			py: {
				none: [''],
				xsmall: ['py-[8px]'],
				small: ['py-[16px]'],
				medium: ['py-[24px]'],
				large: ['py-[48px]'],
				xlarge: ['py-[64px]'],
				'2xlarge': ['py-[80px]']
			},
			gap: {
				none: [''],
				xsmall: ['gap-[8px]'],
				small: ['gap-[16px]'],
				medium: ['gap-[24px]'],
				large: ['gap-[48px]'],
				xlarge: ['gap-[72px]'],
				'2xlarge': ['gap-[96px]']
			}
		},
		compoundVariants: [{ intent: 'unstyled', class: '' }]
	});

	interface $$Props extends VariantProps<typeof container> {
		intent?:
			| 'unstyled'
			| 'flexColCenter'
			| 'flexColTop'
			| 'flexColLeft'
			| 'flexRowLeft'
			| 'flexRowRight'
			| 'flexRowWrap'
			| 'flexRowCenter'
			| 'flexRowBetween';
		px?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | 'none';
		py?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | 'none';
		gap?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | 'none';
		class?: string;
	}

	export let intent: $$Props['intent'] = 'unstyled';
	export let gap: $$Props['gap'] = 'none';
	export let px: $$Props['px'] = 'none';
	export let py: $$Props['py'] = 'none';
</script>

<div {...$$props} class={container({ intent, gap, px, py, class: $$props.class })}>
	<slot />
</div>
