<script lang="ts">
	import {loginWithEmailAndPassword, loginWithGoogle} from '$lib/firebase/user';
	import {Loader2} from 'lucide-svelte';
	import type {PageData} from './$types';

	let email = $state<string>('');
	let password = $state<string>('');
	let loading = $state<boolean>(false);
	let isDirty = $state<boolean>(false);

	const {data}: {data: PageData} = $props();
	let message = $state<string>(data.message ?? '');

	$effect(() => {
		message = data.message ?? '';
	});
</script>

<div class="flex justify-center items-center min-h-svh">
	<div class="bg-[#fffffe] dark:bg-black shadow-lg rounded-lg p-8 w-full max-w-md">
		<h2 class="text-4xl font-semibold text-center">Login</h2>
		<p class="text-subtext text-center mt-2">Welcome back! Please log in to your account.</p>
		{#if message}
			<p class="text-red-500 text-sm mt-2 text-center">{message}</p>
		{/if}
		<form
			oninput={() => {
				isDirty = true;
				if (message) message = '';
			}}
			class="mt-4"
			method="POST"
			onsubmit={async (e) => {
				loading = true;
				await loginWithEmailAndPassword(e);
				loading = false;
				isDirty = false;
			}}
			action="/api/auth?/loginAuth"
		>
			<!-- Email/Password Login -->
			<label for="email" class="block mb-1 text-subtext font-medium">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				bind:value={email}
				placeholder="Enter your email"
				required
				disabled={loading}
				class="appearance-none block w-full bg-gray-200 dark:bg-[#0f0f0f] text-subtext border focus:border-none focus:outline-primary focus:ring-0 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
			/>

			<label for="password" class="block mt-4 mb-1 text-gray-600 font-medium">Password</label>
			<input
				name="password"
				id="password"
				type="password"
				bind:value={password}
				placeholder="Enter your password"
				required
				disabled={loading}
				class="appearance-none block w-full bg-gray-200 dark:bg-[#0f0f0f] text-subtext border focus:border-none focus:outline-primary focus:ring-0 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
			/>

			<button
				disabled={loading || !isDirty}
				type="submit"
				class="w-full bg-primary text-primary-foreground py-3 mt-4 rounded-lg hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed flex gap-2 items-center justify-center"
			>
				<span>Log In</span>
				{#if loading}
					<Loader2 size="1.5rem" class="text-primary-foreground animate-spin" />
				{/if}
			</button>
		</form>

		<div class="mt-6 text-center text-gray-500">or</div>

		<form
			class="flex justify-center mt-4 space-x-4"
			action="/api/auth?/loginAuth"
			onsubmit={async (e) => {
				loading = true;
				await loginWithGoogle(e);
				loading = false;
			}}
		>
			<button
				type="submit"
				class="flex gap-2 items-center disabled:opacity-80 disabled:cursor-not-allowed bg-white/5 p-2.5 rounded-md px-6"
				disabled={loading}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 326667 333333"
					shape-rendering="geometricPrecision"
					text-rendering="geometricPrecision"
					image-rendering="optimizeQuality"
					fill-rule="evenodd"
					clip-rule="evenodd"
					width={24}
					height={24}
					><path
						d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
						fill="#4285f4"
					/><path
						d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
						fill="#34a853"
					/><path
						d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
						fill="#fbbc04"
					/><path
						d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
						fill="#ea4335"
					/></svg
				>

				Google
				{#if loading}
					<Loader2 size="1.5rem" class="text-primary animate-spin" />
				{/if}
			</button>
		</form>
	</div>
</div>
