<script lang="ts">
	import {AppInfo} from '$lib/common';
	import Loader from '$components/Loader.svelte';
	import {beforeNavigate, afterNavigate} from '$app/navigation';
	import {fade} from 'svelte/transition';
	import {cn} from '$lib/utils/index';
	import type {Project} from '$type';
	import ProjectDetail from '$components/ProjectDetail.svelte';
	import {page} from '$app/stores';

	let isLoading = $state<boolean>(false);
	const {data}: {data: {project: Project}} = $props();

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
		<meta property="og:url" content="{AppInfo.url}/project/{$page.params.project_id}" />
	{:else}
		<title>Not Found | {AppInfo.title}</title>
	{/if}
</svelte:head>

{#key data.project}
	<div
		in:fade={{duration: 300, delay: 400}}
		out:fade={{duration: 300}}
		class={cn(
			isLoading && 'grid place-content-center place-items-center min-h-[calc(100svh_-_80px)]'
		)}
	>
		{#if isLoading}
			<Loader />
		{:else}
			<ProjectDetail project={data.project} />
		{/if}
	</div>
{/key}
