<script>
	import '../app.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	export let data;
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<div class="wrapper">
	<Header isAuthenticated={data.isAuthentication} user={data.userProfile} />
	<slot />
	<Footer />
	<ThemeToggle />
</div>
