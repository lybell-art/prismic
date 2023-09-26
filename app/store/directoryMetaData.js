class DirectoryMetadata
{
	constructor()
	{
		this.urlToDirectory = new Map();
		this.fileToUrl = new Map();
	}
	get size()
	{
		return this.urlToDirectory.size;
	}
	add(url, directory, file)
	{
		this.urlToDirectory.set(url, directory);
		this.fileToUrl.set(file, url);
	}
	move(url, newDirectory)
	{
		this.urlToDirectory.set(url, newDirectory);
	}
	delete(file)
	{
		const url = this.fileToUrl.get(file);
		this.fileToUrl.delete(file);
		this.urlToDirectory.delete(url);
	}
	hasUrl(url)
	{
		return this.urlToDirectory.has(url);
	}
	hasFile(file)
	{
		return this.fileToUrl.has(file);
	}
	getDirectory(url)
	{
		return this.urlToDirectory.get(url) ?? null;
	}
	clear()
	{
		this.urlToDirectory.clear();
		this.fileToUrl.clear();
	}
}

export default DirectoryMetadata;