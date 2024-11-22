<script lang="ts">
	import {Sun, Moon} from 'lucide-svelte';
	import {theme} from '$store/themeStore';

	function toggleTheme() {
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
	}
</script>

<div class="fixed bottom-4 right-4 flex items-center">
	<input
		checked={$theme === 'dark'}
		on:click={toggleTheme}
		type="checkbox"
		id="theme-toggle"
		class="hidden"
	/>
	<label for="theme-toggle" class="toggle-label flex items-center justify-center">
		{#if $theme === 'dark'}
			<Moon class="w-6 h-6 text-white" /> <!-- Dark mode icon -->
		{:else}
			<Sun class="w-6 h-6 text-gray-900" /> <!-- Light mode icon -->
		{/if}
	</label>
</div>

<style lang="postcss" scoped>
	/* Hide checkbox from view */
	.hidden {
		@apply invisible;
	}

	/* Style the toggle button */
	.toggle-label {
		@apply cursor-pointer h-12 w-12 rounded-full bg-amber-400 dark:bg-gray-800 flex items-center justify-center;
		@apply transition duration-300;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	}

	/* Hover effects */
	.toggle-label:hover {
		@apply bg-amber-500 dark:bg-gray-700;
	}
</style>
