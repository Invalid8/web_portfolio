<script lang="ts">
	import Logout from '$components/Logout.svelte';
	import type {UserType} from '$type';
	import {createDropdownMenu, melt} from '@melt-ui/svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import {fly} from 'svelte/transition';

	const {user}: {user: UserType} = $props();

	const {
		elements: {trigger, menu, item, separator, arrow},
		states: {open}
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});
</script>

<button type="button" class="trigger iconX" use:melt={$trigger} aria-label="Update dimensions">
	<Avatar.Root>
		<Avatar.Image src={user.photoURL} alt={user.displayName} />
		<Avatar.Fallback
			>{user.displayName?.charAt(0)}{user?.displayName?.split(' ')[1].charAt(0)}</Avatar.Fallback
		>
	</Avatar.Root>
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div class=" menu" use:melt={$menu} transition:fly={{duration: 150, y: -10}}>
		<div class="item" use:melt={$item}><a href="/admin">Admin</a></div>
		<div class="item !text-red-500" use:melt={$item}>
			<Logout />
		</div>
		<!-- <div class="separator" use:melt={$separator}></div> -->

		<div use:melt={$arrow}></div>
	</div>
{/if}

<style lang="postcss">
	.menu {
		@apply z-40 flex max-h-[300px] flex-col gap-2 p-4 shadow-lg;
		@apply rounded-md dark:bg-[#0f0f0f] bg-white text-black shadow-neutral-900/30 lg:max-h-none;
		@apply ring-0 !important;
	}

	.item {
		@apply relative h-6 min-h-[24px] select-none rounded-sm text-lg;
		@apply z-40 outline-none;
		@apply data-[disabled]:text-neutral-300;
		@apply flex items-center leading-none;
		@apply ring-0 cursor-pointer;
	}

	.trigger {
		@apply data-[highlighted]:ring-blue-400 data-[highlighted]:ring-offset-2 !important;
		@apply data-[highlighted]:outline-none;
	}
	.check {
		@apply absolute left-2 top-1/2 text-blue-500;
		translate: 0 calc(-50% + 1px);
	}

	.dot {
		@apply h-[4.75px] w-[4.75px] rounded-full bg-blue-900;
	}

	.separator {
		@apply m-[5px] h-[1px] bg-blue-200;
	}

	.rightSlot {
		@apply ml-auto pl-5;
	}

	.icon {
		@apply h-[13px] w-[13px];
	}
	.check {
		@apply absolute left-0 inline-flex w-6 items-center justify-center;
	}
	.text {
		@apply pl-6 text-xs leading-6 text-neutral-600;
	}

	.iconX {
		display: flex;
		height: 3rem;
		width: 3rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
	}
</style>
