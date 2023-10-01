import * as zip from "zip-js";
import { getExtension } from "mime";

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

/**
 * @param data IMap([directory]:IMap([url string]:Blob)) 
 */
async function compress(files)
{
	const blobWriter = new zip.BlobWriter("application/zip");
	const writer = new zip.ZipWriter(blobWriter);

	// use a TextReader to read the String to add
	await writer.add("dir/filename.txt", new zip.TextReader("test!"));

	// close the ZipReader
	await writer.close();

	// get the zip file as a Blob
	const blob = await blobWriter.getData();

	return blob;
}

export {mapFilesToDir, compress};