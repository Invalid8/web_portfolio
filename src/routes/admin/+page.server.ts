import type {UserType} from '$type';
import {keys} from '$lib/common.js';
import {error, redirect, type RequestEvent} from '@sveltejs/kit';

import {PUBLIC_AUTH_ACCESS} from '$env/static/public';

export const load = async ({locals: {getSession}, url}: RequestEvent) => {
	const {searchParams} = url;
	const session: UserType = await getSession();

	const bio = {
		name: 'Daniel Fadamitan',
		username: 'Invalid8',
		about: {
			summary: 'A skilled and dedicated web developer...',
			fullDetails: `Daniel is a proficient software engineer specializing...`
		},
		description: 'Driven by a passion for coding and learning, Benjamin’s work reflects...',
		links: {
			github: 'https://github.com/Invalid8/',
			linkedin: 'https://linkedin.com/in/danielfadmitan/',
			resume: 'https://example.com/resume-benjamin.pdf'
		}
	};

	if (searchParams.get(keys.auth_access) !== PUBLIC_AUTH_ACCESS && !session) {
		error(404, 'Page Not Found');
	}

	if (!session) {
		redirect(302, '/api/auth');
	}

	return {
		user: session,
		isAuthentication: true,
		bio
	};
};
