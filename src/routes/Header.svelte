<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';

	const items = [
		{ url: '', label: 'Demo' },
		{ url: 'intro', label: 'Intro' },
		{ url: 'overview', label: 'Overview' },
		{ url: 'contribute', label: 'Contribute' }
	];
</script>

<header>
	<Menu {items} />
</header>

<style lang="less">
</style>
