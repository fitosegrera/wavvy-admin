<script lang="ts">
	import { FlexBox, Text, Button, Editor } from '$lib/components';
	import { privacyPolicyStore } from '$lib/store/legal';
	import { tipexEditor } from '@friendofsvelte/tipex';
	import { appLoaderOverlayStore } from '$lib/store/overlays/appLoaderOverlayStore';
	import { get } from 'svelte/store';
	import { modalStore } from '$lib/store/overlays/modal';
	import { httpsCallable } from 'firebase/functions';
	import { functions } from '$lib/firebase/client';
	import { snackbarStore } from '$lib/store/overlays/snackbar';

	const updatePrivacyPolicy = httpsCallable(functions, 'updatePrivacyPolicy');
</script>

<FlexBox
	intent="flexColLeft"
	py="medium"
	gap="medium"
	class="mb-[24px] w-full">
	<Text
		intent="h4"
		class="font-bold">
		Privacy Policy
	</Text>
	{#if $privacyPolicyStore}
		<Editor htmlContent={$privacyPolicyStore} />
	{/if}
	<Button
		intent="primary"
		class="mt-[24px]"
		onClick={() => {
			const contents = get(tipexEditor)?.getHTML();
			$modalStore = {
				open: true,
				title: 'Save Privacy Policy',
				content: 'Are you sure you want to save the new privacy policy text?',
				actions: {
					primary: {
						label: 'Save',
						action: () => {
							$appLoaderOverlayStore.show = true;
							updatePrivacyPolicy({ privacyPolicy: contents })
								.then((response) => {
									$appLoaderOverlayStore.show = false;
									$modalStore = {
										...$modalStore,
										open: false
									};
									$snackbarStore = {
										open: true,
										message: 'Privacy policy saved successfully',
										variant: 'success',
										action: () => {}
									};
								})
								.catch((error) => {
									$appLoaderOverlayStore.show = false;
									$snackbarStore = {
										open: true,
										message: 'Failed to save privacy policy',
										variant: 'error',
										action: () => {}
									};
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
