<script lang="ts">
	import { Button, FlexBox } from '$lib/components';

	export let value: number | string | null = null;
	export let label: string = 'Label';
	export let onChange: (value: number) => void;
	export let onSave: () => void;
</script>

<FlexBox
	intent="flexColLeft"
	gap="xsmall"
	class="">
	<label
		for="input"
		class="text-on-surface">
		{label}
	</label>
	<FlexBox
		intent="flexRowLeft"
		gap="small">
		<input
			bind:value
			type="number"
			name="input"
			on:change={(event) => {
				onChange(parseInt(event?.target?.value));
			}}
			class="w-full rounded-md bg-surface px-[16px] py-[8px] text-on-surface-dark" />
		<Button
			intent="text"
			onClick={() => {
				onSave();
			}}
			class="text-primary">
			Save
		</Button>
	</FlexBox>
</FlexBox>
