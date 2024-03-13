<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import { realtimeTimers } from '$lib/store/realtimeDb';
	import type { StatusType } from '$lib/types/components';
	import { updateTimersDb } from '$lib/utils/firestore';
	import { onMount } from 'svelte';

	let reservationTimerDuration: number = 60;
	let variant: StatusType;

	onMount(() => {
		reservationTimerDuration = $realtimeTimers;
	});
</script>

<FlexBox
	intent="flexColLeft"
	py="medium"
	gap="medium"
	class="mb-[24px] w-full">
	<Text
		intent="h4"
		class="font-bold">
		Utilities
	</Text>
	<FlexBox
		intent="flexColLeft"
		gap="xsmall"
		class="">
		<!-- <Text intent="h6">Reservation timers duration</Text> -->
		<label for="timers">Reservation timers duration</label>
		<FlexBox
			intent="flexRowLeft"
			gap="small">
			<input
				bind:value={reservationTimerDuration}
				type="text"
				name="timers"
				class="w-full rounded-md bg-surface-dark px-[16px] py-[8px]" />
			<Button
				intent="text"
				onClick={() => {
					updateTimersDb(reservationTimerDuration, (err) => {
						if (err) {
							variant = 'error';
						} else {
							variant = 'success';
						}

						$snackbarStore = {
							open: true,
							message: `${variant} updating reservation timer duration`,
							variant: variant,
							action: () => {
								$snackbarStore = {
									...$snackbarStore,
									open: false
								};
							}
						};
					});
				}}
				class="text-secondary">
				Save
			</Button>
		</FlexBox>
	</FlexBox>
</FlexBox>
