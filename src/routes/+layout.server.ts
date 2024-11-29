import type {UserType} from '$type';
import type {RequestEvent} from '@sveltejs/kit';

export const load = async ({locals: {getSession}}: RequestEvent) => {
	const session = await getSession();

	if (!session) {
		return {
			user: null,
			isAuthentication: false
		};
	}

	const user: UserType = {
		displayName: session.name,
		email: session.email,
		photoURL: session.picture,
		uid: session.uid
	};

	return {
		user,
		isAuthentication: true
	};
};
