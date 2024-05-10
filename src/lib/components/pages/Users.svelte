<script lang="ts">
	import { FlexBox, Grid, Text, SpinnerLoader } from '$lib/components';
	import type { UserRecord } from 'firebase-admin/auth';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const users = JSON.parse($page.data.users) as UserRecord[];

	onMount(async () => {
		// console.log('users', JSON.parse($page.data.users));
	});
</script>

<FlexBox
	intent="flexColTop"
	class="w-full">
	<FlexBox
		intent="flexRowLeft"
		py="medium"
		class="mb-[24px] w-full">
		<Text intent="h4">Users</Text>
	</FlexBox>
	<Grid
		intent="cols-7"
		gap="small"
		px="medium"
		py="medium"
		class="w-full rounded-t-lg border border-on-surface-dark/30 bg-surface/80">
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Photo</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="col-span-2 w-full">
			<Text class="truncate font-bold">UID</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Email</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="w-full">
			<Text class="truncate font-bold">Display Name</Text>
		</FlexBox>
		<FlexBox
			intent="flexRowLeft"
			class="col-span-2 w-full">
			<Text class="truncate font-bold">Last Sign In</Text>
		</FlexBox>
	</Grid>
	{#if users}
		<Grid
			intent="cols-7"
			gap="small"
			px="medium"
			py="medium"
			class="w-full border border-on-surface-dark/30">
			{#each users as user}
				<FlexBox
					intent="flexRowLeft"
					class="w-full">
					<img
						src={user.photoURL}
						alt=""
						class="w-[48px] rounded-full" />
				</FlexBox>
				<FlexBox
					intent="flexRowLeft"
					class="col-span-2 w-full">
					<Text class="truncate">{user.uid}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowLeft"
					class="w-full">
					<Text class="truncate">{user.email}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowLeft"
					class="w-full">
					<Text class="truncate">{user.displayName}</Text>
				</FlexBox>
				<FlexBox
					intent="flexRowLeft"
					class="col-span-2 w-full">
					<Text class="truncate">{user.metadata.lastSignInTime}</Text>
				</FlexBox>
			{/each}
		</Grid>
	{:else}
		<SpinnerLoader />
	{/if}
</FlexBox>
