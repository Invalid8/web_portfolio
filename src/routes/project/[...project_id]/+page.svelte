<script lang="ts">
	import {AppInfo, goBack} from '$lib/common';
	import Loader from '$components/Loader.svelte';
	import {beforeNavigate, afterNavigate} from '$app/navigation';
	import {fade} from 'svelte/transition';
	import {cn} from '$lib/utils';
	import type {Project} from '$type';
	import {ArrowLeft} from 'lucide-svelte';
	import ProjectDetail from '$components/ProjectDetail.svelte';
	import SpaceCat from '$components/SpaceCat.svelte';

	let isLoading = $state<boolean>(false);
	const {data}: {data: {slug: String; project: Project | null}} = $props();

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));
</script>

<svelte:head>
	{#if data.project}
		<title>{data.project.title} | {AppInfo.title}</title>
		<meta property="twitter:image" content={data.project.thumbnail} />
		<meta property="twitter:card" content={data.project.thumbnail} />
		<meta property="twitter:title" content={data.project.title} />
		<meta property="twitter:description" content={data.project.description} />
		<meta property="description" content={data.project.description} />
		<meta property="og:image" content={data.project.thumbnail} />
		<meta property="og:site_name" content={data.project.title} />
		<meta property="og:title" content={data.project.title} />
		<meta property="og:description" content={data.project.description} />
		<meta property="og:url" content="{AppInfo.url}/project/{data.slug}" />
	{:else}
		<title>Not Found | {AppInfo.title}</title>
	{/if}
</svelte:head>

{#key data.slug}
	<div
		in:fade={{duration: 300, delay: 400}}
		out:fade={{duration: 300}}
		class={cn(
			'content-x min-h-[calc(100svh_-_80px)]',
			isLoading && 'grid place-content-center place-items-center'
		)}
	>
		{#if isLoading}
			<Loader />
		{:else if data.project}
			<ProjectDetail project={data.project} />
		{:else}
			<div
				class="error_page grid w-full h-full min-h-[85vh] place-content-center place-items-center p-4 md:p-6"
			>
				<div class="info flex flex-col gap-3 text-center items-center">
					<SpaceCat />
					<h1 class="text-4xl md:text-6xl uppercase mb-0 pb-0">
						{'Project not found'}
					</h1>
					<div class="btn-container mx-auto">
						<button
							class="rounded-md px-3 py-2 bg-primary text-primary-foreground font-medium flex gap-2 justify-center items-center"
							onclick={goBack}
						>
							<ArrowLeft size="16" /> Back
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/key}
