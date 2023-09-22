import createZustandStore from "./createZustandStore.js";

const categoryStore = {
	category: [],
	add()
	{
		const nextNumber = this.category.length + 1;
		const newCategory = [...this.category];
		newCategory.push({
			name: "Category "+nextNumber, 
			key:String.fromCharCode(48 + nextNumber),
			hash: Math.floor(Math.random()*(1<<31))
		});
		return {category: newCategory};
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