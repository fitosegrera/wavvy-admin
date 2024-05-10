<script lang="ts">
	import { realtimeOrders, totalSalesStore } from '$lib/store/realtimeDb';
	import { FlexBox, Grid, SpinnerLoader, Text } from '$lib/components';
	import { classNames } from '$lib/utils/classNames';
</script>

<FlexBox
	intent="flexColCenter"
	class="w-full">
	<FlexBox
		intent="flexRowBetween"
		py="small"
		px="medium"
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
		px="medium"
		py="medium"
		class="w-full rounded-t-lg border border-on-surface-dark/30 bg-surface">
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">User ID</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Order ID</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Duration</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Start Time</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Total</Text>
		</FlexBox>
	</Grid>
	{#if $realtimeOrders.length > 0}
		{#each $realtimeOrders as order, index}
			<FlexBox
				intent="flexColTop"
				px="small"
				py="medium"
				class={classNames(
					'w-full border border-on-surface-dark/30',
					index === $realtimeOrders.length - 1 && 'rounded-b-lg'
				)}>
				<Grid
					intent="cols-5"
					class="w-full">
					<FlexBox
						intent="flexRowLeft"
						class="w-full max-w-[80%]">
						<Text class="truncate">{order.uid}</Text>
					</FlexBox>
					<FlexBox
						intent="flexRowLeft"
						class="w-full max-w-[80%]">
						<Text class="truncate">{order.oid}</Text>
					</FlexBox>
					<FlexBox
						intent="flexRowLeft"
						class="w-full">
						<Text>{order.duration} Hours</Text>
					</FlexBox>
					<FlexBox
						intent="flexRowLeft"
						class="w-full">
						<Text class="truncate">
							{order.startTime &&
								new Date(
									order.startTime.seconds * 1000 +
										order.startTime.nanoseconds / 1000000
								).toLocaleTimeString()}
						</Text>
					</FlexBox>
					<FlexBox
						intent="flexRowLeft"
						class="w-full">
						{#if order.payment}
							<Text>COP${order.payment.amountInCents / 100}</Text>
						{:else}
							<Text>COP$0</Text>
						{/if}
					</FlexBox>
				</Grid>
			</FlexBox>
		{/each}
	{:else}
		<SpinnerLoader />
	{/if}
</FlexBox>
