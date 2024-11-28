import {experiences} from './data/experiences';
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

export type Skill = {
	id: number;
	key: string;
	value: string;
	skillLevel: number;
	description: string;
	img: string;
	color?: string;
};

export type Experience = {
	id: number;
	position: {
		title: string;
		role: string;
		duration: string;
	};
	company: {
		name: string;
		location: string;
		link: string;
		logo: string;
	};
	skills: string[];
};
