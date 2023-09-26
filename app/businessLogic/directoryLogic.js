function getDoneAmount(store)
{
	return store._metadata.size - store.unsorted.size;
}

function getTotalAmount(store)
{
	return store._metadata.size;
}

export {getDoneAmount, getTotalAmount};