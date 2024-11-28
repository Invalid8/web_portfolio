<script>
	import ProjectCard from '$components/cards/ProjectCard.svelte';
	import {projects} from '$data/projects';
</script>

<main>
	<!-- All projects -->
	<section
		class="sm:p-8 p-6 container space-y-6 sm:space-y-8 md:space-y-10 mx-auto max-w-screen-lg my-12"
		id="Featured"
	>
		<div class="he_ max-w-xl">
			<h2 class="sub-title text-4xl md:text-6xl">All Projects</h2>
			<small class="text-subtext text-sm">
				Here is a collection of projects that reflect my enthusiasm and expertise in web
				development.
			</small>
		</div>
		<div class="bo_">
			<div class="grid gap-8 md:gap-12">
				{#each projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</div>
	</section>
</main>
