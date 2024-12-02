<script>
	import {page} from '$app/stores';
	import SpaceCat from '$components/SpaceCat.svelte';
	import {goBack, isExempted} from '$lib/common';
	import {cn} from '$lib/utils';
	import {ArrowLeft} from 'lucide-svelte';
</script>

<div
	class={cn(
		'error_page grid w-full h-full min-h-[85vh] place-content-center place-items-center p-4 md:p-6',
		isExempted($page.url.pathname) && 'min-h-svh'
	)}
>
	<div class="info flex flex-col gap-3 text-center items-center">
		<SpaceCat />
		<h1 class="sp-h text-4xl md:text-6xl uppercase mb-0 pb-0">
			{$page?.error?.message || 'An Unexpected Error Occurred'}
		</h1>
		<div class="btn-container mx-auto">
			<button
				onclick={goBack}
				class="rounded-md px-3 py-2 bg-primary text-black font-medium flex gap-2 justify-center items-center"
			>
				<ArrowLeft size="16" /> Back
			</button>
		</div>
	</div>
</div>
