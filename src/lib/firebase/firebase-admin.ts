import firebaseAdmin from 'firebase-admin';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';

import {
	FIREBASE_ADMIN_type,
	FIREBASE_ADMIN_project_id,
	FIREBASE_ADMIN_private_key_id,
	FIREBASE_ADMIN_private_key,
	FIREBASE_ADMIN_client_email,
	FIREBASE_ADMIN_client_id,
	FIREBASE_ADMIN_auth_uri,
	FIREBASE_ADMIN_token_uri,
	FIREBASE_ADMIN_auth_provider_x509_cert_url,
	FIREBASE_ADMIN_client_x509_cert_url,
	FIREBASE_ADMIN_universe_domain
} from '$env/static/private';

const serviceAccount = {
	type: FIREBASE_ADMIN_type,
	project_id: FIREBASE_ADMIN_project_id,
	private_key_id: FIREBASE_ADMIN_private_key_id,
	private_key: FIREBASE_ADMIN_private_key ?? '',
	client_email: FIREBASE_ADMIN_client_email,
	client_id: FIREBASE_ADMIN_client_id,
	auth_uri: FIREBASE_ADMIN_auth_uri,
	token_uri: FIREBASE_ADMIN_token_uri,
	auth_provider_x509_cert_url: FIREBASE_ADMIN_auth_provider_x509_cert_url,
	client_x509_cert_url: FIREBASE_ADMIN_client_x509_cert_url,
	universe_domain: FIREBASE_ADMIN_universe_domain
};

const admin =
	firebaseAdmin.apps.length === 0
		? firebaseAdmin.initializeApp({
				credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount)
			})
		: firebaseAdmin.apps[0];

export const setCustomUserClaims = async (uid: string, role: string) => {
	try {
		await admin?.auth().setCustomUserClaims(uid, {role: role});
		console.log(`Custom claim set for user ${uid}`);

		const token = await admin?.auth().createCustomToken(uid, {role: role});

		return token;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.toString());
	}
};

export const adminAuth = getAuth();
export const adminDB = getFirestore();

export const COOKIE_NAME = '__session';
