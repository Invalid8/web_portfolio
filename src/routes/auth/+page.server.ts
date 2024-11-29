import {redirect, type RequestEvent} from '@sveltejs/kit';

export const load = async ({locals: {getSession}}: RequestEvent) => {
	const session = await getSession();

	if (session) {
		redirect(302, '/admin');
	}
};
