<script lang="ts">
	import { FlexBox, Text, Button } from '$lib/components';
	import { auth, functions } from '$lib/firebase/client';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Icon from '@iconify/svelte';
	import { snackbarStore } from '$lib/store/overlays/snackbar';
	import { firebaseAuthErrors } from '$lib/utils/firebaseAuthErrors';
	import { httpsCallable } from 'firebase/functions';

	let email: string = '';
	let password: string = '';
	let error: boolean = false;
	let isSigningIn: boolean = false;

	const isUserAdmin = httpsCallable(functions, 'isUserAdmin');

	const handleLogin = async () => {
		isSigningIn = true;
		// const isAdminUser: boolean = await checkIfAdminUser(email);
		let isAdminUser: any;

		isUserAdmin({ data: { email: email } })
			.then((result) => {
				// console.log('User is an admin');
				isAdminUser = result.data;
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						$snackbarStore = {
							open: true,
							message: `${user?.email} signed in successfully`,
							variant: 'success',
							action: () => {}
						};

						isSigningIn = false;
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						$snackbarStore = {
							open: true,
							message: firebaseAuthErrors[errorCode],
							variant: 'error',
							action: () => {}
						};

						isSigningIn = false;
						error = true;
					});
			})
			.catch((error) => {
				console.error(error);
				isAdminUser = false;
				error = true;
			});
	};
</script>

<FlexBox
	intent="flexColTop"
	class="h-full w-full min-w-[360px] max-w-fit rounded-lg border border-on-surface-dark/30 bg-surface shadow-2xl">
	<FlexBox
		px="medium"
		py="medium"
		gap="small"
		intent="flexColLeft"
		class="w-full rounded-t-lg">
		<Text
			intent="h4"
			variant="normal">
			Sign In to Wavvy
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
				class="min-h-[48px] w-full bg-surface-dark px-[16px] py-[8px] focus:outline-primary" />
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="min-h-[48px] w-full bg-surface-dark px-[16px] py-[8px] focus:outline-primary" />
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
