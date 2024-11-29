<script lang="ts">
	import '../app.css';
	import 'aos/dist/aos.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Contact from '$components/Contact.svelte';
	import AOS from 'aos';

	import {onMount} from 'svelte';
	import type {UserProfile} from '$type';

	import {page} from '$app/stores';
	export let data: {isAuthentication: boolean; user: UserProfile};
	const exemptPaths = ['/auth', '/admin'];

	onMount(() => {
		AOS.init();
	});

	function isExempted() {
		return exemptPaths.some((path) => $page.url.pathname.startsWith(path));
	}
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<div class="wrapper relative">
	{#if !isExempted()}
		<Header isAuthenticated={data.isAuthentication} user={data.user} />
	{/if}

	<div class="content-x min-h-[calc(100svh_-_80px)]">
		<slot />
	</div>

	<!-- Lets Connect -->
	{#if !isExempted()}
		<br />
		<br />
		<hr />
		<Contact />
		<Footer />
	{/if}
	<ThemeToggle />
</div>
