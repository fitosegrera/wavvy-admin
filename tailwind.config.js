/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0FC2C0',
					dark: '#0b8886',
					darker: '#064e4d',
					light: '#D8FFDB'
				},
				secondary: {
					DEFAULT: '#C65026',
					dark: '#8b381b',
					darker: '#3b180b',
					light: '#d78567'
				},
				surface: {
					DEFAULT: '#161b22',
					dark: '#0d1117',
					light: '#484f58'
				},
				status: {
					success: '#33c6a9',
					error: {
						DEFAULT: '#ff4d4d',
						dark: '#cc0000',
						light: '#ff9999'
					},
					warning: '#f3d965',
					info: '#0984e3',
					disabled: '#CDDADA'
				},
				on: {
					primary: {
						DEFAULT: '#19212e',
						dark: '#151b25',
						light: '#19212e'
					},
					secondary: {
						DEFAULT: '#dedede',
						dark: '#ababab',
						light: '#ffffff'
					},
					surface: {
						DEFAULT: '#f0f6fc',
						dark: '#c9d1d9',
						light: '#ffffff'
					},
					status: {
						DEFAULT: '#19212e',
						success: '#ffffff',
						error: '#ffffff',
						warning: '#19212e',
						info: '#ffffff'
					}
				}
			}
		}
	},
	plugins: []
};
