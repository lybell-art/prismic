import useCategory from "@/store/categoryStore.js";

function validateCategory(newName, category = useCategory.getState().category)
{
	return !(category.some(({name})=>name === newName));
}

function validateKey(newKey, category = useCategory.getState().category)
{
	if(newKey === "Backspace" || newKey === "Escape") return false;
	return !(category.some(({key})=>key === newKey));
}

function convertKey(key)
{
	switch(key)
	{
		case ' ': return 'Space';
		case 'Control': return 'Ctrl';
		case 'Delete': return 'Del';
		case 'CapsLock': return 'Caps';
		case 'Backspace': return 'Bksp';
		case 'Escape': return 'Esc';
		case 'HangulMode': return '한/영';
		case 'HanjaMode': return '한자';
		case 'ArrowUp': return '↑';
		case 'ArrowDown': return '↓';
		case 'ArrowLeft': return '←';
		case 'ArrowRight': return '→';
	}
	if(key.length === 1) return key.toUpperCase();
	return key;
}

export {validateKey, validateCategory, convertKey};