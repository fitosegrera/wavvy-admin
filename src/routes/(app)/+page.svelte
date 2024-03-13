<script lang="ts">
	import {
		FlexBox,
		OrdersPage,
		PrivacyPolicyPage,
		StationsPage,
		Tabs,
		TermsAndConditionsPage,
		UsersPage,
		UtilitiesPage
	} from '$lib/components';
	import type { TabsInterface } from '$lib/types/components';

	const items: TabsInterface[] = [
		{
			name: 'Stations',
			component: StationsPage,
			selected: true,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Users',
			component: UsersPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Orders',
			component: OrdersPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Terms And Conditions',
			component: TermsAndConditionsPage,
			selected: false,
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
			name: 'Utilities',
			component: UtilitiesPage,
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
</script>

<FlexBox
	intent="flexColTop"
	gap="large"
	class="w-full">
	<Tabs {items} />
</FlexBox>
