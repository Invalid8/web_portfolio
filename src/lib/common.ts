import {browser} from '$app/environment';
import {goto} from '$app/navigation';

export const AppInfo = {
	title: 'Web Portfolio',
	description: 'Your personal website and portfolio.',
	author: 'Dalgoridim',
	url: 'https://fullstack-svelte-portfolio.vercel.app',
	links: {
		github: 'https://github.com/invalid8',
		linkedin: 'https://www.linkedin.com/in/daniel-fadamitan-a08052247/',
		resume: 'https://drive.google.com/file/d/1qcK4NgDfuG4QN_wR7XXxQHqhknuy04Ho/view'
	},
	contact: {
		email: 'b.fadamitan2019@gmail.com',
		phone: '+234 703 4797 467',
		form_code: '1b1d7eeefdbc50328a4528061615e6c3'
	}
};

export const SiteData = {
	name: 'Daniel Fadamitan',
	summary:
		'A nigerian based front-end developer passionate about building accessible and user friendly websites.'
};

export function toSlug(value: string, remove?: boolean) {
	return remove
		? value.replaceAll('_', ' ').toLowerCase()
		: value.replaceAll(' ', '_').toLowerCase();
}

export function canGoBack() {
	if (!browser) return;
	return window.history.length > 1;
}

export function goBack() {
	if (!browser) return;

	if (canGoBack()) window.history.back();
	else {
		goto('/');
	}
}

export const keys = {
	token: 'X_TOKEN',
	auth_access: 'auc'
};
