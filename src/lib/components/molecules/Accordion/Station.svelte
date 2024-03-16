<script lang="ts">
	import {
		Button,
		CurrentOrderOverlay,
		FlexBox,
		Grid,
		Text
	} from '$lib/components';
	import { classNames } from '$lib/utils/classNames';
	import type { StationConnectionInterface } from '$lib/types/station';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { realtimeStation, stationId } from '$lib/store/realtimeDb';
	import { updateStationMarketingDb } from '$lib/utils/firestore';
	import { onMount } from 'svelte';
	import { modalStore } from '$lib/store/overlays/modal';
	import socket from '$lib/store/socket';
	import type { MessageInterface } from '$lib/types/network';
	import Icon from '@iconify/svelte';
	import { closeSnackbar, snackbarStore } from '$lib/store/overlays/snackbar';
	import type { StatusType } from '$lib/types/components';

	export let station: StationConnectionInterface;
	export let showCurrentOrder: boolean = false;

	let isOpen: boolean = false;
	let hourlyRate = 0;
	let discountRate = 0;
	let response: MessageInterface;
	let pingLoading: boolean = false;
	let key: keyof UnlockLoadingInterface = 'p1';
	let variant: StatusType;

	interface UnlockLoadingInterface {
		p1: boolean;
		p2: boolean;
		p3: boolean;
		p4: boolean;
	}

	let unlockLoading: UnlockLoadingInterface = {
		p1: false,
		p2: false,
		p3: false,
		p4: false
	};

	onMount(() => {
		hourlyRate = $realtimeStation?.marketing?.hourlyRate;
		discountRate = $realtimeStation?.marketing?.discountRate;

		socket.subscribe((currentMessage: MessageInterface) => {
			const resObject = currentMessage;
			if (resObject.action === 'pong') {
				// console.log('pong');
				pingLoading = false;
				$snackbarStore = {
					open: true,
					message: 'Pong received! Station is online.',
					variant: 'success',
					action: closeSnackbar() as unknown as () => void
				};
			}
			if (resObject.action === 'unlocked') {
				// console.log('unlocked', resObject.id);
				key = resObject.id as keyof UnlockLoadingInterface;
				unlockLoading[key] = false;
				$snackbarStore = {
					open: true,
					message: `Paddle ${key} unlocked!`,
					variant: 'success',
					action: closeSnackbar() as unknown as () => void
				};
			}
		});
	});

	const handlePing = () => {
		pingLoading = true;
		const data: MessageInterface = {
			from: 'admin',
			to: 'server',
			id: null,
			action: 'ping',
			connection: null
		};
		socket.sendMessage(data);
	};

	const handleUnlock = (id: string) => {
		$modalStore = {
			title: 'Unlock Paddle',
			open: true,
			content: `Are you sure you want to unlock paddle ${id}?`,
			actions: {
				primary: {
					label: 'Yes',
					action: () => {
						key = id as keyof UnlockLoadingInterface;
						unlockLoading[key] = true;
						const data: MessageInterface = {
							from: 'admin',
							to: 'station',
							id: id,
							action: 'unlock',
							connection: null
						};
						socket.sendMessage(data);
						$modalStore = {
							...$modalStore,
							open: false
						};
					}
				},
				secondary: {
					label: 'No',
					action: () => {
						$modalStore = {
							...$modalStore,
							open: false
						};
					}
				}
			}
		};
	};

	const handleSave = () => {
		$modalStore = {
			title: 'Save Changes',
			open: true,
			content: 'Are you sure you want to save the changes?',
			actions: {
				primary: {
					label: 'Yes',
					action: () => {
						updateStationMarketingDb(
							$stationId as string,
							{
								hourlyRate,
								discountRate
							},
							(err) => {
								if (err) {
									variant = 'error';
								} else {
									variant = 'success';
								}

								$modalStore = {
									...$modalStore,
									open: false
								};

								$snackbarStore = {
									open: true,
									message: `${variant} updating reservation hourly rate`,
									variant: variant,
									action: () => {
										$snackbarStore = {
											...$snackbarStore,
											open: false
										};
									}
								};
							}
						);
					}
				},
				secondary: {
					label: 'No',
					action: () => {
						$modalStore = {
							...$modalStore,
							open: false
						};
					}
				}
			}
		};
	};
</script>

