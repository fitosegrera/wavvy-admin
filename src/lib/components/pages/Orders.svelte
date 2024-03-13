<script lang="ts">
	import { realtimeOrders, totalSalesStore } from '$lib/store/realtimeDb';
	import { FlexBox, Grid, Text } from '$lib/components';
</script>

<FlexBox
	intent="flexColCenter"
	gap="small">
	<FlexBox
		intent="flexRowBetween"
		py="medium"
		class="mb-[24px] w-full">
		<FlexBox intent="flexRowLeft">
			<Text
				intent="h4"
				class="font-bold">
				Orders
			</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowRight"
			gap="small">
			<Text
				intent="p1"
				class="font-medium">
				Total sales
			</Text>
			<Text
				intent="p1"
				class="font-bold">
				COP${$totalSalesStore}
			</Text>
		</FlexBox>
	</FlexBox>
	<Grid
		intent="cols-5"
		class="w-full">
		<FlexBox
			intent="flexRowCenter"
			class="w-full">
			<Text class="truncate font-bold">User ID</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowCenter"
			class="w-full">
			<Text class="truncate font-bold">Order ID</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowCenter"
			class="w-full">
			<Text class="truncate font-bold">Duration</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowCenter"
			class="w-full">
			<Text class="truncate font-bold">Start Time</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowCenter"
			class="w-full">
			<Text class="truncate font-bold">Total</Text>
		</FlexBox>
	</Grid>
	{#each $realtimeOrders as order}
		<FlexBox
			intent="flexColTop"
			px="small"
			py="medium"
			class="w-full rounded-xl border-2 border-status-disabled">
			<Grid
				intent="cols-5"
				class="w-full">
				<FlexBox
					intent="flexRowCenter"
					class="w-full">
					<Text class="truncate">{order.uid}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowCenter"
					class="w-full">
					<Text>{order.oid}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowCenter"
					class="w-full">
					<Text>{order.duration}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowCenter"
					class="w-full">
					<Text class="truncate">{order.startTime?.toDate()}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowCenter"
					class="w-full">
					<Text>${order.total}</Text>
				</FlexBox>
			</Grid>
		</FlexBox>
	{/each}
</FlexBox>
