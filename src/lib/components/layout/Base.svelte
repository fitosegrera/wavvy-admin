<script lang="ts">
	import { Header, Snackbar } from '$lib/components';
	import { modalStore } from '$lib/store/overlays/modal';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import Modal from '../core/Overlay/Modal.svelte';
</script>

<div
	class="justify-top mx-auto flex h-full min-h-[100vh] w-full max-w-[1920px] flex-col items-center">
	{#if $snackbarStore.open}
		<Snackbar />
	{/if}
	{#if $modalStore.open}
		<Modal />
	{/if}
	<Header />
	<main class="h-full w-full px-[80px] py-[80px]">
		<slot />
	</main>
</div>
