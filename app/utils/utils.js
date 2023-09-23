function getTextWidth(text, font) {
	let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	let context = canvas.getContext("2d");
	context.font = font;
	let metrics = context.measureText(text);
	return metrics.width;
}

export { getTextWidth };