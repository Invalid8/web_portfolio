/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	AuthErrorCodes,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	// updatePassword,
	type User
} from 'firebase/auth';
import {readable, type Subscriber} from 'svelte/store';

import {type ActionResult} from '@sveltejs/kit';
import {applyAction, deserialize} from '$app/forms';
import type {UserType} from '$type';
import {useSharedStore} from '$lib/use-shared';
import {goto} from '$app/navigation';
import {auth} from './clientApp';

export async function loginWithGoogle(event: Event) {
	event.preventDefault();

	const form = event.target as HTMLFormElement;

	let credential;

	try {
		credential = await signInWithPopup(auth, new GoogleAuthProvider());
	} catch (error: any) {
		let msg = 'Something unexpected occurred!';

		if ([AuthErrorCodes.ADMIN_ONLY_OPERATION].includes(error.code)) {
			msg = 'Admin only operation';
		}

		goto(`/api/auth?message=${msg}`, {
			replaceState: true,
			state: {message: msg},
			invalidateAll: true
		});
		return;
	}
	const user = credential.user;

	// TODO: use this to set up your account password
	// updatePassword(user, 'some-password')
	// 	.then(() => {
	// 		// Update successful.
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 		// ...
	// 	});

	// Get the ID token
	const idToken = await user.getIdToken();

	// Send token to server and create a cookie
	const body = new FormData(form);
	body.append('idToken', idToken);

	const response = await fetch(form.action, {
		method: 'POST',
		body
	});

	const result: ActionResult = deserialize(await response.text());

	switch (result.type) {
		case 'error':
			applyAction(result);
			console.error(result.error);
			break;
		case 'redirect':
			applyAction(result);
	}
}

export async function loginWithEmailAndPassword(event: Event) {
	event.preventDefault();

	const form = event.target as HTMLFormElement;

	// Extract email and password from the form
	const formData = new FormData(form);
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	let credential;

	try {
		credential = await signInWithEmailAndPassword(auth, email, password);
	} catch (error: any) {
		let msg = 'Something unexpected occurred!';
		if (
			[
				AuthErrorCodes.INVALID_PASSWORD,
				AuthErrorCodes.INVALID_EMAIL,
				AuthErrorCodes.USER_DELETED
			].includes(error.code)
		) {
			msg = 'The email address or password is incorrect';
		}

		goto(`/api/auth?message=${msg}`, {
			replaceState: true,
			state: {message: msg},
			invalidateAll: true
		});
		return;
	}

	if (!credential) return;

	// Get the ID token
	const idToken = await credential.user.getIdToken();

	// Send token to the server and create a cookie
	const body = new FormData(form);
	body.append('idToken', idToken);

	const response = await fetch(form.action, {
		method: 'POST',
		body
	});

	const result: ActionResult = deserialize(await response.text());

	// Handle response
	switch (result.type) {
		case 'error':
			applyAction(result);
			console.error(result.error);
			break;
		case 'redirect':
			applyAction(result);
	}
}

export async function logout(event: Event) {
	event.preventDefault();

	const form = event.target as HTMLFormElement;

	// sign out on client
	await signOut(auth);

	// signout on server
	const response = await fetch(form.action, {
		method: 'POST',
		body: new FormData(form)
	});

	const result: ActionResult = deserialize(await response.text());

	switch (result.type) {
		case 'error':
			applyAction(result);
			console.error(result.error);
			break;
		case 'redirect':
			applyAction(result);
	}
}

const user = (defaultUser: UserType | null = null) => {
	// handle cases where session is expired
	if (!defaultUser) {
		signOut(auth);
	}
	return readable<UserType | null>(defaultUser, (set: Subscriber<UserType | null>) => {
		return onIdTokenChanged(auth, (_user: User | null) => {
			// if no user on server, logout

			if (!_user) {
				set(null);
				return;
			}
			const {displayName, photoURL, uid, email} = _user;
			set({displayName, photoURL, uid, email});
		});
	});
};
export const useUser = (defaultUser: UserType | null = null) =>
	useSharedStore('user', user, defaultUser);
