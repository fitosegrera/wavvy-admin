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
	intent="flexRowCenter"
	gap="small"
	class="h-full w-full">
	{#each items as item}
		<button
			class={classNames(
				item.selected ? 'bg-secondary' : 'bg-secondary-dark/80',
				'h-full min-h-[48px] w-full max-w-[140px] cursor-pointer rounded-t-lg px-[16px] text-on-secondary'
			)}
			title={item.name}
			on:click={() => {
				item.onClick(item.name);
				loadPage(item);
			}}>
			<Text
				variant="inverted"
				class="truncate">
				{item.name}
			</Text>
		</button>
	{/each}
</FlexBox>

<svelte:component this={selectedPage.component} />
