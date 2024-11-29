<script>
	import '../app.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Contact from '$components/Contact.svelte';

	export let data;
</script>

<svelte:head>
	<title>{AppInfo.title}</title>
</svelte:head>

<div class="wrapper relative">
	<Header isAuthenticated={data.isAuthentication} user={data.userProfile} />

	<slot />

	<!-- <hr /> -->
	<!-- Lets Connect -->
	<Contact />
	<Footer />
	<ThemeToggle />
</div>
