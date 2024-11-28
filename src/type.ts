export type Project = {
	thumbnail: string;
	title: string;
	description: string;
	content?: string;
	link: string;
	github: string;
	role: string;
	date: string;
	type: string | 'challenge' | 'contract' | 'freelance';
};
