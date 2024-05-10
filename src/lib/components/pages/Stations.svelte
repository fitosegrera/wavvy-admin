<script lang="ts">
	import {
		Button,
		CurrentOrderOverlay,
		FlexBox,
		Grid,
		StationAccordion,
		Text
	} from '$lib/components';
	import socket from '$lib/store/socket';
	import { stationId } from '$lib/store/realtimeDb';
	import { onMount } from 'svelte';
	import { PUBLIC_STATION_ORIGIN } from '$env/static/public';
	import type { StationConnectionInterface } from '$lib/types/station';
	import type { MessageInterface } from '$lib/types/network';

	let station: StationConnectionInterface = {
		name: 'Carey Beach',
		status: 'offline',
		onClick: () => {
			if (station.status === 'online') showCurrentOrder = !showCurrentOrder;
		}
	};

	const splitted = station.name.split(' ');
	$stationId = (splitted[0] + '-' + splitted[1]).toLocaleLowerCase();

	let showCurrentOrder = false;

	onMount(() => {
		console.log(socket.connected);
		socket.subscribe((currentMessage: MessageInterface) => {
			const resObject = currentMessage;

			if (resObject.connection) {
				const key = PUBLIC_STATION_ORIGIN;
				console.log('resObject.connection', resObject.connection[key]);
				if (resObject.connection[key] == undefined) {
					station.status = 'offline';
				} else {
					resObject.connection[key].connected
						? (station.status = 'online')
						: (station.status = 'offline');
				}
			}
		});
	});
</script>

<FlexBox
	intent="flexColTop"
	gap="medium"
	class="w-full">
	<FlexBox
		intent="flexRowLeft"
		py="medium"
		class="w-full">
		<Text intent="h4">Stations</Text>
	</FlexBox>
	<StationAccordion
		{station}
		{showCurrentOrder} />
</FlexBox>
