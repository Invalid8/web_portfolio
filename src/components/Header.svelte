<script lang="ts">
	import {page} from '$app/stores';
	import {AppInfo} from '$lib/common';
	import {cn} from '$lib/utils/index';
	import type {UserType} from '$type';
	import {LucideMenuSquare, LucideX} from 'lucide-svelte';
	import AvatarDrop from './ui/AvatarDrop.svelte';

	let {user, isAuthenticated}: {user: UserType | null; isAuthenticated: boolean} = $props();

	let menuIsOpen = $state<boolean>(false);
</script>

{#snippet links()}
	<ul
		class={cn(
			'gap-6 md:gap-8 sm:inline-flex sm:items-center sm:text-start text-center transition-all sm:transition-none ease-in-out',
			menuIsOpen && 'grid',
			!menuIsOpen && 'hidden'
		)}
	>
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
					$page?.url.pathname == '/project' && 'text-primary underline'
				)}
				onclick={() => (menuIsOpen = false)}
				href="/project">Project</a
			>
		</li>
		<li>
			<a
				class={cn(
					'font-semibold text-xl hover:opacity-80 md:text-base rounded-full px-3 py-2 bg-primary text-primary-foreground',
					$page?.url.hash.includes('/Contact') && 'text-primary underline'
				)}
				onclick={() => (menuIsOpen = false)}
				href="#Contact">Contact Me</a
			>
		</li>
		{#if isAuthenticated && user}
			<li>
				<AvatarDrop {user} />
			</li>
		{/if}
	</ul>
{/snippet}

<header class="h-[70px] sticky top-0 left-0 right-0 z-20 bg-background w-full">
	<nav
		class="nav px-[1.5rem] md:px-[3rem] ld:px-[6rem] container max-w-screen-xl md:mx-auto items-center w-full"
	>
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
			}}
		>
			<LucideMenuSquare size="42" />
		</button>
	</nav>
</header>

<style scoped>
	.nav {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding-bottom: 2rem;
		padding-top: 2rem;
		width: 100%;
		height: 75px;
	}
</style>
