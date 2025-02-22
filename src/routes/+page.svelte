<script lang="ts">
	import Astronaut from '$components/Astronaut.svelte';
	import ProjectCard from '$components/cards/ProjectCard.svelte';
	import {AppInfo, SiteData} from '$lib/common';
	import {projects} from '$data/projects';
	import {ArrowUpRight} from 'lucide-svelte';
	import SpaceCat from '$components/SpaceCat.svelte';
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<main>
	<div
		class="banner flex md:flex-row flex-col flex-wrap justify-center items-center h-full min-h-[calc(100vh_-_70px)] sm:p-8 p-6 pt-2 sm:gap-8 gap-4"
	>
		<div class="box grid gap-4 max-w-2xl">
			<h1 class="lg:text-8xl md:text-7xl sm:text-6xl text-5xl font-bold uppercase font-Bebas">
				<span class="tracking-wide">Hi, I am</span> <br />
				<span data-site="name">{SiteData.name}</span>.
			</h1>
			<p class="text-subtext max-w-xl" data-site="summary">
				{SiteData.summary}
			</p>
			<div class="btn-box flex gap-2 sm:gap-4 items-center flex-wrap sm:flex-nowrap">
				<a
					href="/#Contact"
					class="cn-btn rounded-full bg-primary text-primary-foreground flex gap-4 items-center p-2.5 px-5 uppercase"
				>
					<span>Contact Me</span>
					<div
						class="dot size-2 min-w-2 dark:bg-background text-foreground rounded-full grid place-items-center overflow-hidden transition-[translate_0.3s_ease-in-out]"
					>
						<span class="icon"><ArrowUpRight size="18" /></span>
					</div>
				</a>
				<a
					target="_blank"
					rel="external"
					href={AppInfo.links.linkedin}
					class="p-2.5 dark:bg-[#222] bg-[#fff] shadow-sm rounded-full grid place-items-center"
				>
					<svg
						width="26"
						height="26"
						viewBox="0 0 26 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.39825 7.79682C6.70735 7.79682 7.76858 6.73558 7.76858 5.42649C7.76858 4.11739 6.70735 3.05615 5.39825 3.05615C4.08915 3.05615 3.02792 4.11739 3.02792 5.42649C3.02792 6.73558 4.08915 7.79682 5.39825 7.79682Z"
							fill="#D3E97A"
							class="fill-primary"
						/>
						<path
							d="M10.0068 9.59282V22.7434H14.0898V16.2402C14.0898 14.5242 14.4127 12.8623 16.5403 12.8623C18.6388 12.8623 18.6648 14.8242 18.6648 16.3485V22.7445H22.75V15.5327C22.75 11.9902 21.9873 9.26782 17.8468 9.26782C15.8589 9.26782 14.5264 10.3587 13.9815 11.3912H13.9263V9.59282H10.0068ZM3.35292 9.59282H7.4425V22.7434H3.35292V9.59282Z"
							fill="#D3E97A"
							class="fill-primary"
						/>
					</svg>

					<span class="sr-only">Linkedin</span>
				</a>
				<a
					target="_blank"
					rel="external"
					href={AppInfo.links.github}
					class="p-2.5 dark:bg-[#222] bg-[#fff] shadow-sm rounded-full grid place-items-center"
				>
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

					<span class="sr-only">Github</span>
				</a>
			</div>
		</div>
		<div class="box grid place-items-center md:basis-1/4">
			<!-- <Astronaut /> -->
			<SpaceCat />
		</div>
	</div>

	<!-- <hr /> -->

	<!-- Mini About me -->
	<section class="sm:p-8 p-6 container grid md:grid-cols-2 grid-cols-1 gap-6 my-12">
		<div class="he_ md:text-7xl text-4xl uppercase md:text-center">
			<h2 class="font-Bebas">About Me</h2>
		</div>
		<div class="info space-y-4">
			<p class="text-2xl font-medium">
				I am a Frontend (Web|Mobile) Developer based in Nigeria. Has Computer Science background.
			</p>
			<p class="text-subtext">
				I am a Frontend (Web|Mobile) Developer based in Nigeria with a strong foundation in Computer
				Science. I specialize in building accessible and user-friendly web applications, with a
				particular focus on React.js, React Native, Next.js, and TypeScript. Passionate about
				solving complex problems, I’m also exploring Rust, Go, and UI/UX design to expand my skills.
				When I'm not coding, I enjoy gaming, playing Mobile Legends, and diving into new
				technologies to stay ahead in my field. Always curious and eager to learn, I aim to create
				impactful solutions through technology.
			</p>
			<br />
			<a href="/about" class="text-primary uppercase border-b-2 pb-2 border-primary"
				>More About ME</a
			>
		</div>
	</section>

	<!-- <hr /> -->

	<!-- Featured projects -->
	<section
		class="sm:p-8 p-6 container space-y-6 sm:space-y-8 md:space-y-10 mx-auto max-w-screen-lg my-12"
		id="Featured"
	>
		<div class="he_ max-w-xl">
			<h2 class="sub-title text-4xl md:text-6xl font-Bebas">Featured Projects</h2>
			<small class="text-subtext text-sm"
				>Here are some of the selected projects that showcase my passion for Frontend (Web|Mobile)
				Development.</small
			>
		</div>
		<div class="bo_">
			<div class="grid gap-12 md:gap-16">
				{#each projects.slice(0, 5) as project}
					<ProjectCard {project} />
				{/each}
			</div>
			<p class="float-right mt-4 pt-4">
				<a href="/project" class="text-primary uppercase border-b-2 pb-2 border-primary">
					All Projects
				</a>
			</p>
		</div>
	</section>
</main>

<style scoped lang="postcss">
	.cn-btn {
		.dot {
			.icon {
				@apply hidden;
			}
		}
	}

	.cn-btn:hover {
		.dot {
			@apply size-7;

			.icon {
				@apply block;
			}
		}
	}
</style>
