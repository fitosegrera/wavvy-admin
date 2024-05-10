import { writable } from 'svelte/store';

export const termsAndConditionsStore = writable<string | null>(null);
export const privacyPolicyStore = writable<string | null>(null);
