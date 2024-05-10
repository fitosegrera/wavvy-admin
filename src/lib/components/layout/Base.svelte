<script lang="ts">
	import { AppLoaderOverlay, Header, Snackbar } from '$lib/components';
	import { appLoaderOverlayStore } from '$lib/store/overlays/appLoaderOverlayStore';
	import { modalStore } from '$lib/store/overlays/modal';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import Modal from '../core/Overlay/Modal.svelte';
</script>

<div
	class="justify-top relative mx-auto flex h-full min-h-[100vh] w-full max-w-[1920px] flex-col items-center bg-surface-dark">
	{#if $appLoaderOverlayStore.show}
		<AppLoaderOverlay />
	{/if}
	{#if $snackbarStore.open}
		<Snackbar />
	{/if}
	{#if $modalStore.open}
		<Modal />
	{/if}
	<Header />
	<main class="h-full w-full px-[48px] py-[48px]">
		<slot />
	</main>
</div>
