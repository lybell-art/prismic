import useCategory from "@/store/categoryStore.js";

function validateCategory(newName, category = useCategory.getState().category)
{
	return !(category.some(({name})=>name === newName));
}

function validateKey(newKey, category = useCategory.getState().category)
{
	return !(category.some(({key})=>key === newKey));
}

export {validateKey, validateCategory};