import {projects} from '$data/projects';
import {toSlug} from '$lib/common';
import type {Project} from '$type';
import {error, type RequestEvent} from '@sveltejs/kit';

export async function load({params}: RequestEvent) {
	const project: Project | undefined = projects.find((x) => toSlug(x.title) === params.project_id);

	if (!project) error(404, 'Project Not Found');

	return {
		project
	};
}
