import {COOKIE_NAME} from '$lib/firebase/firebase-admin';
import {getFirebaseSession} from '$lib/firebase/session';
import {type Handle, error} from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
	event.locals.getSession = async () => {
		const sessionCookie = event.cookies.get(COOKIE_NAME);

		if (!sessionCookie) {
			return null;
		}

		const {error: err, decodedClaims} = await getFirebaseSession(sessionCookie);

		if (err) {
			console.error(err);
			return error(err.status, err.message);
		}

		return decodedClaims;
	};

	return resolve(event);
};
