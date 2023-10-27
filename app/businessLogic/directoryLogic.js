import {UNSORTED, TRASH} from "@/store/categoryDirectoryStore.js";

export function getCategoryString(key)
{
	if(key === UNSORTED) return "@@unsorted@@";
	if(key === TRASH) return "@@trash@@";
	return key;
}

export function convertStringToNormalLabel(name)
{
	if(name === "@@unsorted@@") return "Unclassified";
	if(name === "@@trash@@") return "Trash";
	return name;
}