<script lang="ts">
	import {onMount} from 'svelte';
	import type {Readable} from 'svelte/store';
	import {createEditor, Editor, EditorContent} from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import cx from 'clsx';
	import Placeholder from '@tiptap/extension-placeholder';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import Color from '@tiptap/extension-color';

	let editor = $state() as Readable<Editor>;
	const {content = ''}: {content?: string} = $props();

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				TextStyle.configure({types: [ListItem.name]}),
				Color.configure({types: [TextStyle.name, ListItem.name]}),
				Placeholder.configure({placeholder: 'Write something...'})
			],
			content,
			editorProps: {
				attributes: {
					class: 'content-boxy border-2 border-black rounded-b-md p-3 outline-none focus:border'
				}
			},
			onTransaction: () => {
				// force re-render so `editor?.isActive` works as expected
				editor = editor;
			}
		});
	});

	const toggleHeading = (level: 1 | 2) => {
		return () => {
			$editor.chain().focus().toggleHeading({level}).run();
		};
	};

	const toggleBold = () => {
		$editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		$editor.chain().focus().toggleItalic().run();
	};

	const setParagraph = () => {
		$editor.chain().focus().setParagraph().run();
	};

	const setList = () => {
		$editor.chain().focus().toggleBulletList().run();
	};

	const setOList = () => {
		$editor.chain().focus().toggleOrderedList().run();
	};

	const isActive = (name: string, attrs = {}) => {
		return () => $editor.isActive(name, attrs);
	};

	const menuItems = $state([
		{
			name: 'heading-1',
			command: toggleHeading(1),
			content: 'H1',
			active: isActive('heading', {level: 1})
		},
		{
			name: 'heading-2',
			command: toggleHeading(2),
			content: 'H2',
			active: isActive('heading', {level: 2})
		},
		{
			name: 'bold',
			command: toggleBold,
			content: 'B',
			active: isActive('bold')
		},
		{
			name: 'italic',
			command: toggleItalic,
			content: 'I',
			active: isActive('italic')
		},
		{
			name: 'paragraph',
			command: setParagraph,
			content: 'P',
			active: isActive('paragraph')
		},
		{
			name: 'bulletList',
			command: setList,
			content: 'li',
			active: isActive('bulletList')
		},
		{
			name: 'orderedList',
			command: setOList,
			content: 'ol',
			active: isActive('orderedList')
		}
	]);
</script>

<div class="bg-background rounded-md">
	{#if editor}
		<div class="border-black border-2 border-b-0 rounded-t-md p-2 flex gap-1">
			{#each menuItems as item (item.name)}
				<button
					type="button"
					class={cx('hover:bg-black hover:text-white w-7 h-7 rounded', {
						'bg-black text-white': item.active()
					})}
					onclick={item.command}
				>
					{item.content}
				</button>
			{/each}
		</div>
	{/if}

	<EditorContent editor={$editor} />
</div>
