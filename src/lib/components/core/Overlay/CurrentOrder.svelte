<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import type { ItemInterface } from '$lib/types/orders';
	import { calculateTimeLeft } from '$lib/utils/calculateTimeLeft';
	import { onMount } from 'svelte';

	export let item: ItemInterface;
	export let onClose: () => void = () => {};

	let timeLeftTimer: NodeJS.Timeout;
	let timeLeft: string = '';

	onMount(() => {
		timeLeftTimer = setInterval(() => {
			timeLeft = calculateTimeLeft(item);
		}, 1000);

		return () => {
			clearInterval(timeLeftTimer);
		};
	});
</script>

<FlexBox
	intent="flexColCenter"
	class="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm">
	<FlexBox
		intent="flexColLeft"
		gap="medium"
		px="medium"
		py="medium"
		class="rounded-lg bg-surface">
		<Text
			intent="h5"
			class="text-on-surface">
			Current Order
		</Text>
		<FlexBox
			intent="flexColLeft"
			gap="xsmall">
			<Text
				intent="p1"
				class="text-on-surface/70">
				<span class="font-bold">Order ID:</span>
				{item?.currentOrder?.oid}
			</Text>
			<Text
				intent="p1"
				class="text-on-surface/70">
				<span class="font-bold">User ID:</span>
				{item?.currentOrder?.uid}
			</Text>
			<Text
				intent="p1"
				class="text-on-surface/70">
				<span class="font-bold">RentTime:</span>
				{item.currentOrder?.duration}
			</Text>
			<Text
				intent="p1"
				class="text-on-surface/70">
				<span class="font-bold">StartTime:</span>
				{item.currentOrder?.startTime?.toDate().toLocaleString()}
			</Text>
			<Text
				intent="p1"
				class="text-on-surface/70">
				<span class="font-bold">TimeLeft:</span>
				{timeLeft}
			</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowRight"
			class="w-full">
			<Button
				intent="text"
				class="w-full text-secondary"
				onClick={onClose}>
				Close
			</Button>
		</FlexBox>
	</FlexBox>
</FlexBox>
