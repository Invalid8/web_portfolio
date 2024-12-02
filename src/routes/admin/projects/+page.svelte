<script lang="ts">
	import {writable} from 'svelte/store';
	import {onMount} from 'svelte';
	import {Button, buttonVariants} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import * as Table from '$lib/components/ui/table/index';
	import * as Pagination from '$lib/components/ui/pagination';
	import * as Tabs from '$lib/components/ui/tabs';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import {CirclePlus, ChevronLeft, ChevronRight, Ellipsis} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import {goto} from '$app/navigation';
	import {MediaQuery} from 'runed';

	const isDesktop = new MediaQuery('(min-width: 768px)');
	const count = 20;

	const perPage = $derived(isDesktop.matches ? 3 : 8);
	const siblingCount = $derived(isDesktop.matches ? 1 : 0);

	interface Project {
		id: number;
		name: string;
		description: string;
		status: string;
		createdAt: string;
	}

	// Dummy Data
	let projects = writable<Project[]>([
		{
			id: 1,
			name: 'Portfolio Redesign',
			description:
				'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
			status: 'Active',
			createdAt: '2024-11-29'
		},
		{
			id: 2,
			name: 'E-commerce API',
			description:
				'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
			status: 'Draft',
			createdAt: '2024-10-01'
		},
		{
			id: 3,
			name: 'Landing Page',
			description:
				'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
			status: 'Archived',
			createdAt: '2024-09-15'
		}
	]);

	let filteredProjects = $state<Project[]>([]);
	let showAddModal = $state(false);
	const currentPage = 1;
	const itemsPerPage = 5;
	let status = $state('all');

	// Computed Pagination Data
	let paginatedProjects = $derived<Project[]>(
		filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	// Initialize Data
	onMount(() => {
		filteredProjects = $projects;
	});

	// Helpers
	const formatDate = (date: string): string => new Date(date).toLocaleDateString();

	const getStatusClass = (status: string): string => {
		switch (status) {
			case 'Active':
				return 'bg-transparent border-2 badge-success';
			case 'Draft':
				return 'bg-transparent border-2 badge-warning';
			case 'Archived':
				return 'bg-transparent border-2 badge-neutral';
			default:
				return 'bg-transparent border-2 badge-default';
		}
	};

	// Event Handlers
	const handleFilter = (statusX: 'all' | 'active' | 'draft' | 'archived') => {
		status = statusX;
		if (statusX === 'all') {
			filteredProjects = $projects;
		} else {
			filteredProjects = $projects.filter((project) => project.status === statusX);
		}
	};

	const handleAddProject = (newProject: Omit<Project, 'id'>) => {
		const newProjects = [...$projects, {...newProject, id: $projects.length + 1}];
		projects.set(newProjects);
		filteredProjects = newProjects;
		showAddModal = false;
	};

	const handleDelete = (id: number) => {
		const updatedProjects = $projects.filter((project) => project.id !== id);
		projects.set(updatedProjects);
		filteredProjects = updatedProjects;
	};

	const handleEdit = (id: number) => {
		alert(`Edit project with ID: ${id}`);
	};
</script>

<div class="p-6 sm:space-y-4 bg-sidebar h-svh rounded-md">
	<h1 class="text-2xl font-bold">Projects Dashboard</h1>

	<Tabs.Root value={status}>
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="all" onclick={() => handleFilter('all')}>All</Tabs.Trigger>
				<Tabs.Trigger value="active" onclick={() => handleFilter('active')}>Active</Tabs.Trigger>
				<Tabs.Trigger value="draft" onclick={() => handleFilter('draft')}>Draft</Tabs.Trigger>
				<Tabs.Trigger
					value="archived"
					onclick={() => handleFilter('archived')}
					class="hidden sm:flex">Archived</Tabs.Trigger
				>
			</Tabs.List>
			<div class="ml-auto flex items-center gap-2">
				<Button size="sm" class="h-8 gap-1" onclick={() => (showAddModal = true)}>
					<CirclePlus class="h-3.5 w-3.5" />
					<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
				</Button>
			</div>
		</div>
		<Tabs.Content value={status}>
			<!-- Projects Table -->
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[65px]">S/N</Table.Head>
						<Table.Head class="min-w-[100px] sm:table-cell">
							<span class="sr-only">Image</span>
						</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Description</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Created At</Table.Head>
						<Table.Head>Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each paginatedProjects as project, index}
						<Table.Row
							onclick={() => {
								goto('/admin/projects/' + project.id);
							}}
							class="cursor-pointer hover:opacity-70"
						>
							<Table.Cell>{index + 1}.</Table.Cell>
							<Table.Cell class="table-cell">
								<img
									alt="Product example"
									class="aspect-square rounded-md object-cover bg-background text-transparent min-w-12"
									height="64"
									src="/icons/svelte-icon.svg"
									width="64"
								/>
							</Table.Cell>
							<Table.Cell>{project.name}</Table.Cell>
							<Table.Cell class="max-w-[200px] truncate">{project.description}</Table.Cell>
							<Table.Cell
								><Badge class={getStatusClass(project.status)}>{project.status}</Badge></Table.Cell
							>
							<Table.Cell>{formatDate(project.createdAt)}</Table.Cell>
							<Table.Cell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger class={buttonVariants({variant: 'ghost', size: 'icon'})}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<!-- <DropdownMenu.Label>Actions</DropdownMenu.Label> -->
										<DropdownMenu.Item class="cursor-pointer" onclick={() => handleEdit(project.id)}
											>Edit</DropdownMenu.Item
										>
										<DropdownMenu.Item
											class="cursor-pointer text-destructive"
											onclick={() => handleDelete(project.id)}>Delete</DropdownMenu.Item
										>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>

			<!-- Pagination -->
			<Pagination.Root
				page={currentPage}
				count={filteredProjects.length}
				perPage={itemsPerPage}
				siblingCount={1}
			>
				{#snippet children({pages, currentPage})}
					<Pagination.Content>
						<Pagination.Item>
							<Pagination.PrevButton>
								<ChevronLeft class="h-4 w-4" />
								<span class="hidden sm:block">Previous</span>
							</Pagination.PrevButton>
						</Pagination.Item>
						{#each pages as page (page.key)}
							{#if page.type === 'ellipsis'}
								<Pagination.Item>
									<Pagination.Ellipsis />
								</Pagination.Item>
							{:else}
								<Pagination.Item>
									<Pagination.Link {page} isActive={currentPage === page.value}>
										{page.value}
									</Pagination.Link>
								</Pagination.Item>
							{/if}
						{/each}
						<Pagination.Item>
							<Pagination.NextButton>
								<span class="hidden sm:block">Next</span>
								<ChevronRight class="h-4 w-4" />
							</Pagination.NextButton>
						</Pagination.Item>
					</Pagination.Content>
				{/snippet}
			</Pagination.Root>
		</Tabs.Content>
	</Tabs.Root>

	<!-- Add Project Modal -->
	{#if showAddModal}
		<Dialog.Root>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>Edit profile</Dialog.Title>
					<Dialog.Description>
						Make changes to your profile here. Click save when you're done.
					</Dialog.Description>
				</Dialog.Header>
				<form
					onsubmit={(e) => {
						e.preventDefault();

						const form = e.target as HTMLFormElement;
						const name = (form.elements.namedItem('name') as HTMLInputElement).value;
						const status = (form.elements.namedItem('status') as HTMLSelectElement).value;
						handleAddProject({name, status, createdAt: new Date().toISOString(), description: ''});
					}}
				>
					<Input type="text" name="name" placeholder="Project Name" required />
					<Select.Root type="single" name="status">
						<Select.Trigger class="w-[180px]">
							{status}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Item value={'active'} label={'Active'}>{'Active'}</Select.Item>
								<Select.Item value={'Draft'} label={'Draft'}>{'Draft'}</Select.Item>
								<Select.Item value={'Archived'} label={'Archived'}>{'Archived'}</Select.Item>
							</Select.Group>
						</Select.Content>
					</Select.Root>

					<Button type="submit">Save</Button>
				</form>
				<Dialog.Footer>
					<Button variant="secondary" onclick={() => (showAddModal = false)}>Close</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
</div>

<style type="postcss">
	/* Custom styling for the table, modal, badges, pagination, etc. */
	/* .badge-success {
		background-color: green;
		color: white;
	}
	.badge-warning {
		background-color: yellow;
		color: black;
	}
	.badge-neutral {
		background-color: gray;
		color: white;
	} */
</style>
