function getTextWidth(text, font) {
	let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	let context = canvas.getContext("2d");
	context.font = font;
	let metrics = context.measureText(text);
	return metrics.width;
}

function getUniqueName(name, pool, nameRule=(name, index)=>`${name}_(${index})`)
{
	if(!pool.includes(name)) return name;
	const poolSet = new Set(pool);
	let newName = nameRule(name, 1);
	for(let index = 2; poolSet.has(newName); index++)
	{
		newName = nameRule(name, index);
	}
	return newName;
}

export { getTextWidth, getUniqueName };
