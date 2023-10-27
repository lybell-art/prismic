import { create } from "zustand";

function mutateMethod(method, set)
{
	return (...args) => set( (state)=>method.call(state, ...args) );
}

function createZustandStore(obj)
{
	// 프로퍼티, 게터, 세터 분리
	const keys = Object.keys(obj);
	const properties = [];
	const getters = new Map();
	const methods = [];
	for(let key of keys)
	{
		const {value, get} = Object.getOwnPropertyDescriptor(obj, key);
		if(get !== undefined) getters.set(key, get);
		else if(typeof value === "function") methods.push(key);
		else properties.push(key);
	}

	// zustand store에 맞는 오브젝트 생성
	return create( (set, get)=>{
		const newObj = {};
		for(let key of properties) newObj[key] = obj[key];
		for(let [key, getter] of getters) newObj[key] = ()=>getter.call(get());
		for(let key of methods) newObj[key] = mutateMethod(obj[key], set);
		return newObj;
	} );
}

export default createZustandStore;