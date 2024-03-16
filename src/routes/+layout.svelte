<script lang="ts">
	import { goto } from '$app/navigation';
	import { nicknames, user } from '$lib/store/auth';
	import { onMount } from 'svelte';
	import '../app.css';
	import { stationId } from '$lib/store/realtimeDb';
	import socket from '$lib/store/socket';

	onMount(() => {
		$stationId = 'carey-beach';

		// Subscribe to firebase auth and listen for auth updates
		const unsubscribeUser = user.subscribe((value) => {
			// If user is logged in
			if (value) {
				$nicknames.initial = value.email?.charAt(0).toUpperCase() as string;
				$nicknames.displayName = value.email?.split('@')[0] as string;
				goto('/');
				// console.log('User is logged in');
			} else {
				// If user is not logged in
				// console.log('User is not logged in');
				goto('/sign-in');
			}
		});

		return () => {
			unsubscribeUser();
		};
	});
</script>

<slot />
