import type {User, UserInfo} from 'firebase/auth';

export type Project = {
	id: string | number;
	thumbnail: string;
	medias: {link: string; type: 'image' | 'video'}[];
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
	id: number | string;
	key: string;
	value: string;
	skillLevel: number;
	description: string;
	img: string;
	color?: string;
};

export type Experience = {
	id: number | string;
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
	skills: Skill[];
};

export interface Bio {
	id: string;
	fullName: string;
	title: string; // For example: 'Software Developer', 'Full Stack Developer'
	aboutMe: string;
	contactEmail: string;
	phoneNumber?: string;
	createdAt: FirebaseFirestore.Timestamp;
}

export interface UserProfile extends User {
	role: string;
}

export type LocalUser = {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
};

type Optional<T> = T | undefined | null;

export type UserType = {
	displayName: Optional<string>;
	photoURL: Optional<string>;
	uid: string;
	email: Optional<string>;
};
