<!-- +page.svelte -->
<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import FormOptionGroup from '$lib/components/FormOptionGroup.svelte';
	import { BBoxMap } from '@versatiles/svelte';

	type Option = { title: string; small?: boolean };
	type OSOption = Option & {
		key: 'linux' | 'mac' | 'windows';
		methodOptions: MethodOption[];
	};
	type MethodOption = Option & {
		key: 'cargo' | 'homebrew' | 'script_unix' | 'script_windows' | 'source_code';
	};
	type FrontendOption = Option & { key: 'yes' | 'no' };
	type DataOption = Option & { key: 'world' | 'bbox' };

	let selectedOS: OSOption | undefined = undefined;
	let selectedMethod: MethodOption | undefined = undefined;
	let selectedFrontend: FrontendOption | undefined = undefined;
	let selectedData: DataOption | undefined = undefined;
	let selectedBBox: [number, number, number, number] | undefined = undefined;
	let code = '';

	const osOptions: OSOption[] = [
		{
			key: 'linux',
			title: 'Linux',
			methodOptions: [
				{ key: 'script_unix', title: 'Use Install Script' },
				{ key: 'cargo', title: 'Compile with Rust', small: true },
				{ key: 'source_code', title: 'Build from Source', small: true }
			]
		},
		{
			key: 'mac',
			title: 'MacOS',
			methodOptions: [
				{ key: 'homebrew', title: 'Homebrew' },
				{ key: 'script_unix', title: 'Use Install Script' },
				{ key: 'cargo', title: 'Compile with Rust', small: true },
				{ key: 'source_code', title: 'Build from Source', small: true }
			]
		},
		{
			key: 'windows',
			title: 'Windows',
			methodOptions: [
				{ key: 'script_windows', title: 'Use Install Script' },
				{ key: 'cargo', title: 'Compile with Rust', small: true },
				{ key: 'source_code', title: 'Build from Source', small: true }
			]
		}
	];

	const frontendOptions: FrontendOption[] = [
		{ key: 'yes', title: 'Yes, please!' },
		{ key: 'no', title: 'Nope' }
	];

	const dataOptions: DataOption[] = [
		{ key: 'world', title: 'World' },
		{ key: 'bbox', title: 'Just a part of it' }
	];

	$: {
		if (selectedOS || selectedMethod || selectedFrontend || selectedData || selectedBBox) {
			updateCode();
		}
	}

	function updateCode() {
		const isNotPowershell = selectedOS?.key != 'windows';
		const lines = [];

		switch (selectedMethod?.key) {
			case 'cargo':
				lines.push(
					'# install rust, also see: https://www.rust-lang.org/tools/install',
					isNotPowershell
						? 'curl --proto "=https" --tlsv1.2 -sSf "https://sh.rustup.rs" | sh'
						: 'Invoke-WebRequest https://win.rustup.rs/ -OutFile rustup-init.exe\n.\\rustup-init.exe',
					'# compile and install versatiles',
					'cargo install versatiles'
				);
				break;
			case 'homebrew':
				lines.push(
					'# install versatiles',
					'brew tap versatiles-org/versatiles',
					'brew install versatiles'
				);
				break;
			case 'script_unix':
				lines.push(
					'# install versatiles',
					'curl -Ls "https://github.com/versatiles-org/versatiles-rs/raw/main/helpers/install-unix.sh" | bash'
				);
				break;
			case 'script_windows':
				lines.push(
					'# install versatiles',
					'Invoke-WebRequest -Uri "https://github.com/versatiles-org/versatiles-rs/raw/main/helpers/install-windows.ps1" -OutFile "$env:TEMP\\install-windows.ps1"\n. "$env:TEMP\\install-windows.ps1"'
				);
				break;
			case 'source_code':
				lines.push(
					'# clone the repository',
					`git clone https://github.com/versatiles-org/versatiles-rs.git`,
					'# navigate to the project directory',
					'cd versatiles-rs',
					'# build the project',
					'cargo build --release',
					'# install the binary',
					isNotPowershell
						? 'sudo cp target/release/versatiles /usr/local/bin/'
						: 'Copy-Item "target\\release\\versatiles.exe" "C:\\Program Files\\versatiles\\"'
				);
				break;
		}

		if (selectedFrontend?.key == 'yes') {
			lines.push(
				'\n# download frontend',
				isNotPowershell
					? 'wget -Ls "https://github.com/versatiles-org/versatiles-frontend/releases/latest/download/frontend.br.tar"'
					: 'Invoke-WebRequest -Uri "https://github.com/versatiles-org/versatiles-frontend/releases/latest/download/frontend.br.tar" -OutFile "frontend.br.tar"'
			);
		}

		if (selectedData?.key == 'world') {
			lines.push(
				'\n# download map data',
				isNotPowershell
					? `wget -c -O osm.versatiles "https://download.versatiles.org/osm.versatiles"`
					: 'Invoke-WebRequest -Uri "https://download.versatiles.org/osm.versatiles" -OutFile "osm.versatiles"'
			);
		} else if (selectedBBox && selectedData?.key == 'bbox') {
			lines.push(
				'\n# download an extract of the map data',
				[
					`versatiles${isNotPowershell ? '' : '.exe'} convert`,
					'--bbox-border 3',
					`--bbox "${selectedBBox.join(',')}"`,
					'"https://download.versatiles.org/osm.versatiles"',
					'"osm.versatiles"'
				].join(' ')
			);
		}

		if (selectedData) {
			let start = isNotPowershell ? 'versatiles' : 'versatiles.exe';
			start += ' server -p 80';
			if (selectedFrontend?.key === 'yes') start += ' -s "frontend.br.tar"';
			start += ` "osm.versatiles"`;
			lines.push('\n# start server at port 80', start);
		}

		code = lines.join('\n');
	}
