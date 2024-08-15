<!-- src/lib/components/Menu.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	interface MenuItem {
		label: string;
		url: string;
	}

	export let items: MenuItem[] = [];
	const currentUrl = $page.route.id;
</script>

<nav>
	<ul>
		{#each items as { label, url }}
			<li class:selected={url == currentUrl}>
				<a href="/{url}">{label}</a>
			</li>
		{/each}
		<li style="line-height: 1.3em;">
			<a
				href="https://github.com/versatiles-org/"
				style="line-height: inherit; font-size: inherit;margin: 0; padding: 0;"
			>
				<img
					src="/assets/github.png"
					alt="GitHub logo"
					style="display: inline-block; height:1.3em; vertical-align: middle;"
				/>
			</a>
		</li>
	</ul>
</nav>

<style lang="less">
	nav {
		font-size: 1em;
		border-style: solid;
		border-width: 0 0 1px;
		border-image: linear-gradient(60deg, #6b0075, #9d35ff 40%, #93a813 65%, #005034) 0.5;

		ul {
			text-align: right;
			list-style: none;
			justify-content: space-between;
			display: flex;
			justify-content: end;
			column-gap: 1em;
			margin: 0.2em;
		}

		li {
			color: #fff;
			opacity: 0.6;
			transition: opacity 0.1s;

			&.selected,
			&:hover {
				opacity: 1;
			}

			a {
				text-decoration: none;
			}
		}
	}
</style>
