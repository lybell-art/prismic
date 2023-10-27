import { Map as MapI } from "immutable";
import createZustandStore from "./createZustandStore.js";
import DirectoryMetadata from "./directoryMetadata.js";
import { getUniqueName, makeUUID } from "@/utils/utils.js";
import {MAX_TRAINABLE_ITEMS} from "@/utils/constants.js";

export const UNSORTED = Symbol("unsorted");
export const TRASH = Symbol("trash");

function createNewCategory(category)
{
	const nextNumber = category.length + 1;
	const nameSet = new Set(category.map(({name})=>name));
	const keySet = new Set(category.map(({key})=>key));
	const newName = getUniqueName("Category "+nextNumber, category.map( ({name})=>name ));
	const newKey = getUniqueName(""+nextNumber, category.map( ({key})=>key ), (_,i)=>""+i);
	return {
		name: newName, 
		key: newKey,
		hash: makeUUID()
	};
}

function findDirectory(target, self)
{
	return self._metadata.getDirectory(target);
}

function findFileFromDirectory(target, directory, self)
{
	if(directory === null) directory = findDirectory(target, self);
	return self.data.getIn([directory, target]);
}

const categoryDirectoryStore = {
	// properties
	category: [],
	data: MapI(),
	currentFile: null,
	_metadata: new DirectoryMetadata(),

	// getters(computed value)
	get unsorted() {
		return this.data.get(UNSORTED) ?? MapI();
	},
	get sorted() {
		return this.data.filter( (_, key)=>typeof key !== "symbol" );
	},
	get trash() {
		return this.data.get(TRASH) ?? MapI();
	},
	get result() {
		return this.category
			.filter(({hash})=>this.data.has(hash))
			.map( ({hash, name})=>[name, this.data.get(hash)] );
	},
	get doneAmount() {
		return this._metadata.size - this.trash().size - this.unsorted().size + 1;
	},
	get totalAmount() {
		return this._metadata.size - this.trash().size;
	},
	get isDone() {
		return this.unsorted().size === 0;
	},
	get trainableMaxAmount() {
		return this.category.length * MAX_TRAINABLE_ITEMS;
	},
	get trainableAmount() {
		return this.sorted().reduce( (sum, dir)=>sum+Math.min(dir.size, MAX_TRAINABLE_ITEMS), 0 );
	},

	// methods(category)
	addCategory() {
		return {category: [...this.category, createNewCategory(this.category)]};
	},
	/**
	 * @mutate-metadata
	 * 카테고리를 제거한다. 만약 카테고리 내에 파일이 있으면 unsorted로 전환된다.
	 */
	removeCategory(index) {
		const toRemoveCategoryHash = this.category[index].hash;
		const category = this.category.filter( (_, i)=>i !== index );

		// if there is no files, just return
		if(!this.data.has(toRemoveCategoryHash)) return {category};

		// move items to unsorted
		const toMoveFiles = this.data.get(toRemoveCategoryHash);
		let data = this.data.delete(toRemoveCategoryHash);
		data = data.update( UNSORTED, unsorted=>unsorted.merge(toMoveFiles) );

		// metadata change
		toMoveFiles.forEach( (_, url)=>this._metadata.move(url, UNSORTED) );
		
		return {category, data};
	},
	changeCategoryLabel(index, newName) {
		const category = [...this.category];
		category[index].name = newName;
		return {category};
	},
	changeCategoryHotkey(index, newKey) {
		const category = [...this.category];
		category[index].key = newKey;
		return {category};
	},

	// method(files)
	/**
	 * @mutate-metadata
	 * 스토어에 파일을 추가한다.
	 */
	addFiles(files=[]) {
		let firstKey = null;
		const unsorted = this.unsorted().withMutations((map)=>{
			for(let file of files)
			{
				if(!file.type.startsWith("image")) continue;
				if(this._metadata.hasFile(file)) continue;
				const url = URL.createObjectURL(file);
				map.set(url, file);
				this._metadata.add(url, file, UNSORTED);
				if(firstKey === null) firstKey = url;
			}
		});

		return {
			currentFile: this.currentFile ?? firstKey, 
			data: this.data.set(UNSORTED, unsorted)
		};
	},
	/**
	 * 지정된 파일을 현재 파일로 지정한다. 만약 없으면 unsorted의 첫 파일이 현재 파일이 된다.
	 */
	setCurrentFile(file=null)
	{
		if(file !== null) return {currentFile: file};
		return {currentFile: (this.unsorted().keySeq().first() ?? null)};
	},
	/**
	 * @mutate-metadata
	 * 현재 파일의 폴더를 새 폴더로 옮긴다.
	 */
	classify(newDirectory, oldDirectory=null)
	{
		// 파일의 디렉토리를 찾음.
		if(this.currentFile === null) throw new Error("current file is not defined!");
		if(oldDirectory === null) oldDirectory = findDirectory(this.currentFile, this);
		if(oldDirectory === null) throw new Error("unknown directory!");
		if(oldDirectory === newDirectory) return null;

		// 데이터 이동
		const file = this.currentFile;
		const fileBlob = this.data.getIn([oldDirectory, file]);
		const newData = this.data
			.update(oldDirectory, dir=>dir.delete(file))
			.update(newDirectory, dir=>{
				if(dir === undefined) dir = MapI();
				return dir.set(file, fileBlob);
			});

		// 메타데이터 이동
		this._metadata.move(file, newDirectory);

		return {data: newData};
	},
	/**
	 * @mutate-metadata
	 * 현재 파일의 폴더를 trash 폴더로 옮긴다.
	 */
	discard() {
		this.classify(TRASH);
		return null;
	},
	/**
	 * @mutate-metadata
	 * 스토어에 저장된 모든 파일을 완전히 제거한다.
	 */
	reset() {
		this._metadata.clear();
		for(let [, directory] of this.data)
		{
			for(let [url] of directory) {
				URL.revokeObjectURL(url);
			}
		}

		return {
			category: [],
			data: MapI(), 
		};
	}
}

export default createZustandStore(categoryDirectoryStore);