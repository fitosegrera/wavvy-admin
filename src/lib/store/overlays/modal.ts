import type { ModalPropsInterface } from '$lib/types/components';
import { writable } from 'svelte/store';

const data: ModalPropsInterface = {
	open: false,
	title: 'Modal Title',
	content: 'Modal description goes here',
	actions: {
		primary: {
			label: 'Primary',
			action: () => {}
		},
		secondary: {
			label: 'Secondary',
			action: () => {}
		}
	}
};

const modalStore = writable(data);

const closeModal = () => {
	modalStore.update(() => {
		return {
			...data,
			open: false
		};
	});
};

const openModal = () => {
	modalStore.update(() => {
		return {
			...data,
			open: true
		};
	});
};

export { closeModal, modalStore, openModal };
