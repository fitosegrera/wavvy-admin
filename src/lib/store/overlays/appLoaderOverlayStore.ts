import { writable } from 'svelte/store';

export const appLoaderOverlayStore = writable({
	show: false
});
