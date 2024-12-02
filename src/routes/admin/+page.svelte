<script lang="ts">
	import {showNotification} from '$lib/utils/showNotification';
	import {Loader2} from 'lucide-svelte';
	import type {PageData} from './$types';
	import {validatePayload, validateURL} from '$lib/utils/validator';
	let loading = $state<boolean>(false);

	const {data}: {data: PageData} = $props();
	const bio = $state<PageData['bio']>(data.bio);

	type Payload =
		| {name: string; username: string; description: string; about?: never; links?: never}
		| {
				about: PageData['bio']['about'];
				username?: never;
				name?: never;
				description?: never;
				links?: never;
		  }
		| {
				links: PageData['bio']['links'];
				name?: never;
				username?: never;
				about?: never;
				description?: never;
		  };

	const validateBioLinks = (links: PageData['bio']['links']): boolean => {
		for (const [key, value] of Object.entries(links)) {
			if (!value) {
				showNotification('error', `${key} is required`);
				return false;
			}
			if (!validateURL(value)) {
				showNotification('error', `${key} must be a valid URL`);
				return false;
			}
		}
		return true;
	};

	// Update function for dynamic payloads
	const updateSection = async (section: 'profile' | 'about' | 'links', payload: Payload) => {
		if (!validatePayload(payload)) return;
		if (section === 'links' && !validateBioLinks(payload.links!)) return;

		loading = true;

		try {
			const response = await fetch('/api/profile', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				showNotification('success', `Successfully updated ${section}`);
			} else {
				const error = await response.json();
				showNotification('error', error.message || `Failed to update ${section}`);
				console.log(error.message);
			}
		} catch (error) {
			showNotification('error', `Error updating ${section}`);
			console.error(error);
		} finally {
			loading = false;
		}
	};
</script>

<div class="container max-w-screen-lg">
	<h1 class="text-2xl font-bold mb-6">Admin Bio Management</h1>

	<!-- Name Section -->
	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">Profile</h3>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				updateSection('profile', {
					name: bio.name,
					username: bio.username,
					description: bio.description
				});
			}}
			class="space-y-4"
		>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Full Name</span>
				<input
					type="text"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.name}
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Username</span>
				<input
					type="text"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.username}
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Description</span>
				<textarea
					rows="3"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.description}
				></textarea>
			</label>
			<button
				type="submit"
				disabled={loading}
				class="px-4 py-2 bg-primary text-primary-foreground flex gap-2 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-95"
			>
				Update Profile
				{#if loading}
					<Loader2 size="1.5rem" class="text-primary-foreground animate-spin" />
				{/if}
			</button>
		</form>
	</section>

	<div class="divider h-[0.06rem] w-full bg-black my-8"></div>

	<!-- About Section -->
	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">Update About</h3>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				updateSection('about', {
					about: {summary: bio.about.summary, fullDetails: bio.about.fullDetails}
				});
			}}
			class="space-y-4"
		>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Summary</span>
				<textarea
					rows="2"
					maxlength="50"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.about.summary}
				></textarea>
			</label>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Full Details</span>
				<textarea
					rows="5"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.about.fullDetails}
				></textarea>
			</label>
			<button
				type="submit"
				disabled={loading}
				class="px-4 py-2 bg-primary text-primary-foreground flex gap-2 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-95"
			>
				Update About
				{#if loading}
					<Loader2 size="1.5rem" class="text-primary-foreground animate-spin" />
				{/if}
			</button>
		</form>
	</section>

	<div class="divider h-[0.08rem] w-full bg-black my-8"></div>

	<!-- Links Section -->
	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">Update Links</h3>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				updateSection('links', {links: bio.links});
			}}
			class="space-y-4"
		>
			<label class="block">
				<span class="text-sm font-medium text-subtext">GitHub</span>
				<input
					type="url"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.links.github}
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium text-subtext">LinkedIn</span>
				<input
					type="url"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.links.linkedin}
				/>
			</label>
			<label class="block">
				<span class="text-sm font-medium text-subtext">Resume</span>
				<input
					type="url"
					class="mt-1 block w-full rounded-md border-input bg-background shadow-sm focus:border-primary focus:ring-primary"
					bind:value={bio.links.resume}
				/>
			</label>
			<button
				type="submit"
				disabled={loading}
				class="px-4 py-2 bg-primary text-primary-foreground flex gap-2 items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-95"
			>
				Update Links
				{#if loading}
					<Loader2 size="1.5rem" class="text-primary-foreground animate-spin" />
				{/if}
			</button>
		</form>
	</section>
</div>

<style lang="postcss">
	h1,
	h3 {
		@apply font-sans;
	}
</style>
