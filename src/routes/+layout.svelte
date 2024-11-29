<script lang="ts">
	import '../app.css';
	import 'aos/dist/aos.css';
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import {AppInfo} from '$lib/common';
	import ThemeToggle from '$components/ThemeToggle.svelte';
	import Contact from '$components/Contact.svelte';
	import AOS from 'aos';
	import type {UserType} from '@kinde-oss/kinde-auth-sveltekit';
	import {onMount} from 'svelte';

	export let data: {isAuthentication: boolean; userProfile: UserType};

	onMount(() => {
		AOS.init();
	});
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
