<script lang="ts">
	import {z} from 'zod';
	import type {Project} from '$type';
	import SvelteTipTap from '$components/editor/SvelteTipTap.svelte';

	const {type = 'create'}: {type?: 'create' | 'edit'} = $props();
	let errorMessage = $state('');

	type ProjectWithoutId = Omit<Project, 'id'>;

	// Project store for edit functionality
	let project = $state<ProjectWithoutId>({
		thumbnail: '',
		medias: [],
		title: '',
		description: '',
		content: '',
		link: '',
		github: '',
		role: '',
		date: '',
		type: 'freelance'
	});

	// Validation schema using Zod
	const projectSchema = z.object({
		thumbnail: z.string().url('Invalid thumbnail URL'),
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(10, 'Description must be at least 10 characters'),
		link: z.string().url('Invalid project link'),
		github: z.string().url('Invalid GitHub link'),
		role: z.string().min(1, 'Role is required'),
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
		type: z.enum(['challenge', 'contract', 'freelance']),
		medias: z.array(
			z.object({
				link: z.string().url('Invalid media link'),
				type: z.enum(['image', 'video'])
			})
		),
		content: z.string().optional()
	});

	// Save or update the project
	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Validate data
		const result = projectSchema.safeParse(project);
		if (!result.success) {
			errorMessage = result.error.errors.map((err) => err.message).join(', ');
			return;
		}

		// API Call (placeholder)
		console.log('Project saved:', project);
		alert('Project saved successfully!');
	}
</script>

<form onsubmit={handleSubmit} class="p-6 sm:space-y-4 bg-sidebar h-full rounded-md grid">
	<h2>{type === 'edit' ? 'Edit Project' : 'Create Project'}</h2>

	<label>
		Thumbnail:
		<input type="url" bind:value={project.thumbnail} placeholder="Thumbnail URL" />
	</label>
	<img src={project.thumbnail} alt="Thumbnail preview" class="thumbnail-preview" />

	<label>
		Title:
		<input type="text" bind:value={project.title} placeholder="Project Title" />
	</label>

	<label>
		Description:
		<textarea bind:value={project.description} placeholder="Project Description"></textarea>
	</label>

	<label>
		Project Link:
		<input type="url" bind:value={project.link} placeholder="https://example.com" />
	</label>

	<label>
		GitHub Link:
		<input type="url" bind:value={project.github} placeholder="https://github.com/repo" />
	</label>

	<label>
		Role:
		<input type="text" bind:value={project.role} placeholder="Your Role (e.g., Developer)" />
	</label>

	<label>
		Date:
		<input type="date" bind:value={project.date} />
	</label>

	<label>
		Type:
		<select bind:value={project.type}>
			<option value="challenge">Challenge</option>
			<option value="contract">Contract</option>
			<option value="freelance">Freelance</option>
		</select>
	</label>

	<div>
		<label
			>Medias:
			<div class="media-list">
				{#each project.medias as media, i}
					<div class="media-item">
						<input type="url" bind:value={project.medias[i].link} placeholder="Media Link" />
						<select bind:value={project.medias[i].type}>
							<option value="image">Image</option>
							<option value="video">Video</option>
						</select>
						<button type="button" onclick={() => project.medias.splice(i, 1)}>Remove</button>
					</div>
				{/each}
			</div>
		</label>
		<button type="button" onclick={() => project.medias.push({link: '', type: 'image'})}
			>Add Media</button
		>
	</div>

	<div>
		<label>
			<span class="mb-4">Content:</span>
			<!-- <TipTapEditor content={project.content} /> -->
			<SvelteTipTap content={project.content} />
		</label>
	</div>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	<button type="submit">{type === 'edit' ? 'Update Project' : 'Create Project'}</button>
</form>

<style>
	/* Add your styles here */
	.thumbnail-preview {
		width: 100%;
		max-width: 200px;
		height: auto;
		border: 1px solid #ccc;
		margin: 10px 0;
	}
	.media-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.media-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
