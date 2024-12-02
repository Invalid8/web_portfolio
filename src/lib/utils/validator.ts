import {showNotification} from './showNotification';

export function validatePayload(payload: Record<string, unknown>): boolean {
	const validateObject = (obj: Record<string, unknown>, parentKey?: string): boolean => {
		for (const key of Object.keys(obj)) {
			const value = obj[key];
			const fullKey = parentKey ? `${parentKey}.${key}` : key; // Use dot notation for nested fields

			if (!value) {
				showNotification('error', `${fullKey.replaceAll('.', ': ')} is required`);
				return false;
			}

			// Check for nested objects
			if (typeof value === 'object' && value !== null) {
				if (Object.keys(value).length === 0) {
					showNotification(
						'error',
						`${fullKey.replaceAll('.', ': ')} is required and cannot be empty`
					);
					return false;
				}

				// Recursively validate nested objects
				if (!validateObject(value as Record<string, unknown>, fullKey)) {
					return false;
				}
			}
		}
		return true;
	};

	return validateObject(payload);
}

/**
 * Validates a URL string against a standard pattern.
 * @param url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
export const validateURL = (url: string): boolean => {
	const urlRegex =
		/^(https?:\/\/)?(((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?$/;
	return urlRegex.test(url);
};
