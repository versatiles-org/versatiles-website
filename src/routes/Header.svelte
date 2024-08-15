<script>
</script>

<header>
	<nav>
		<ul>
			<li style="line-height: 1.3em;">
				<a
					href="https://github.com/versatiles-org/"
					style="line-height: inherit; font-size: inherit;margin: 0; padding: 0;"
				>
					<img
						src="%sveltekit.assets%/assets/github.png"
						style="display: inline-block; height:1.3em; vertical-align: middle;"
					/>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		font-size: 1em;
		border-style: solid;
		border-width: 0 0 1px;
		border-image: linear-gradient(60deg, #6b0075, #9d35ff 40%, #93a813 65%, #005034) 0.5;
	}

	nav ul {
		text-align: right;
		list-style: none;
		justify-content: space-between;
		display: flex;
		justify-content: end;
		column-gap: 1em;
		margin: 0.2em;
	}

	nav li {
		color: #fff;
		opacity: 0.6;
		transition: opacity 0.1s;
	}

	nav li.selected,
	nav li:hover {
		opacity: 1;
	}

	nav li a {
		text-decoration: none;
	}
</style>
