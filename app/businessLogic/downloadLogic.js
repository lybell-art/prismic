import { ZipWriter, BlobWriter, BlobReader }from "zip-js";
import { getExtension } from "mime";
import { wrapPromise } from "@/utils/utils.js";

function mapFilesToDir(directories)
{
	let map = new Map();
	let i = 1;
	for(let [directory, files] of directories)
	{
		for(let [key, file] of files)
		{
			let fileName = file.name ?? `file${i++}.${getExtension(file.type)}`;
			let dir = `${directory}/${fileName}`;
			map.set(dir, file);
		}
	}
	return map;
}

const ABORT_ERROR = new Error("user aborted");

class Compressor
{
	constructor(option={})
	{
		this.#setNewWriter();
		this.option = {...option};
		this.onProgress = new Set();
	}
	#setNewWriter()
	{
		this.aborter = new AbortController();
		const signal = this.aborter.signal;
		this.writer = new ZipWriter(new BlobWriter("application/zip"), {signal});
	}
	run(files)
	{
		if(this.writer === null) this.#setNewWriter();
		let progress = 0;
		let maxProgress = files.size;
		const addFile = async ([dir, file], i)=>{
			const option = {
				...this.option,
				onend: (current, max)=>{
					progress++;
					this.onProgress.forEach( func=>func(progress, maxProgress) );
					this.option.onend ?? this.option.onend(current, max);
				}
			};
			await this.writer.add(dir, new BlobReader(file), option);
		}

		return Promise.all( [...files].map( addFile ) );
	}
	async extract()
	{
		const blob = await this.writer.close();
		this.writer = null;
		return blob;
	}
	addEventListener(func)
	{
		this.onProgress.add(func);
	}
	removeEventListener(func)
	{
		this.onProgress.delete(func);
	}
	abort()
	{
		if(this.writer === null) return;
		this.aborter.abort(ABORT_ERROR);
		this.writer = null;
	}
}

function compress(sorted)
{
	let cache = null;
	return (()=>{
		if(cache) return cache;

		const compressor = new Compressor();
		const promise = compressor.run(mapFilesToDir(sorted))
			.then(()=>compressor.extract())
			.catch(err=>{
				if(err !== ABORT_ERROR) throw err;
			});

		cache = {
			read: wrapPromise(promise),
			watchProgress(callback) {
				compressor.addEventListener(callback);
			},
			unwatchProgress(callback) {
				compressor.removeEventListener(callback);
			},
			abort() {
				compressor.abort();
			}
		}
		setTimeout(()=>cache = null, 50);

		return cache;
	})();
}



export {mapFilesToDir, Compressor, compress};