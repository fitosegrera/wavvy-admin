<script lang="ts">
	import {
		TermsAndConditionsPage,
		PrivacyPolicyPage,
		Tabs,
		FlexBox,
		SpinnerLoader,
		TimersPage,
		MarketingPage
	} from '$lib/components';
	import type { TabsInterface } from '$lib/types/components';
	import {
		termsAndConditionsStore,
		privacyPolicyStore
	} from '$lib/store/legal';
	import { onMount } from 'svelte';
	import { httpsCallable } from 'firebase/functions';
	import { functions } from '$lib/firebase/client';

	const items: TabsInterface[] = [
		{
			name: 'Terms And Conditions',
			component: TermsAndConditionsPage,
			selected: true,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Privacy Policy',
			component: PrivacyPolicyPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Timers',
			component: TimersPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Marketing',
			component: MarketingPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		}
	];

	const handleItems = (name: string) => {
		items.map((i, index) => {
			if (name === i.name) {
				items[index].selected = true;
			} else {
				items[index].selected = false;
			}
		});
	};

	const getLegalDb = httpsCallable(functions, 'getLegalDb');

	onMount(() => {
		getLegalDb({})
			.then((response: any) => {
				$termsAndConditionsStore = response.data.termsAndConditions;
				$privacyPolicyStore = response.data.privacyPolicy;
			})
			.catch((error) => {
				console.error(error);
			});
	});
</script>

<FlexBox
	intent="flexColLeft"
	gap="large"
	class="w-full ">
	{#if $termsAndConditionsStore && $privacyPolicyStore}
		<Tabs {items} />
	{:else}
		<FlexBox
			intent="flexRowCenter"
			class="h-[200px] w-full">
			<SpinnerLoader />
		</FlexBox>
	{/if}
</FlexBox>
