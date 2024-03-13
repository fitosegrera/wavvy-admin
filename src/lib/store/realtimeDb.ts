/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/firebase/client'; // Assuming you have initialized Firebase in a separate file
import type {
	InventoryInterface,
	ItemInterface,
	OrderInterface,
	StationInterface
} from '$lib/types/orders';
import type { MarketingInterface } from '$lib/types/station';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { get, writable } from 'svelte/store';

export const isLoading = writable<boolean>(false);
export const totalSalesStore = writable<number>(0);

interface StationStoreInterface {
	inventory: ItemInterface[];
	marketing: MarketingInterface;
}

const inventoryStore = () => {
	let unsubscribe: any;
	isLoading.set(true);
	const { subscribe } = writable<StationStoreInterface>({}, (set) => {
		const docRef = doc(db, 'station', get(stationId) as string);
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			const inventory: ItemInterface[] = [];
			const sationData = snapshot.data() as StationInterface;
			const marketing: MarketingInterface =
				sationData.marketing as MarketingInterface;
			Object.keys(sationData.inventory).forEach(
				(itemKey: keyof InventoryInterface) => {
					inventory.push(sationData.inventory[itemKey] as ItemInterface);
				}
			);
			// Update this store
			set({ inventory, marketing });
			isLoading.set(false);
			// Update the local station store
		});

		return () => unsubscribe();
	});
	return {
		subscribe
	};
};

const ordersStore = () => {
	let unsubscribe: any;

	const { subscribe } = writable<OrderInterface[]>([], (set) => {
		const q = query(collection(db, 'orders'));
		unsubscribe = onSnapshot(q, (snapshot) => {
			const orders: OrderInterface[] = [];
			let totalSales: number = 0;
			snapshot.forEach((doc) => {
				orders.push(doc.data() as OrderInterface);
				if (typeof doc.data().total === 'number')
					totalSales += doc.data().total;
			});
			// Update the total sales store
			totalSalesStore.set(totalSales);
			// Update this store
			set(orders);
		});

		return () => unsubscribe();
	});
	return {
		subscribe
	};
};

const timersStore = () => {
	let unsubscribe: any;

	const { subscribe } = writable<number>(0, (set) => {
		const docRef = doc(db, 'utils', 'timers');
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			const reservationTimer: number = snapshot?.data()?.reservation;
			// Update this store
			set(reservationTimer);
		});

		return () => unsubscribe();
	});
	return {
		subscribe
	};
};

export const stationId = writable<string | null>(null);
export const realtimeStation = inventoryStore();
export const realtimeOrders = ordersStore();
export const realtimeTimers = timersStore();
