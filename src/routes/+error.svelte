<script>
	import {page} from '$app/stores';
	import {HomeIcon} from 'lucide-svelte';
</script>

<div
	class="error_page grid w-full h-full min-h-[85vh] place-content-center place-items-center p-4 md:p-6"
>
	<div class="info flex flex-col gap-3 text-center items-center">
		<img src="/space-cat.svg" width="500" alt="cat in space" />
		<h1 class="text-4xl md:text-6xl uppercase mb-0 pb-0">
			{$page?.error?.message || 'An Unexpected Error Occurred'}
		</h1>
		<div class="btn-container mx-auto">
			<a
				href="/"
				class="rounded-md px-3 py-2 bg-primary text-black font-medium flex gap-2 justify-center items-center"
			>
				<HomeIcon size="16" /> Home
			</a>
		</div>
	</div>
</div>
