import {projects} from '$data/projects';
import {toSlug} from '$lib/common';
import type {Project} from '$type';
import type {RequestEvent} from '@sveltejs/kit';

export async function load({url}: RequestEvent) {
	const {pathname} = url;

	const project: Project | undefined = projects.find(
		(x) => toSlug(x.title) === pathname.replace('/project/', '')
	);

	return {
		slug: pathname.replace('/project/', ''),
		project
	};
}
