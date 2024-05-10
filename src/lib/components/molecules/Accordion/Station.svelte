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
			class={classNames(
				'w-full border border-on-surface-dark/30 bg-surface',
				isOpen ? 'rounded-t-lg' : 'rounded-lg'
			)}>
			<FlexBox
				intent="flexRowLeft"
				gap="medium">
				<Text
					intent="h6"
					variant="dim"
					class="min-w-fit font-medium">
					{station.name}
				</Text>
				{#if station.status === 'online'}
					<FlexBox
						intent="flexRowLeft"
						gap="xsmall"
						class="max-w-fit">
						<label
							for="hourlyRate"
							class="min-w-fit text-on-surface-dark">
							Hourly Rate
						</label>
						<input
							bind:value={hourlyRate}
							type="text"
							name="hourlyRate"
							class="w-[80px] bg-transparent" />
						<label
							for="discountRate"
							class="min-w-fit text-on-surface-dark">
							Discount Rate
						</label>
						<input
							bind:value={discountRate}
							type="text"
							name="discountRate"
							class="w-[80px] bg-transparent" />
					</FlexBox>
				{/if}
			</FlexBox>
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
			}}
			class="">
			<FlexBox
				intent="flexColLeft"
				class="w-full">
				<FlexBox
					intent="flexColLeft"
					class="w-full">
					<FlexBox
						intent="flexColLeft"
						gap="none"
						class="w-full border border-on-surface-dark/30">
						{#each $realtimeStation?.inventory as item (item.id)}
							<FlexBox
								intent="flexRowBetween"
								gap="small"
								px="small"
								class={classNames(
									'w-full border-b border-b-on-surface-dark/30'
								)}>
								<FlexBox
									intent="flexColLeft"
									class="">
									<FlexBox
										intent="unstyled"
										gap="small"
										class="flex w-full items-start justify-start"
										py="small">
										<Icon
											icon="material-symbols:wifi-lock-outline-sharp"
											width="24px"
											height="24px"
											class="text-on-surface-dark/70" />
										<FlexBox intent="flexColLeft">
											<FlexBox intent="flexRowLeft">
												<Text
													intent="p1"
													class="font-bold text-on-surface/70">
													Paddle {item.id} / {item.name}
												</Text>
												<Text
													intent="p1"
													class="font-bold text-on-surface">
													{item.state}
												</Text>
											</FlexBox>
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
										</FlexBox>
									</FlexBox>
								</FlexBox>

								<FlexBox
									intent="flexRowLeft"
									py="xsmall"
									gap="xsmall"
									class="">
									<Button
										intent="unstyled"
										class="rounded-none bg-surface px-[12px] py-[8px] text-on-surface-dark/80"
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
					</FlexBox>
					<!-- <FlexBox
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
					</FlexBox> -->
					<FlexBox
						intent="flexRowRight"
						gap="medium"
						class="mt-[16px] h-full w-full">
						<Button
							intent="text"
							onClick={handlePing}
							class="">
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
