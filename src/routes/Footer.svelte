<script>
	import { page } from '$app/stores';
	const gitUrl =
		`https://github.com/versatiles-org/apps/blob/main/src/routes/${$page.route.id}/%2Bpage.svelte`.replace(
			/\/{2,}/g,
			'/'
		);
</script>

<footer>
	<div></div>
	<div>
		<a href={gitUrl}>Improve this page on GitHub</a>
	</div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
	}
</style>
