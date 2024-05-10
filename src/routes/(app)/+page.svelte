<script lang="ts">
	import {
		FlexBox,
		OrdersPage,
		StationsPage,
		SystemVariablesPage,
		UsersPage,
		SideBar
	} from '$lib/components';
	import type { SideBarInterface } from '$lib/types/components';

	const items: SideBarInterface[] = [
		{
			name: 'Stations',
			icon: 'solar:station-linear',
			component: StationsPage,
			selected: true,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Users',
			icon: 'ph:users',
			component: UsersPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'Orders',
			icon: 'icon-park-outline:order',
			component: OrdersPage,
			selected: false,
			onClick: (name: string) => {
				handleItems(name);
			}
		},
		{
			name: 'System Variables',
			icon: 'tdesign:system-setting',
			component: SystemVariablesPage,
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
	intent="unstyled"
	gap="large"
	class="flex w-full items-start justify-start">
	<SideBar {items} />
</FlexBox>
