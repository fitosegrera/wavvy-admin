<script lang="ts">
	import { Tipex } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/Tipex.css';
	import '@friendofsvelte/tipex/styles/ProseMirror.css';
	import '@friendofsvelte/tipex/styles/Controls.css';
	import '@friendofsvelte/tipex/styles/EditLink.css';
	import '@friendofsvelte/tipex/styles/CodeBlock.css';
	import { onMount } from 'svelte';

	export let htmlContent: string = `<p>The initial html content.</p>`;

	onMount(() => {
		let dark: boolean = true;
		function setMode(value: boolean) {
			dark = value;

			// update page styling
			if (dark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}

			// store the theme as a local override
			localStorage.theme = dark ? 'dark' : 'light';

			// if the toggled-to theme matches the system defined theme, clear the local override
			// this effectively provides a way to override or revert to "automatic" setting mode
			if (
				window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`)
					.matches
			) {
				localStorage.removeItem('theme');
			}
		}
		setMode(dark);
	});
</script>

<Tipex
	{htmlContent}
	displayDefaultControls
	floatingMenu
	style="max-height: 640px; margin-top: 1rem; margin-bottom: 0; overflow-y: auto; background-color: #161b22;"
	className="" />
