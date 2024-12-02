<script lang="ts">
	import {logout} from '$lib/firebase/user';
	import {cn} from '$lib/utils';
	import {LogOutIcon} from 'lucide-svelte';

	const {className} = $props();
</script>

<form method="POST" action="/api/auth?/logout" onsubmit={logout}>
	<button type="submit" class={cn('w-fit font-semibold flex gap-2', className)}>
		Logout <LogOutIcon />
	</button>
</form>
