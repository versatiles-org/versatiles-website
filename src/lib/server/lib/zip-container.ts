import { fromBuffer } from 'yauzl';
import type { Entry, ZipFile } from 'yauzl';

export async function readZippedFiles(url: string, prefix: string): Promise<Files> {
	const files = new Files();

	try {
		const buffer = await fetchBuffer(url);
		const zip = await openZip(buffer);
		await extractFiles(zip);
	} catch (error) {
		console.error('Error loading ZIP:', error);
		throw error;
	}

	return files;

	async function fetchBuffer(url: string): Promise<Buffer> {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.statusText}`);
		}
		const arrayBuffer = await response.arrayBuffer();
		return Buffer.from(arrayBuffer);
	}

	function openZip(buffer: Buffer): Promise<ZipFile> {
		return new Promise((resolve, reject) => {
			fromBuffer(buffer, { lazyEntries: true }, (err, zip) => {
				if (err) return reject(err);
				resolve(zip);
			});
		});
	}

	function extractFiles(zip: ZipFile): Promise<void> {
		return new Promise((resolve) => {
			zip.on('entry', (entry) => processEntry(entry, zip));
			zip.once('end', () => {
				zip.close();
				resolve();
			});
			zip.readEntry();
		});
	}

	function processEntry(entry: Entry, zip: ZipFile) {
		if (!entry.fileName.startsWith(prefix)) return zip.readEntry();
		if (/\/$/.test(entry.fileName)) return zip.readEntry();

		zip.openReadStream(entry, async (err, stream) => {
			if (err) throw err;
			await collectFileData(entry.fileName.slice(prefix.length), stream);
			zip.readEntry();
		});
	}

	function collectFileData(fileName: string, stream: NodeJS.ReadableStream): Promise<void> {
		return new Promise<void>((r) => {
			const buffers: Buffer[] = [];
			stream
				.on('data', (buffer) => buffers.push(buffer))
				.on('end', () => {
					files.add(fileName, Buffer.concat(buffers));
					r();
				});
		});
	}
}

export class Files {
	private map = new Map<string, Buffer>();

	add(name: string, buffer: Buffer) {
		this.map.set(name, buffer);
	}

	get(name: string): Buffer | undefined {
		return this.map.get(name);
	}

	getAllFiles(): string[] {
		return Array.from(this.map.keys());
	}
}
