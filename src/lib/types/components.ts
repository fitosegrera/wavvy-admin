/* eslint-disable @typescript-eslint/no-explicit-any */

//STATUS
export type StatusType = 'info' | 'success' | 'warning' | 'error';

// TABS
export interface TabsInterface {
	name: string;
	component: any;
	selected: boolean;
	onClick: (item: string) => void;
}

// SIDEBAR

export interface SideBarInterface {
	name: string;
	component: any;
	icon: string;
	selected: boolean;
	onClick: (item: string) => void;
}

// MODAL
export interface ModalActionType {
	label: string;
	action: (() => void) | null;
}

export interface ModalPropsInterface {
	open: boolean;
	title: string;
	content: string;
	actions: {
		primary: ModalActionType | null;
		secondary: ModalActionType | null;
	};
	onClose?: () => void;
}

// SNACKBAR
export interface SnackbarInterface {
	open: boolean;
	message: string;
	variant: StatusType;
	action: () => void;
}
