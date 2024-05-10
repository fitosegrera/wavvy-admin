<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import type { SideBarInterface } from '$lib/types/components';
	import { classNames } from '$lib/utils/classNames';
	import Icon from '@iconify/svelte';

	export let items: SideBarInterface[];

	// Loads an object in items array
	let selectedPage = items[0];

	// Have to use obj as arg. so value can be a class
	const loadPage = (obj: any) => (selectedPage = obj);
</script>

<FlexBox
	intent="flexColLeft"
	gap="small"
	py="small"
	class="h-full">
	{#each items as item}
		<FlexBox
			intent="flexRowLeft"
			gap="xsmall">
			<div
				class={classNames(
					'h-[40px] w-[8px] rounded-2xl',
					item.selected ? 'bg-primary' : 'bg-transparent'
				)} />
			<button
				class={classNames(
					item.selected ? 'bg-surface/50' : 'bg-transparent',
					'flex h-full min-h-[48px] w-full min-w-[240px] cursor-pointer items-center gap-[8px] rounded-lg px-[16px] text-on-secondary'
				)}
				title={item.name}
				on:click={() => {
					item.onClick(item.name);
					loadPage(item);
				}}>
				<Icon icon={item.icon} />
				<Text
					variant="normal"
					class="truncate">
					{item.name}
				</Text>
			</button>
		</FlexBox>
	{/each}
</FlexBox>

<svelte:component this={selectedPage.component} />
