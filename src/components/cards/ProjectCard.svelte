<script lang="ts">
	import {toSlug} from '$lib/common';
	import type {Project} from '$type';
	import {ArrowUpRight} from 'lucide-svelte';

	let {project}: {project: Project} = $props();
</script>

<div
	class="p-card grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-6 sm:gap-8 md:gap-10 mx-auto items-center col-span-1"
>
	<div
		class="image-in-box md:size-full sm:size-96 size-full aspect-square place-content-center relative rounded-md bg-[#777]/10 sm:p-8 p-6 hover:-translate-y-5 transition-[translate_0.3s_ease-in-out] cursor-pointer hover:bg-[#777]/20"
	>
		<div
			class="tag absolute top-4 left-4 rounded-full bg-black text-white p-2 px-4 text-xs font-semibold capitalize"
		>
			{project.type}
		</div>
		<div class="img-box aspect-[10/6] bg-black rounded-md overflow-hidden">
			<img src={project.thumbnail} alt={project.title} class="object-cover w-full h-full" />
		</div>
		<a
			href="/project/{toSlug(project.title)}"
			aria-label="{toSlug(project.title)} project-link"
			class="absolute z-10 top-0 right-0 bottom-0 left-0 size-full"
		>
		</a>
	</div>
	<div class="md:space-y-4 space-y-2">
		<span class="title font-semibold text-2xl">
			{project.title}
		</span>
		<p>
			{project.description}
		</p>
		<div class="crude pt-2 space-y-4 text-sm">
			<span class="uppercase text-md">Project Info</span>
			<!-- <hr /> -->
			<div class="flex justify-between gap-4">
				<span>Year</span>
				<span class="text-subtext">{new Date(project.date).getFullYear()}</span>
			</div>
			<!-- <hr /> -->
			<div class="flex justify-between gap-4">
				<span>Role</span>
				<span class="text-subtext">{project.role}</span>
			</div>
			<!-- <hr /> -->
		</div>
		<div class="flex gap-4 md:gap-6 pt-4 flex-wrap">
			<a
				href={project.link}
				target="_blank"
				class="text-primary uppercase border-b-2 border-primary hover:opacity-90 flex gap-2"
			>
				Live Demo
				<ArrowUpRight class="mb-0 pb-0" />
			</a>
			<a
				href={project.github}
				target="_blank"
				class="text-primary uppercase border-b-2 border-primary pb-2 hover:opacity-90"
			>
				<span class="flex gap-2 items-center">
					See on Github
					<svg
						width="26"
						height="26"
						viewBox="0 0 26 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M13.0282 2.16675C7.06008 2.16675 2.223 7.00383 2.223 12.9719C2.223 17.7451 5.31808 21.7957 9.61242 23.2257C10.153 23.3232 10.348 22.9906 10.348 22.7046C10.348 22.4478 10.3393 21.7675 10.3361 20.8673C7.32983 21.5194 6.695 19.4178 6.695 19.4178C6.20533 18.1698 5.49575 17.8372 5.49575 17.8372C4.51533 17.1666 5.5705 17.1818 5.5705 17.1818C6.656 17.2576 7.22475 18.2954 7.22475 18.2954C8.18892 19.9464 9.75542 19.4698 10.3686 19.1935C10.4672 18.4948 10.7488 18.0181 11.0565 17.7483C8.658 17.4764 6.136 16.5491 6.136 12.4075C6.136 11.2299 6.55742 10.2636 7.24533 9.50958C7.13592 9.2355 6.76217 8.13592 7.35258 6.64958C7.35258 6.64958 8.25933 6.35817 10.3231 7.75567C11.2045 7.51589 12.1137 7.3935 13.0271 7.39167C13.9405 7.39315 14.8498 7.51554 15.7311 7.75567C17.7959 6.35708 18.7016 6.64958 18.7016 6.64958C19.292 8.13592 18.9215 9.2355 18.8088 9.50958C19.5022 10.2636 19.9182 11.2288 19.9182 12.4075C19.9182 16.5599 17.394 17.4721 14.9868 17.7397C15.3714 18.0733 15.7181 18.732 15.7181 19.7395C15.7181 21.1847 15.7051 22.3503 15.7051 22.7046C15.7051 22.9938 15.8979 23.3297 16.4493 23.2235C20.7415 21.7913 23.8333 17.744 23.8333 12.9719C23.8333 7.00383 18.9963 2.16675 13.0282 2.16675Z"
							fill="#D3E97A"
							class="fill-primary"
						/>
					</svg>
				</span>
			</a>
		</div>
	</div>
</div>
