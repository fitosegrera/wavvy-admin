<script lang="ts">
	import { Button, FlexBox, SpinnerLoader, Text } from '$lib/components';
	import { functions } from '$lib/firebase/client';
	import { appLoaderOverlayStore } from '$lib/store/overlays/appLoaderOverlayStore';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import { httpsCallable } from 'firebase/functions';
	import { onMount } from 'svelte';

	const updateReservationTimersDb = httpsCallable(
		functions,
		'updateReservationTimersDb'
	);
	const getReservationTimersDb = httpsCallable(
		functions,
		'getReservationTimersDb'
	);

	$: reservationTimer = null as number | null;

	onMount(() => {
		getReservationTimersDb()
			.then((response: any) => {
				reservationTimer = response.data;
			})
			.catch((error) => {
				$snackbarStore = {
					open: true,
					message: 'Error fetching reservation timer duration',
					variant: 'error',
					action: () => {}
				};
			});
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
		Timers
	</Text>
	{#if reservationTimer}
		<FlexBox
			intent="flexColLeft"
			gap="xsmall"
			class="">
			<!-- <Text intent="h6">Reservation timers duration</Text> -->
			<label
				for="timers"
				class="text-on-surface">
				Reservation timers duration
			</label>
			<FlexBox
				intent="flexRowLeft"
				gap="small">
				<input
					bind:value={reservationTimer}
					type="text"
					name="timers"
					class="w-full rounded-md bg-surface px-[16px] py-[8px] text-on-surface-dark" />
				<Button
					intent="text"
					onClick={() => {
						$appLoaderOverlayStore.show = true;
						updateReservationTimersDb({ time: reservationTimer })
							.then((response) => {
								$snackbarStore = {
									open: true,
									message: 'Reservation timer duration updated successfully',
									variant: 'success',
									action: () => {}
								};
								$appLoaderOverlayStore.show = false;
							})
							.catch((error) => {
								$snackbarStore = {
									open: true,
									message: 'Error updating reservation timer duration',
									variant: 'error',
									action: () => {}
								};
								$appLoaderOverlayStore.show = false;
							});
					}}
					class="text-primary">
					Save
				</Button>
			</FlexBox>
		</FlexBox>
	{:else}
		<SpinnerLoader />
	{/if}
</FlexBox>
