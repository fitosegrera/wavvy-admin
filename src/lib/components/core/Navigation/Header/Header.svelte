<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, Logo } from '$lib/components';
	import { auth } from '$lib/firebase/client';
	import { user } from '$lib/store/auth';
	import { signOut } from 'firebase/auth';
</script>

<FlexBox
	px="large"
	py="medium"
	intent="flexRowBetween"
	class="bg-surface">
	<Logo />
	<Button
		intent="text"
		class=" text-on-surface"
		onClick={() => {
			if ($user) {
				signOut(auth)
					.then(() => {
						// console.log('User signed out');
					})
					.catch((error) => {});
			} else {
			}
		}}>
		{!$user ? 'Sign In' : 'Sign Out'}
	</Button>
</FlexBox>
