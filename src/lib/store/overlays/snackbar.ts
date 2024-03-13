import { get, writable } from 'svelte/store';
import type { SnackbarInterface } from '$lib/types/components';

const data: SnackbarInterface = {
	open: false,
	message: 'Lorem ipsum dolor sit amet.',
	variant: 'info',
	action: () => {}
};

export const closeSnackbar = () => {
	const sb = get(snackbarStore);
	snackbarStore.set({ ...sb, open: false });
};

export const snackbarStore = writable<SnackbarInterface>(data);