<FlexBox
	intent="unstyled"
	class="h-full w-full">
	<button
		class="w-full"
		on:click={() => (isOpen = !isOpen)}>
		<FlexBox
			intent="flexRowBetween"
			px="medium"
			py="small"
			gap="small"
			class={classNames('w-full rounded-lg border-2 border-status-disabled')}>
			<Text
				intent="h6"
				variant="dim"
				class="font-medium">
				{station.name}
			</Text>
			<FlexBox
				intent="flexRowCenter"
				gap="xsmall">
				<div
					class={classNames(
						station.status === 'online'
							? 'bg-status-success'
							: 'bg-status-error',
						'h-[12px] w-[12px] rounded-full'
					)} />
				<Text
					intent="p1"
					variant={station.status === 'online' ? 'success' : 'error'}
					class="text-on-surface/70">
					{station.status}
				</Text>
			</FlexBox>
		</FlexBox>
	</button>
	{#if isOpen}
		<div
			transition:slide={{
				delay: 50,
				duration: 300,
				easing: quintOut,
				axis: 'y'
			}}>
			<FlexBox
				intent="flexColLeft"
				px="medium"
				py="medium"
				class="w-full border-2 border-surface-dark/80">
				<FlexBox
					intent="flexColLeft"
					class="w-full">
					<Text
						intent="p1"
						class="text-on-surface/70">
						<span class="font-bold">Station:</span>
						{station.name}
					</Text>
					<Text
						intent="p1"
						class="text-on-surface/70">
						<span class="font-bold">Status:</span>
						{station.status}
					</Text>
					<Grid
						intent="cols-4"
						gap="medium"
						class="w-full">
						{#each $realtimeStation?.inventory as item (item.id)}
							<FlexBox
								intent="flexColLeft"
								class="w-full"
								py="small">
								<Text
									intent="p1"
									class="font-bold text-on-surface/70">
									Paddle {item.id}
								</Text>
								<Text
									intent="p1"
									class="text-on-surface/70">
									<span class="font-bold">Name:</span>
									{item.name}
								</Text>
								<Text
									intent="p1"
									class="text-on-surface/70">
									<span class="font-bold">Current order:</span>
									{#if item.currentOrder}
										{#if showCurrentOrder}
											<CurrentOrderOverlay
												{item}
												onClose={() => {
													showCurrentOrder = false;
												}} />
										{:else}
											<Button
												intent="text"
												class={classNames(
													station.status === 'online'
														? 'text-primary'
														: 'text-status-error'
												)}
												onClick={station.onClick}>
												Show
											</Button>
										{/if}
									{:else}
										None
									{/if}
								</Text>
								<FlexBox
									intent="flexRowLeft"
									py="xsmall"
									gap="xsmall"
									class="">
									<Button
										intent="unstyled"
										class="rounded-none border-2 border-secondary px-[6px] py-[2px] text-secondary"
										onClick={() => handleUnlock('p' + item.id)}>
										{#if unlockLoading['p' + item.id]}
											<FlexBox intent="flexRowCenter">
												<Icon
													icon="tabler:loader-2"
													class="animate-spin" />
											</FlexBox>
										{:else}
											Unlock
										{/if}
									</Button>
								</FlexBox>
							</FlexBox>
						{/each}
					</Grid>
					<FlexBox
						intent="flexRowBetween"
						gap="xsmall"
						class="mt-[16px] w-full">
						<FlexBox
							intent="flexColLeft"
							gap="small"
							class="w-full">
							<label for="hourlyRate">Hourly Rate</label>
							<input
								bind:value={hourlyRate}
								type="text"
								name="hourlyRate"
								class="w-full rounded-md bg-surface-dark px-[16px] py-[8px]" />
						</FlexBox>
						<FlexBox
							intent="flexColLeft"
							gap="small"
							class="w-full">
							<label for="discountRate">Discount Rate</label>
							<input
								bind:value={discountRate}
								type="text"
								name="discountRate"
								class="w-full rounded-md bg-surface-dark px-[16px] py-[8px]" />
						</FlexBox>
					</FlexBox>
					<FlexBox
						intent="flexRowRight"
						gap="medium"
						class="mt-[16px] h-full w-full">
						<Button
							intent="text"
							onClick={handlePing}
							class="text-secondary">
							{#if pingLoading}
								<FlexBox intent="flexRowCenter">
									<Icon
										icon="tabler:loader-2"
										class="animate-spin" />
								</FlexBox>
							{:else}
								Ping Station
							{/if}
						</Button>
						<Button
							intent="primary"
							onClick={handleSave}
							class="">
							Save
						</Button>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</div>
	{/if}
</FlexBox>
