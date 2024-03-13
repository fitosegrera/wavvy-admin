<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	const container = cva('grid', {
		variants: {
			intent: {
				'cols-1': ['grid-cols-1'],
				'cols-2': ['grid-cols-2'],
				'cols-3': ['grid-cols-3'],
				'cols-4': ['grid-cols-4'],
				'cols-5': ['grid-cols-5'],
				'cols-6': ['grid-cols-6']
			},
			px: {
				none: [''],
				small: ['px-[8px]'],
				medium: ['px-[16px]'],
				large: ['px-[24px]']
			},
			py: {
				none: [''],
				small: ['py-[8px]'],
				medium: ['py-[16px]'],
				large: ['py-[24px]']
			},
			gap: {
				none: [''],
				small: ['gap-[16px]'],
				medium: ['gap-[24px]'],
				large: ['gap-[48px]']
			}
		}
	});

	interface $$Props extends VariantProps<typeof container> {
		intent?: 'cols-1' | 'cols-2' | 'cols-3' | 'cols-4' | 'cols-5' | 'cols-6';
		px?: 'small' | 'medium' | 'large' | 'none';
		py?: 'small' | 'medium' | 'large' | 'none';
		gap?: 'small' | 'medium' | 'large' | 'none';
		class?: string;
	}

	export let intent: $$Props['intent'] = 'cols-1';
	export let gap: $$Props['gap'] = 'none';
	export let px: $$Props['px'] = 'none';
	export let py: $$Props['py'] = 'none';
</script>

<div {...$$props} class={container({ intent, gap, px, py, class: $$props.class })}>
	<slot />
</div>
