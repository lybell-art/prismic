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

const dummyData = [
	// {name: "Original Outfit", key:"1", hash:2500001},
	// {name: "Second Outfit", key:"2", hash:2500002},
	// {name: "Third Outfit", key:"3", hash:2500003},
	{name: "Fourth Outfit", key:"q", hash:2500004},
	{name: "Fifth Outfit", key:"w", hash:2500005},
	{name: "Sixth Outfit", key:"e", hash:2500006},
	{name: "Seventh Outfit", key:"a", hash:2500007},
	{name: "Eighth Outfit", key:"s", hash:2500008},
	{name: "Others", key:"d", hash:2500009}
];

const categoryStore = {
	category: dummyData,
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
	},
	reset()
	{
		return {category: []};
	}
}

export default createZustandStore(categoryStore);