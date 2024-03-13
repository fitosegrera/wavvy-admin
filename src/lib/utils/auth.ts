import { db } from '$lib/firebase/client';
import {
	DocumentSnapshot,
	doc,
	getDoc,
	type DocumentData,
	DocumentReference
} from 'firebase/firestore';

export const checkIfAdminUser = async (email: string) => {
	const docRef: DocumentReference = doc(db, 'utils', 'admin');
	const docSnap: DocumentSnapshot = await getDoc(docRef);
	const docData: DocumentData = docSnap.data() as DocumentData;
	const adminUsers: string[] = Object.values(docData.users) as string[];
	const admin = adminUsers.find((e: string) => e === email);

	if (admin) {
		return true;
	} else {
		return false;
	}
};
