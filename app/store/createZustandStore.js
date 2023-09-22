import { create } from "zustand";

function mutateMethod(method, set)
{
	return (...args) => set( (state)=>method.call(state, ...args) );
}

function createZustandStore(obj)
{
	const methods = Object.keys(obj).filter( (key)=>typeof obj[key] === "function" );

	return create( (set)=>{
		const newObj = {...obj};
		for(let key of methods)
		{
			newObj[key] = mutateMethod(obj[key], set);
		}
		return newObj;
	} );
}

export default createZustandStore;