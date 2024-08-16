<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';

	const items = [
		{ url: '', label: 'Intro' },
		{ url: 'tools', label: 'Tools' },
		{ url: 'docs', label: 'Documentation' },
		{ url: 'contact', label: 'Contact' }
	];
</script>

<header>
	<Menu {items} />
</header>

<style lang="less">
</style>
