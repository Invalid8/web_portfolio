import {keys} from '$lib/common.js';
import {error, redirect, type RequestEvent} from '@sveltejs/kit';

import {PUBLIC_AUTH_ACCESS} from '$env/static/public';

export const load = async ({locals: {getSession}, url}: RequestEvent) => {
	const {searchParams} = url;
	const session = await getSession();

	if (searchParams.get(keys.auth_access) !== PUBLIC_AUTH_ACCESS && !session) {
		error(404, 'Page Not Found');
	}

	if (!session) {
		redirect(302, '/auth');
	}

	return {
		user: session,
		isAuthentication: false
	};
};
