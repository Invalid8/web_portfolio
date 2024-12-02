import {capFirst} from '$lib/common';
import {theme} from '$store/themeStore';
import {toasts} from 'svelte-toasts';

type ToastOptions = {
	title?: string;
	description: string;
};

const themeX = theme;

type ToastType = 'info' | 'success' | 'warning' | 'error';

export const showToast = (
	type: ToastType,
	placement:
		| 'top-left'
		| 'top-right'
		| 'top-center'
		| 'bottom-left'
		| 'bottom-right'
		| 'bottom-center'
		| undefined,
	duration: number | undefined,
	options: ToastOptions
) => {
	// Clear all active toasts to prevent overlap (if required)
	toasts.clearAll();

	// Map toast types to corresponding svelte-toasts configuration
	const typeMapping: Record<string, ToastType> = {
		info: 'info',
		success: 'success',
		warning: 'warning',
		error: 'error'
	};

	// Create the toast
	toasts.add({
		title: options.title || '',
		description: options.description,
		duration: duration !== undefined ? duration : 2500, // Default duration
		placement: placement || 'top-right',
		type: typeMapping[type],
		theme: 'dark'
	});
};

export function showNotification(type: ToastType, message: string) {
	showToast(type, undefined, undefined, {
		description: capFirst(message)
	});
}
