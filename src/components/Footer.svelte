<script>
	import {AppInfo} from '$lib/common';
</script>

<footer class="p-2 footer rounded-none bg-base-200 font-bold">
	<div class="container mx-auto flex justify-center flex-wrap items-center">
		<p class="flex items-center">
			Made with <span class="text-red-500 mx-1">❤</span> using
			<span class="ml-2 mr-1"
				><img src="/icons/svelte-icon.svg" class="h-4" alt="Svelte icon" /></span
			>
			SvelteKit
		</p>
	</div>
	<div class="text-center">
		<small class="text-subtext">
			© {new Date().getFullYear()}
			{AppInfo.author} All rights reserved
		</small>
	</div>
</footer>
