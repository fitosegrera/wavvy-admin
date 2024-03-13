<script lang="ts">
	import { FlexBox, Text, Button } from '$lib/components';
	import { snackbarStore, closeSnackbar } from '$lib/store/overlays/snackbar';
	import { classNames } from '$lib/utils/classNames';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	onMount(() => {
		setTimeout(() => {
			closeSnackbar();
		}, 3000);
	});
</script>

<div
	class="fixed bottom-[24px]"
	transition:fly={{
		delay: 50,
		duration: 300,
		x: 0,
		y: '100%',
		opacity: 0.5,
		easing: quintOut
	}}>
	<FlexBox
		intent="flexRowCenter"
		px="small"
		py="xsmall"
		gap="small"
		class={classNames(
			$snackbarStore.variant === 'success' && 'bg-status-success/30',
			$snackbarStore.variant === 'error' && 'bg-status-error/30',
			$snackbarStore.variant === 'warning' && 'bg-status-warning/30',
			$snackbarStore.variant === 'info' && 'bg-status-info/30',
			'rounded-md shadow-lg'
		)}>
		<Text variant={$snackbarStore.variant}>{$snackbarStore.message}</Text>
		<Button
			intent="text"
			onClick={() => closeSnackbar()}>
			<Icon
				icon="material-symbols:close"
				class={classNames(
					$snackbarStore.variant === 'success' && 'text-status-success/80',
					$snackbarStore.variant === 'error' && 'text-status-error/80',
					$snackbarStore.variant === 'warning' && 'text-status-warning/80',
					$snackbarStore.variant === 'info' && 'text-status-info/80'
				)} />
		</Button>
	</FlexBox>
</div>
