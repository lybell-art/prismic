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

export {getDoneAmount, getTotalAmount, isDone};