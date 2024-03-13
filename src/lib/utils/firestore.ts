/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/firebase/client';
import type { MarketingInterface } from '$lib/types/orders';
import { doc, setDoc } from 'firebase/firestore';

// Update the station inventory in the database
export const updateStationMarketingDb = (
	stationId: string,
	marketing: MarketingInterface,
	callback: (err?: any) => void
) => {
	const docRef = doc(db, 'station', stationId as string);
	try {
		setDoc(docRef, { marketing: marketing }, { merge: true });
		callback();
	} catch (e: any) {
		console.error(e);
		callback(e);
	}
};

export const updateTimersDb = (
	value: number,
	callback: (err?: any) => void
) => {
	const docRef = doc(db, 'utils', 'timers');
	try {
		setDoc(docRef, { reservation: value }, { merge: true });
		callback();
	} catch (e: any) {
		console.error(e);
		callback(e);
	}
};
