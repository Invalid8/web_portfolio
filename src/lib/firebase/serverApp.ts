import {initializeServerApp} from 'firebase/app';

import {config} from './config';
import {getAuth} from 'firebase/auth';

const headers = new Headers();

export async function getAuthenticatedAppForUser() {
	const idToken = headers.get('Authorization')?.split('Bearer ')[1];

	const firebaseServerApp = initializeServerApp(
		config,
		idToken
			? {
					authIdToken: idToken
				}
			: {}
	);

	const auth = getAuth(firebaseServerApp);
	await auth.authStateReady();

	return {firebaseServerApp, currentUser: auth.currentUser};
}
