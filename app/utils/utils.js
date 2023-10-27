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

function randInt(range)
{
	return Math.floor(Math.random()*range);
}

function makeUUID()
{
	const rawStr = Array.from({length:32}, ()=>randInt(16).toString(16) ).join('');
	const checksum = (randInt(4)+8).toString(16);

	return `${rawStr.slice(0,8)}-${rawStr.slice(8,12)}-4${rawStr.slice(13,16)}-${checksum}${rawStr.slice(17,20)}-${rawStr.slice(20)}`;
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

export { getTextWidth, getUniqueName, debounce, clamp, wrapPromise, makeUUID };
