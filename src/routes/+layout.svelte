<script lang="ts">
	import '../app.css';
	import 'aos/dist/aos.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo, isExempted} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Contact from '$components/Contact.svelte';
	import AOS from 'aos';
	import {ToastContainer, FlatToast} from 'svelte-toasts';

	import {onMount} from 'svelte';

	import {page} from '$app/stores';
	import type {PageData} from './$types';

	const {data, children}: {data: PageData; children: () => any} = $props();

	onMount(() => {
		AOS.init();
	});
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<div class="wrapper relative">
	{#if !isExempted($page.url.pathname)}
		<Header isAuthenticated={data.isAuthentication} user={data?.user} />
	{/if}

	{#if !isExempted($page.url.pathname)}
		<div class="content-x min-h-[calc(100svh_-_75px)]">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}

	<!-- Lets Connect -->
	{#if !isExempted($page.url.pathname)}
		<br />
		<br />
		<hr />
		<Contact />
		<Footer />
	{/if}
	<ThemeToggle />
	<ToastContainer let:data>
		<FlatToast {data} />
	</ToastContainer>
</div>
