interface Config {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

import {
	PUBLIC_API_KEY,
	PUBLIC_AUTH_DOMAIN,
	PUBLIC_PROJECT_ID,
	PUBLIC_STORAGE_BUCKET,
	PUBLIC_MESSAGING_SENDER_ID,
	PUBLIC_APP_ID,
	PUBLIC_MEASUREMENT_ID
} from '$env/static/public';

const config: Config = {
	apiKey: PUBLIC_API_KEY || '',
	authDomain: PUBLIC_AUTH_DOMAIN || '',
	projectId: PUBLIC_PROJECT_ID || '',
	storageBucket: PUBLIC_STORAGE_BUCKET || '',
	messagingSenderId: PUBLIC_MESSAGING_SENDER_ID || '',
	appId: PUBLIC_APP_ID || '',
	measurementId: PUBLIC_MEASUREMENT_ID || ''
};

Object.keys(config).forEach((dKey: string) => {
	const key = dKey as keyof Config;
	const configValue = config[key] + '';
	if (configValue.charAt(0) === '"') {
		config[key] = configValue.substring(1, configValue.length - 1);
	}
});

export {config};
