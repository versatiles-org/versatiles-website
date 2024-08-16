<script>
	import { page } from '$app/stores';
	const prefix = 'https://github.com/versatiles-org/apps/blob/main/src/routes/';
	let gitUrl = '';
	$: {
		gitUrl = `${prefix}${$page.route.id}`.replace(/\/{2,}/g, '/');
		console.log($page);
		console.log($page.route);
	}
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
