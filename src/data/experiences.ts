import type {Experience} from '$type';

export const experiences: Experience[] = [
	{
		id: 1,
		position: {
			title: 'IT Consultant',
			role: 'I solve daily IOT issues, by giving precise step by step solutions to client IT problems.',
			duration: '2018 - 2019'
		},
		company: {
			name: 'Ulma IT Solutions',
			location: 'Hybrid (Lagos, Nigeria)',
			link: '',
			logo: ''
		},
		skills: ['IOT', 'IT Consultant']
	},
	{
		id: 2,
		position: {
			title: 'Desktop Publisher',
			role: 'Later I began working as a Desktop Publisher at a Cyber Cafe. While working there I was able to improve in my desktop publishing skills.',
			duration: '2019 - 2020'
		},
		company: {
			name: 'Indiana Ventures',
			location: 'On Site (Lagos, Nigeria)',
			link: '',
			logo: ''
		},
		skills: [
			'IOT',
			'Ms Word',
			'Ms Excel',
			'PowerPoint',
			'Typing',
			'Graphic Design',
			'IT Consultant'
		]
	},
	{
		id: 3,
		position: {
			title: 'frontend web developer',
			role: 'Currently Working as a Frontend & Backend Web development freelancer',
			duration: '2020 - Current'
		},
		company: {
			name: 'upwork',
			location: 'Remote',
			link: 'https://upwork.com',
			logo: '/assets/image/icons/upwork.svg'
		},
		skills: ['HTML5', 'React', 'JavaScript', 'CSS']
	},
	{
		id: 4,
		position: {
			title: 'backend web developer',
			role: 'Currently Working as a Frontend & Backend Web development freelancer',
			duration: '2021 - Current'
		},
		company: {
			name: 'freelancer',
			location: 'Remote',
			link: 'https://freelancer.com',
			logo: '/assets/image/icons/freelancer.svg'
		},
		skills: ['Node Js', 'EJS', 'Django', 'Fastly', 'Express']
	}
];
