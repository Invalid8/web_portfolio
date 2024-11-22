<script lang="ts">
	import {page} from '$app/stores';
	import {AppInfo} from '$lib/common';
	import {cn} from '$lib/utils';
	import type {UserType} from '@kinde-oss/kinde-auth-sveltekit';
	import {LucideMenu} from 'lucide-svelte';

	export let user: UserType | null;
	export let isAuthenticated: boolean;

	console.log(user, isAuthenticated);
</script>

{#snippet links()}
	<ul class="sm:inline-flex grid gap-6 md:gap-8">
		<li>
			<a
				class={cn(
					'font-semibold hover:underline',
					$page?.url.pathname == '/work' && 'text-[#D3E97A] underline'
				)}
				href="/work">Work</a
			>
		</li>
		<li>
			<a
				class={cn(
					'font-semibold hover:underline',
					$page?.url.pathname == '/about' && 'text-[#D3E97A] underline'
				)}
				href="/about">About</a
			>
		</li>
		<li>
			<a
				class={cn(
					'font-semibold hover:underline',
					$page?.url.pathname == '/contact' && 'text-[#D3E97A] underline'
				)}
				href="/contact">Contact</a
			>
		</li>
	</ul>
{/snippet}

<header>
	<nav class="nav px-[1.5rem] md:px-[3rem] ld:px-[6rem]">
		<h1 class="text-3xl uppercase tracking-wider">
			<a href="/" class="font-Bebas">{AppInfo.author}</a>
		</h1>
		<div class="rest sm:block hidden">
			{@render links()}
		</div>
		<div
			class="rest sm:hidden block fixed top-[75px] p-2 z-10 left-0 right-0 w-full bottom-0 h-full bg-slate-900"
		>
			{@render links()}
		</div>
		<button class="sm:hidden block">
			<LucideMenu />
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
