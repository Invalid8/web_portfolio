<script lang="ts">
	import {afterNavigate, beforeNavigate, goto} from '$app/navigation';
	import Loader from '$components/Loader.svelte';
	import {cn} from '$lib/utils';
	import type {PageData} from './$types';
	import AppSidebar from './Sidebar.svelte';
	import {fade} from 'svelte/transition';

	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import {buttonVariants} from '$lib/components/ui/button/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let isLoading = $state<boolean>(false);
	const {data, children}: {data: PageData; children: () => any} = $props();

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));
</script>

<Sidebar.Provider>
	<AppSidebar />

	<Sidebar.Inset>
		<header
			class="sticky top-0 shrink-0 border-b p-4 max-w-full bg-sidebar border-sidebar-border flex gap-6 justify-between sm:px-8 items-center"
		>
			<div class="flex items-center gap-2">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">All Inboxes</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Inbox</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="relative">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class={buttonVariants({variant: 'outline', size: 'icon'})}>
						<img
							src={data.user.photoURL}
							width={36}
							height={36}
							alt="Avatar"
							class="overflow-hidden"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="bg-background">
						<DropdownMenu.Label>Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => goto('/')}>Home</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</header>

		<!-- Main Content -->
		{#key data.isAuthentication}
			<main
				in:fade={{duration: 300, delay: 400}}
				out:fade={{duration: 300}}
				class={cn(
					isLoading && 'grid place-content-center place-items-center h-[85svh] relative',
					!isLoading && 'flex flex-1 flex-col gap-4 p-4 max-w-[100vw] overflow-auto'
				)}
			>
				{#if isLoading}
					<Loader />
				{:else}
					{@render children!()}
				{/if}
			</main>
		{/key}
	</Sidebar.Inset>
</Sidebar.Provider>