</script>

<svelte:head>
	<title>Install VersaTiles</title>
	<meta name="description" content="How to install VersaTiles?" />
</svelte:head>

<section class="form">
	<h1>How to install VersaTiles?</h1>

	<h2>1. Select your Operating System</h2>
	<div class="options">
		<FormOptionGroup options={osOptions} bind:selectedOption={selectedOS} />
	</div>

	{#if selectedOS}
		<h2>2. Choose Installation Method</h2>
		<div class="options">
			<FormOptionGroup options={selectedOS?.methodOptions} bind:selectedOption={selectedMethod} />
		</div>
	{/if}

	{#if selectedOS && selectedMethod}
		<h2>3. Add a Frontend?</h2>
		<p class="small">The frontend includes MapLibre-GL-JS, styles, fonts, sprites, tools etc.</p>
		<div class="options">
			<FormOptionGroup options={frontendOptions} bind:selectedOption={selectedFrontend} />
		</div>
	{/if}

	{#if selectedOS && selectedMethod && selectedFrontend}
		<h2>4. Select Map Data</h2>
		<div class="options">
			<FormOptionGroup options={dataOptions} bind:selectedOption={selectedData} />
		</div>

		{#if selectedData?.key == 'bbox'}
			<div
				style="width:80vmin;height:60vmin;max-width:600px;max-height:450px;margin:0.5em auto;color-scheme:dark;"
			>
				<BBoxMap bind:selectedBBox />
			</div>
		{/if}
	{/if}
</section>

<section>
	{#if selectedOS && selectedMethod}
		<h2>Paste these Instructions to your Shell</h2>
		<CodeBlock {code} />
	{/if}
</section>

<style>
	hr {
		margin: 5em auto 2em;
		border: none;
		height: 1px;
		background: #888;
		width: 100vw;
	}
	.form h2 {
		margin-bottom: 0;
	}
	p.small {
		margin-top: 0.2em;
		font-size: 0.7em;
		text-align: center;
		opacity: 0.8;
	}
	div.options {
		margin-top: 1em;
	}
</style>
