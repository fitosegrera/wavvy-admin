<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import { closeModal, modalStore } from '$lib/store/overlays/modal';
	import type { ModalPropsInterface } from '$lib/types/components';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
</script>

<FlexBox
	intent="flexColCenter"
	class="w-full fixed z-[100] bg-black/60 backdrop-blur-sm top-0 left-0 h-full"
>
	<div
		transition:fly={{
			y: 400,
			duration: 200
		}}
	>
		<FlexBox intent="flexColCenter" class="rounded-2xl shadow-lg bg-surface mx-[24px]">
			<FlexBox px="small" py="small" intent="flexRowRight" class="">
				<button
					class="text-on-surface-light/80"
					on:click={() => {
						$modalStore.onClose ? $modalStore.onClose() : closeModal();
					}}
				>
					<Icon icon="material-symbols:close" />
				</button>
			</FlexBox>
			<FlexBox intent="flexColCenter" gap="small" class="pb-[8px] w-full">
				<Text intent="h4" class="text-center px-[24px]">{$modalStore.title}</Text>
				<Text intent="p1" class="text-center px-[24px]">{$modalStore.content}</Text>
				<FlexBox class="w-full mt-[16px]">
					<div class="h-[2px] w-full bg-on-surface-dark/50" />
					<FlexBox
						intent="flexRowBetween"
						gap="xsmall"
						class="w-full min-h-[56px] max-h-[56px] mt-[8px] px-[24px]"
					>
						{#if $modalStore.actions.secondary !== null}
							<FlexBox intent="flexRowCenter" class="w-full">
								<Button
									intent="unstyled"
									size="large"
									onClick={() => {
										if ($modalStore.actions.secondary?.action !== null) {
											$modalStore.actions.secondary?.action();
										} else {
											closeModal();
										}
									}}
									class="text-secondary"
								>
									{$modalStore.actions.secondary.label}
								</Button>
							</FlexBox>
							<div class="w-[2px] min-h-[56px] max-h-[56px] bg-on-surface-dark/50" />
						{/if}
						<FlexBox intent="flexRowCenter" class="w-full">
							<Button
								intent="unstyled"
								size="large"
								fullWidth={$modalStore.actions.secondary ? false : true}
								onClick={() => {
									if ($modalStore.actions.primary?.action !== null) {
										$modalStore.actions.primary?.action();
									} else {
										closeModal();
									}
								}}
								class="text-secondary"
							>
								{$modalStore.actions.primary?.label}
							</Button>
						</FlexBox>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</FlexBox>
	</div>
</FlexBox>
