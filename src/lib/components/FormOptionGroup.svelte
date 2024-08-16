<script lang="ts">
	type Option = { key: string; title: string; small?: boolean };

	export let options: Option[] = [];
	export let selectedOption: Option | undefined = undefined;

	let bigOptions: Option[] = [];
	let smallOptions: Option[] = [];

	$: {
		// Filter big and small options
		bigOptions = options.filter((o) => !o.small);
		smallOptions = options.filter((o) => o.small);

		// Reset selectedOption if it's not in the options list
		if (!options.find((option) => option.key === selectedOption?.key)) {
			selectedOption = undefined;
		}
	}

	function handleChange(option: Option) {
		selectedOption = option;
	}
</script>

<div>
	{#each bigOptions as option}
		<button
			class:selected={selectedOption?.key === option.key}
			aria-pressed={selectedOption?.key === option.key}
			on:click={() => handleChange(option)}
		>
			{option.title}
		</button>
	{/each}
</div>

{#if smallOptions.length > 0}
	<div class="small">
		{#each smallOptions as option}
			<button
				class:selected={selectedOption?.key === option.key}
				aria-pressed={selectedOption?.key === option.key}
				on:click={() => handleChange(option)}
			>
				{option.title}
			</button>
		{/each}
	</div>
{/if}

<style>
	:root {
		--button-padding: 0.5em 1em;
		--button-border-radius: 0.5em;
		--button-border-color: rgba(255, 255, 255, 0.2);
		--button-bg-color: transparent;
		--button-color: #fff;
		--button-font-size: 1em;
		--button-hover-bg-color: rgba(255, 255, 255, 0.2);
		--button-hover-border-color: rgba(255, 255, 255, 0.8);
		--button-selected-bg-color: rgba(255, 255, 255, 1);
		--button-selected-color: #000;
	}

	div {
		display: flex;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	div.small {
		margin-top: 1em;
		font-size: 0.7em;
	}

	button {
		cursor: pointer;
		padding: var(--button-padding);
		border: 1px solid var(--button-border-color);
		border-radius: var(--button-border-radius);
		background-color: var(--button-bg-color);
		color: var(--button-color);
		user-select: none;
		font-size: var(--button-font-size);
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}

	button.selected {
		background-color: var(--button-selected-bg-color) !important;
		color: var(--button-selected-color);
	}

	button:hover {
		background-color: var(--button-hover-bg-color);
		border-color: var(--button-hover-border-color);
	}
</style>
