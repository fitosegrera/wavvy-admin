// src/routes/+layout.server.ts
import { adminAuth } from '$lib/firebase/admin';
import type { ListUsersResult } from 'firebase-admin/auth';

export const load = async () => {
	const users: ListUsersResult = await adminAuth.listUsers();
	return { users: JSON.stringify(users.users) };
};
