/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '$lib/firebase/client';
import type { NicknamesInterface } from '$lib/types/auth';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const isLoading = writable<boolean>(false);

const authStore = () => {
	let unsubscribe: any;
	isLoading.set(true);
	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable(auth.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
			set(user);
			isLoading.set(false);
		});

		return () => unsubscribe();
	});
	return {
		subscribe
	};
};

const nn: NicknamesInterface = {
	initial: null,
	displayName: null
};

export const user = authStore();
export const nicknames = writable(nn);
