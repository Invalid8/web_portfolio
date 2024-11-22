import {writable} from 'svelte/store';
import {browser} from '$app/environment';

// Initialize the store with the correct theme based on localStorage or system preference
export const theme = writable('light');

if (browser) {
	const storedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	theme.set(storedTheme || (prefersDark ? 'dark' : 'light'));
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
