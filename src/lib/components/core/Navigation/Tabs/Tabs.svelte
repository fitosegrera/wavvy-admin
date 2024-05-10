<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import type { TabsInterface } from '$lib/types/components';
	import { classNames } from '$lib/utils/classNames';

	export let items: TabsInterface[];

	// Loads an object in items array
	let selectedPage = items[0];

	// Have to use obj as arg. so value can be a class
	const loadPage = (obj: any) => (selectedPage = obj);
</script>

<FlexBox
	intent="flexRowLeft"
	class="h-full w-full">
	{#each items as item, index}
		<button
			class={classNames(
				item.selected
					? 'bg-primary'
					: 'border border-on-surface-dark/30 bg-transparent',
				index === 0 && 'rounded-l-lg',
				index === items.length - 1 && 'rounded-r-lg',
				'h-full min-h-[48px] w-full max-w-[140px] cursor-pointer px-[16px]'
			)}
			title={item.name}
			on:click={() => {
				item.onClick(item.name);
				loadPage(item);
			}}>
			<Text
				variant={item.selected ? 'inverted' : 'dim'}
				class="truncate">
				{item.name}
			</Text>
		</button>
	{/each}
</FlexBox>

<svelte:component this={selectedPage.component} />
