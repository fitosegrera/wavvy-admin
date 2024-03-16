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

	let response: string = '';
	let station: StationConnectionInterface = {
		name: 'Carey Beach',
		status: 'online',
		onClick: () => {
			if (station.status === 'online') showCurrentOrder = !showCurrentOrder;
		}
	};

	const splitted = station.name.split(' ');
	$stationId = (splitted[0] + '-' + splitted[1]).toLocaleLowerCase();

	let showCurrentOrder = false;

	onMount(() => {
		socket.subscribe((currentMessage) => {
			response = currentMessage;
			if (response.length > 0) {
				const resObject = JSON.parse(response);
				console.log('resObject', resObject);
				if (resObject.connection) {
					const key = PUBLIC_STATION_ORIGIN;
					console.log('resObject.connection', resObject.connection[key]);
					station.status = resObject.connection[key].connected
						? 'online'
						: 'offline';
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
		class="mb-[24px] w-full">
		<Text intent="h4">Stations</Text>
	</FlexBox>
	<StationAccordion
		{station}
		{showCurrentOrder} />
</FlexBox>
