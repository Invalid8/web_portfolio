<script lang="ts">
	import {page} from '$app/stores';
	import {AppInfo} from '$lib/common';
	import {cn} from '$lib/utils';
	import type {UserType} from '@kinde-oss/kinde-auth-sveltekit';
	import {LucideMenuSquare, LucideX} from 'lucide-svelte';

	let {user, isAuthenticated} = $props<{user: UserType | null; isAuthenticated: boolean}>();
	let menuIsOpen = $state<boolean>(false);

	console.log(user, isAuthenticated);
</script>

{#snippet links()}
	<ul
		class={cn(
			'gap-6 md:gap-8 sm:inline-flex sm:items-center sm:text-start text-center transition-all sm:transition-none',
			menuIsOpen && 'grid',
			!menuIsOpen && 'hidden'
		)}
	>
		<li>
			<a
				class={cn(
					'font-semibold hover:underline text-xl md:text-base',
					$page?.url.pathname == '/work' && 'text-primary underline'
				)}
				onclick={() => (menuIsOpen = false)}
				href="/work">Work</a
			>
		</li>
		<li>
			<a
				class={cn(
					'font-semibold hover:underline text-xl md:text-base',
					$page?.url.pathname == '/about' && 'text-primary underline'
				)}
				onclick={() => (menuIsOpen = false)}
				href="/about">About</a
			>
		</li>
		<li>
			<a
				class={cn(
					'font-semibold hover:underline text-xl md:text-base',
					$page?.url.pathname == '/contact' && 'text-primary underline'
				)}
				onclick={() => (menuIsOpen = false)}
				href="/#Contact">Contact</a
			>
		</li>
	</ul>
{/snippet}

<header class="h-[70px] sticky top-0 left-0 right-0 z-20 bg-background">
	<nav class="nav px-[1.5rem] md:px-[3rem] ld:px-[6rem] container mx-auto items-center">
		<h1 class="text-3xl uppercase tracking-wider">
			<a href="/" class="font-Bebas text-primary">{AppInfo.author}</a>
		</h1>
		<div class="rest sm:block hidden">
			{@render links()}
		</div>
		<div
			class={cn(
				'rest sm:hidden block fixed p-2 left-0 right-0 w-full',
				menuIsOpen && 'bottom-0 h-full bg-background z-10 top-0'
			)}
		>
			{#if menuIsOpen}
				<div class="sm:hidden flex justify-end items-end mb-10 p-4">
					<button class="text-destructive text-xl" onclick={() => (menuIsOpen = false)}>
						<LucideX size="42" />
					</button>
				</div>
			{/if}
			{@render links()}
		</div>
		<button
			class="sm:hidden block"
			onclick={() => {
				menuIsOpen = !menuIsOpen;
				console.log('object');
			}}
		>
			<LucideMenuSquare size="42" />
		</button>
		<!-- {#if isAuthenticated}
			<div class="profile-blob">
				<div class="avatar">
					{user?.given_name}
				</div>
				<div>
					<p class="text-heading-2 text-capitalize">
						{user?.given_name}
						{user?.family_name}
					</p>
					<a class="text-subtle" href="/api/auth/logout"> Sign out </a>
				</div>
			</div>
		{:else}
			<div>
				<a class="btn btn-ghost sign-in-btn" href="/api/auth/login"> Sign in </a>
				<a class="btn btn-dark" href="/api/auth/register"> Sign up </a>
			</div>
		{/if} -->
	</nav>
</header>
