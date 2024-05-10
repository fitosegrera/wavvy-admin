<script lang="ts">
	import { FlexBox, Text, Button, Editor } from '$lib/components';
	import { termsAndConditionsStore } from '$lib/store/legal';
	import { tipexEditor } from '@friendofsvelte/tipex';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import { get } from 'svelte/store';
	import { modalStore } from '$lib/store/overlays/modal';
	import { httpsCallable } from 'firebase/functions';
	import { functions } from '$lib/firebase/client';
	import { appLoaderOverlayStore } from '$lib/store/overlays/appLoaderOverlayStore';

	const updateTermsAndConditions = httpsCallable(
		functions,
		'updateTermsAndConditions'
	);
</script>

<FlexBox
	intent="flexColLeft"
	py="medium"
	gap="medium"
	class="mb-[24px] w-full">
	<Text
		intent="h4"
		class="font-bold">
		Terms And Conditions
	</Text>
	{#if $termsAndConditionsStore}
		<Editor htmlContent={$termsAndConditionsStore} />
	{/if}
	<Button
		intent="primary"
		class="mt-[24px]"
		onClick={() => {
			const contents = get(tipexEditor)?.getHTML();
			$modalStore = {
				open: true,
				title: 'Save Terms And Conditions',
				content:
					'Are you sure you want to save the new terms and conditions text?',
				actions: {
					primary: {
						label: 'Save',
						action: () => {
							$appLoaderOverlayStore.show = true;
							updateTermsAndConditions({ termsAndConditions: contents })
								.then((response) => {
									$modalStore = {
										...$modalStore,
										open: false
									};
									$snackbarStore = {
										open: true,
										message: 'Terms and conditions saved successfully',
										variant: 'success',
										action: () => {}
									};
									$appLoaderOverlayStore.show = false;
								})
								.catch((error) => {
									$snackbarStore = {
										open: true,
										message: 'Error saving terms and conditions',
										variant: 'error',
										action: () => {}
									};
									$appLoaderOverlayStore.show = false;
								});
						}
					},
					secondary: {
						label: 'Cancel',
						action: () => {
							$modalStore = {
								...$modalStore,
								open: false
							};
						}
					}
				}
			};
		}}>
		Save
	</Button>
</FlexBox>
