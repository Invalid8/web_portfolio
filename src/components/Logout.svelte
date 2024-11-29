<script lang="ts">
	import {logout} from '$lib/firebase/user';
	import {LogOutIcon} from 'lucide-svelte';
</script>

<form method="POST" action="/api/auth?/logout" onsubmit={logout}>
	<button type="submit" class="w-fit font-semibold flex gap-2 px-3 py-2"
		>Logout <LogOutIcon /></button
	>
</form>
