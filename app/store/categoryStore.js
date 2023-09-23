import createZustandStore from "./createZustandStore.js";
import { getUniqueName } from "@/utils/utils.js";

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
		hash: Math.floor(Math.random()*(1<<31))
	};
}

const categoryStore = {
	category: [],
	add()
	{
		return {category: [...this.category, createNewCategory(this.category)]};
	},
	remove(index)
	{
		const newCategory = this.category.filter( (_, i)=>i !== index );
		return {category: newCategory};
	},
	changeLabel(index, newName)
	{
		const newCategory = [...this.category];
		const {key, hash} = newCategory[index];
		newCategory[index] = {name:newName, key, hash};
		return {category: newCategory};
	},
	changeHotkey(index, newKey)
	{
		const newCategory = [...this.category];
		const {name, hash} = newCategory[index];
		newCategory[index] = {name, key:newKey, hash};
		return {category: newCategory};
	}
}

export default createZustandStore(categoryStore);