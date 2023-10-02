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

function debounce(func, delay)
{
	let lastCalledTime = null;
	let _args = [];
	return function(...args)
	{
		_args = args;
		if(lastCalledTime !== null && lastCalledTime + delay > Date.now()) return;
		if(lastCalledTime === null) lastCalledTime = Date.now();
		setTimeout(()=>{
			func(..._args);
			lastCalledTime = null;
		}, delay);
	}
}

function clamp(value, min, max)
{
	if(value < min) return min;
	if(value > max) return max;
	return value;
}

function wrapPromise(promise)
{
	let state = "pending";
	let result = null;
	promise.then( res=>{state = "complete"; result=res;} )
		.catch( err=>{state = "error"; result=err;} )
	return ()=>{
		switch(state) {
		case "complete": return result;
		case "error": throw result;
		default: throw promise;
		}
	}
}

export { getTextWidth, getUniqueName, debounce, clamp, wrapPromise };
