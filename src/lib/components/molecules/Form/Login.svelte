<script lang="ts">
	import { FlexBox, Text, Button } from '$lib/components';
	import { auth } from '$lib/firebase/client';
	import { isLoading } from '$lib/store/auth';
	import { checkIfAdminUser } from '$lib/utils/auth';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Icon from '@iconify/svelte';

	let email: string = '';
	let password: string = '';
	let error: boolean = false;
	let isSigningIn: boolean = false;

	const handleLogin = async () => {
		isSigningIn = true;
		const isAdminUser: boolean = await checkIfAdminUser(email);
		if (isAdminUser) {
			// console.log('User is an admin');
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					// ...
					isSigningIn = false;
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					isSigningIn = false;
				});
		} else {
			// console.log('User is not an admin');
			error = true;
		}
	};
</script>

<FlexBox
	intent="flexColTop"
	class="h-full w-full min-w-[360px] max-w-fit rounded-lg border-2 bg-surface shadow-2xl">
	<FlexBox
		px="medium"
		py="medium"
		gap="small"
		intent="flexColLeft"
		class="w-full rounded-t-lg">
		<Text
			intent="h4"
			variant="normal">
			Sign In
		</Text>
		<Text variant="dim">Sign in to your account</Text>
	</FlexBox>
	{#if error}
		<FlexBox
			px="medium"
			intent="flexColLeft"
			class="w-full">
			<Text variant="error">You are not allowed to log in.</Text>
		</FlexBox>
	{/if}
	<FlexBox
		px="medium"
		py="medium"
		intent="flexColTop"
		class="w-full">
		<form class="flex w-full flex-col items-center justify-center gap-[24px]">
			<input
				bind:value={email}
				type="email"
				placeholder="Email"
				class="w-full rounded-md bg-surface-dark px-[16px] py-[8px]" />
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="w-full rounded-md bg-surface-dark px-[16px] py-[8px]" />
			<Button
				fullWidth
				class="min-h-[48px] bg-primary px-[24px]"
				onClick={handleLogin}>
				{#if isSigningIn}
					<FlexBox intent="flexRowCenter">
						<Icon
							icon="tabler:loader-2"
							class="animate-spin" />
					</FlexBox>
				{:else}
					Sign In
				{/if}
			</Button>
		</form>
	</FlexBox>
</FlexBox>
