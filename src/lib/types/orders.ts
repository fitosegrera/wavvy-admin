import type { Timestamp } from 'firebase/firestore';

export type ItemState = 'available' | 'reserved' | 'rented' | 'unavailable' | null;

export interface ItemInterface {
	id: number;
	name: string | null;
	rentTime: number | null;
	state: ItemState;
	reservation: ReservationInterface | null;
	currentOrder: CurrentOrderInterface | null;
}

export interface CurrentOrderInterface {
	uid: string | null;
	oid: string | null;
	duration: number | null;
	startTime: Timestamp | null;
}

export interface OrderInterface {
	uid: string | null;
	oid: string | null;
	duration: number | null;
	startTime: Timestamp | null;
	total: number | null;
}

export type InventoryKey = '1' | '2' | '3' | '4';

export interface InventoryInterface {
	[key: string]: ItemInterface;
	'1': ItemInterface;
	'2': ItemInterface;
	'3': ItemInterface;
	'4': ItemInterface;
}

export interface MarketingInterface {
	discountRate: number;
	hourlyRate: number;
}

export interface StationInterface {
	id: string | null;
	name: string | null;
	inventory: InventoryInterface;
	loaded: boolean;
	marketing: MarketingInterface;
}

export type CartType = ItemInterface[];

export interface CartInterface {
	items: CartType;
	total: number;
}

export interface ReservationInterface {
	rid: string | null;
	uid: string | null;
	duration: number | null;
	startTime: Timestamp | null;
}
