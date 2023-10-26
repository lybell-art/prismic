import { Map as MapI } from "immutable";
import createZustandStore from "./createZustandStore.js";
import DirectoryMetadata from "./directoryMetadata.js";

export const UNSORTED = Symbol("unsorted");

function findDirectory(target, self)
{
	return self._metadata.getDirectory(target);
}

function findFileFromDirectory(target, directory, self)
{
	if(directory === null) directory = findDirectory(target, self);
	if(directory === UNSORTED) return self.unsorted.get(target);
	return self.sorted.getIn([directory, target]);
}

const directoryStore = {
	unsorted: MapI(),
	sorted: MapI(),
	currentFile: null,
	_metadata: new DirectoryMetadata(),
	/**
	 * @mutate-metadata
	 * 스토어에 파일을 추가한다.
	 */
	addFiles(files=[])
	{
		let firstKey = null;
		const unsorted = this.unsorted.withMutations((map)=>{
			for(let file of files)
			{
				if(!file.type.startsWith("image")) continue;
				if(this._metadata.hasFile(file)) continue;
				const key = URL.createObjectURL(file);
				map.set(key, file);
				this._metadata.add(key, file, UNSORTED);
				if(firstKey === null) firstKey = key;
			}
		});
		return {unsorted, currentFile: this.currentFile ?? firstKey};
	},
	/**
	 * 처음으로 현재 파일을 지정시킨다.
	 */
	initCurrentFile()
	{
		if(this.currentFile !== null) return null;
		return {currentFile: (this.unsorted.keySeq().first() ?? null)};
	},
	/**
	 * 지정된 파일을 현재 파일로 지정한다. 만약 없으면 unsorted의 첫 파일이 현재 파일이 된다.
	 */
	setCurrentFile(file=null)
	{
		if(file !== null) return {currentFile: file};
		return {currentFile: (this.unsorted.keySeq().first() ?? null)};
	},
	/**
	 * @mutate-metadata
	 * 현재 파일의 폴더를 새 폴더로 옮긴다.
	 */
	classify(newDirectory, oldDirectory=null)
	{
		// 파일의 디렉토리를 찾음.
		const file = this.currentFile;
		if(file === null) throw new Error("current file is not defined!");
		if(oldDirectory === null) oldDirectory = findDirectory(this.currentFile, this);
		if(oldDirectory === null) throw new Error("unknown directory!");
		if(oldDirectory === newDirectory) return null;
		// 메타데이터 변경 및 실제 데이터 추출
		const data = findFileFromDirectory(file, oldDirectory, this);
		this._metadata.move(file, newDirectory);

		// 이전 값에서 현재 파일 제거
		let {unsorted, sorted} = this;
		if(oldDirectory === UNSORTED) unsorted = this.unsorted.delete(file);
		else sorted = sorted.update(oldDirectory, dir=>dir.delete(file));

		// 새 디렉토리에 현재 파일 추가
		sorted = sorted.update(newDirectory, (dir)=>{
			if(dir === undefined) dir = MapI();
			return dir.set(file, data);
		});

		return {unsorted, sorted};
	},
	/**
	 * @mutate-metadata
	 * 현재 파일을 완전히 제거한다.
	 */
	discard()
	{
		const url = this.currentFile;
		const directory = findDirectory(url, this);
		const data = findFileFromDirectory(url, directory, this);
		this._metadata.delete(data);
		URL.revokeObjectURL(url);

		if(directory === UNSORTED) return {unsorted: this.unsorted.delete(url)};
		return {sorted: this.sorted.update(directory, (dir)=>dir.delete(url))};
	},
	/**
	 * @mutate-metadata
	 * 스토어에 저장된 모든 파일을 완전히 제거한다.
	 */
	reset()
	{
		this._metadata.clear();
		for(let [url] of this.unsorted) {
			URL.revokeObjectURL(url);
		}
		for(let [, directory] of this.sorted)
		{
			for(let [url] of directory) {
				URL.revokeObjectURL(url);
			}
		}
		return {unsorted: MapI(), sorted: MapI()};
	}
}

export default createZustandStore(directoryStore);