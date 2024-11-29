// See https://kit.svelte.dev/docs/types#app

import type {LocalUser} from '$type';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: LocalUser | null;
			getSession(): Promise<DecodedIdToken | null>;
		}
	}
}

export {};
