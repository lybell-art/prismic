import {MAX_TRAINABLE_ITEMS} from "@/utils/constants.js";

function getDoneAmount(store)
{
	return store._metadata.size - store.unsorted.size + 1;
}

function getTotalAmount(store)
{
	return store._metadata.size;
}

function isDone(store)
{
	return store.unsorted.size === 0;
}

function getTrainableAmount(store)
{
	return store.sorted.reduce( (sum, dir)=>sum+Math.max(dir.size, MAX_TRAINABLE_ITEMS), 0 );
}

function getTrainableMaxAmount(store)
{
	return store.sorted.size * MAX_TRAINABLE_ITEMS;
}

export {getDoneAmount, getTotalAmount, isDone, getTrainableAmount, getTrainableMaxAmount};