import {redirect, type Actions, type RequestEvent} from '@sveltejs/kit';
import {createFirebaseSession} from '$lib/firebase/session';
import {COOKIE_NAME} from '$lib/firebase/firebase-admin';

export const actions = {
	logout: async ({cookies}) => {
		// delete cookie and redirect
		cookies.delete(COOKIE_NAME, {path: '/'});

		redirect(303, '/');
	},

	loginAuth: async ({cookies, request}) => {
		// get idToken and verify it
		const form = await request.formData();
		const idToken = form.get('idToken');

		if (!idToken || typeof idToken !== 'string') {
			redirect(303, '/api/auth?message=Unauthorized request!');
		}

		const {sessionCookie, options, error: firebase_error} = await createFirebaseSession(idToken);

		if (firebase_error) {
			redirect(firebase_error.status, firebase_error.message);
		}

		// set generated session cookie
		cookies.set(COOKIE_NAME, sessionCookie, options);

		// redirect
		redirect(303, '/');
	}
} satisfies Actions;

export const load = async ({locals: {getSession}, url}: RequestEvent) => {
	const session = await getSession();

	if (session) {
		redirect(302, '/admin');
	}

	return {
		message: url.searchParams.get('message')
	};
};
