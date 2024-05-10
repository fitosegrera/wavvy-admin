<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import { closeModal, modalStore } from '$lib/store/overlays/modal';
	import type { ModalPropsInterface } from '$lib/types/components';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
</script>

<FlexBox
	intent="flexColCenter"
	class="fixed left-0 top-0 z-[100] h-full w-full bg-black/60 backdrop-blur-sm">
	<div
		transition:fly={{
			y: 400,
			duration: 200
		}}>
		<FlexBox
			intent="flexColCenter"
			class="mx-[24px] rounded-2xl bg-surface shadow-lg">
			<FlexBox
				px="small"
				py="small"
				intent="flexRowRight"
				class="">
				<button
					class="text-on-surface-light/80"
					on:click={() => {
						$modalStore.onClose ? $modalStore.onClose() : closeModal();
					}}>
					<Icon icon="material-symbols:close" />
				</button>
			</FlexBox>
			<FlexBox
				intent="flexColCenter"
				gap="small"
				class="w-full pb-[8px]">
				<Text
					intent="h4"
					class="px-[24px] text-center">
					{$modalStore.title}
				</Text>
				<Text
					intent="p1"
					class="px-[24px] text-center">
					{$modalStore.content}
				</Text>
				<FlexBox class="mt-[16px] w-full">
					<div class="h-[1px] w-full bg-on-surface-dark/20" />
					<FlexBox
						intent="flexRowBetween"
						gap="xsmall"
						class="mt-[8px] max-h-[56px] min-h-[56px] w-full px-[24px]">
						{#if $modalStore.actions.secondary !== null}
							<FlexBox
								intent="flexRowCenter"
								class="w-full">
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
									class="text-primary">
									{$modalStore.actions.secondary.label}
								</Button>
							</FlexBox>
							<div
								class="max-h-[56px] min-h-[56px] w-[1px] bg-on-surface-dark/20" />
						{/if}
						<FlexBox
							intent="flexRowCenter"
							class="w-full">
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
								class="text-primary">
								{$modalStore.actions.primary?.label}
							</Button>
						</FlexBox>
					</FlexBox>
				</FlexBox>
			</FlexBox>
		</FlexBox>
	</div>
</FlexBox>
