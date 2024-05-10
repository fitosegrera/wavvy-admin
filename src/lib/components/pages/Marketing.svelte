<script lang="ts">
	import {
		Button,
		FlexBox,
		InputSave,
		SpinnerLoader,
		Text
	} from '$lib/components';
	import { functions } from '$lib/firebase/client';
	import { appLoaderOverlayStore } from '$lib/store/overlays/appLoaderOverlayStore';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import { httpsCallable } from 'firebase/functions';
	import { onMount } from 'svelte';

	const getHourlyRateDb = httpsCallable(functions, 'getHourlyRateDb');
	const updateHourlyRateDb = httpsCallable(functions, 'updateHourlyRateDb');
	const getDiscountRateDb = httpsCallable(functions, 'getDiscountRateDb');
	const updateDiscountRateDb = httpsCallable(functions, 'updateDiscountRateDb');

	$: hourlyRate = null as number | null;
	$: discountRate = null as number | null;

	onMount(() => {
		getHourlyRateDb()
			.then((response: any) => {
				hourlyRate = response.data;
				console.log(hourlyRate);
			})
			.catch((error) => {
				$snackbarStore = {
					open: true,
					message: 'Error fetching hourly rate',
					variant: 'error',
					action: () => {}
				};
			});

		getDiscountRateDb()
			.then((response: any) => {
				discountRate = response.data;
				console.log(discountRate);
			})
			.catch((error) => {
				$snackbarStore = {
					open: true,
					message: 'Error fetching discount rate',
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
		Marketing
	</Text>
	{#if hourlyRate !== null && discountRate !== null}
		<FlexBox
			intent="flexColLeft"
			gap="medium">
			<InputSave
				label="Hourly rate in $COP"
				value={hourlyRate}
				onChange={(value) => {
					hourlyRate = value;
				}}
				onSave={() => {
					$appLoaderOverlayStore.show = true;
					updateHourlyRateDb({ rate: hourlyRate })
						.then((response) => {
							$snackbarStore = {
								open: true,
								message: 'Hourly rate updated successfully',
								variant: 'success',
								action: () => {}
							};
							$appLoaderOverlayStore.show = false;
						})
						.catch((error) => {
							$snackbarStore = {
								open: true,
								message: 'Error updating hourly rate',
								variant: 'error',
								action: () => {}
							};
							$appLoaderOverlayStore.show = false;
						});
				}} />
			<InputSave
				label="Discount rate in $COP"
				value={discountRate}
				onChange={(value) => {
					discountRate = value;
				}}
				onSave={() => {
					$appLoaderOverlayStore.show = true;
					updateDiscountRateDb({ rate: discountRate })
						.then((response) => {
							$snackbarStore = {
								open: true,
								message: 'Discount rate updated successfully',
								variant: 'success',
								action: () => {}
							};
							$appLoaderOverlayStore.show = false;
						})
						.catch((error) => {
							$snackbarStore = {
								open: true,
								message: 'Error updating discount rate',
								variant: 'error',
								action: () => {}
							};
							$appLoaderOverlayStore.show = false;
						});
				}} />
		</FlexBox>
	{:else}
		<SpinnerLoader />
	{/if}
</FlexBox>
