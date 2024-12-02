<script lang="ts">
	import User from 'lucide-svelte/icons/user';
	import Briefcase from 'lucide-svelte/icons/briefcase';
	import Star from 'lucide-svelte/icons/star';
	import Layers from 'lucide-svelte/icons/layers';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {cn} from '$lib/utils';
	import {type Props} from '$lib/components/ui/button';

	import {page} from '$app/stores';
	import Logout from '$components/Logout.svelte';
	// import Settings_2 from 'lucide-svelte/icons/settings-2';

	// Menu items.
	const items = [
		{
			title: 'Bio',
			url: '/admin',
			icon: User
		},
		{
			title: 'Projects',
			url: '/admin/projects',
			icon: Star
		},
		{
			title: 'Skills',
			url: '/admin/skills',
			icon: Layers
		},
		{
			title: 'Experience',
			url: '/admin/experience',
			icon: Briefcase
		}
		// {
		// 	title: 'Settings',
		// 	url: '#',
		// 	icon: Settings_2
		// }
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="text-3xl font-Bebas text-primary mb-4 pt-4"
				>Application</Sidebar.GroupLabel
			>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-6 mt-4">
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton class="text-xl py-5 px-3 hover:text-primary">
								{#snippet child({props}: {props: Props})}
									<a
										href={item.url}
										{...props}
										class={cn(props?.class, item.url === $page.url.pathname ? 'text-primary' : '')}
									>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="p-4">
		<Logout
			className="flex-row-reverse bg-primary text-primary-foreground p-4 py-2 rounded-md w-full text-center justify-center"
		/>
	</Sidebar.Footer>
</Sidebar.Root>
