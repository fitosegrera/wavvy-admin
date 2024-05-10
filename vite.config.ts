import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
	plugins: [sveltekit(), nodePolyfills]
});
