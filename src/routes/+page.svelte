<script>
	import {AppInfo} from '$lib/common';
</script>

<svelte:head>
	<title>{AppInfo.title} | Home</title>
</svelte:head>

<main>
	<div class="container">
		<div class="card hero">
			<p class="text-display-1 hero-title">
				Let's start authenticating <br /> with KindeAuth
			</p>
			<p class="text-body-1 hero-tagline">Configure your app</p>

			<a
				class="btn btn-light btn-big"
				href="https://kinde.com/docs/developer-tools/sveltekit-sdk/"
				target="_blank"
			>
				Go to docs
			</a>
		</div>
	</div>
</main>
