<script>
	import '../app.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Loader from '$components/Loader.svelte';
	import {beforeNavigate, afterNavigate} from '$app/navigation';

	let isLoading = false;

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));
	export let data;

	import {fade} from 'svelte/transition';
	import {cn} from '$lib/utils';
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<div class="wrapper relative">
	<Header isAuthenticated={data.isAuthentication} user={data.userProfile} />

	<!-- {#key data.pathname}
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
			{:else}
				<slot />
			{/if}
		</div>
	{/key} -->

	<slot />

	<Footer />
	<ThemeToggle />
</div>
