import { useState, useEffect, useMemo } from "react";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import {validateKey, convertKey} from "@/businessLogic/categoryLogic.js";
import {getTextWidth} from "@/utils/utils.js";
import style from "./style.module.scss";

const IDLE = Symbol("idle");
const PEND_INPUT = Symbol("pend_input");
const INVALID = Symbol("invalid");
const CONTAINER_WIDTH = 50;

function CategoryKeySetter({index})
{
	const keyCode = useCategoryStore( store=>store.category[index].key );
	const changeHotkey = useCategoryStore( store=>store.changeCategoryHotkey );
	const [keyState, setKeyState] = useState(IDLE);
	const [keyBuffer, setKeyBuffer] = useState(convertKey(keyCode));
	const textScale = useMemo(()=>{
		if(keyBuffer.length < 3) return 1;
		const textWidth = getTextWidth(keyBuffer, "24px 'Prismic Main Font'");
		if(CONTAINER_WIDTH > textWidth) return 1;
		return CONTAINER_WIDTH / textWidth;
	}, [keyBuffer.length < 3 ? "" : keyBuffer]);

	let statusStyle = "";
	if(keyState === PEND_INPUT) statusStyle = style.pendInput;
	else if(keyState === INVALID) statusStyle = style.invalidKey;

	useEffect(()=>{
		if(keyState !== PEND_INPUT) return;
		function onKeyDown(e)
		{
			e.preventDefault();
			const key = e.key;
			setKeyBuffer(convertKey(key));
			if(keyCode === key || validateKey(key)) {
				setKeyState(IDLE);
				changeHotkey(index, key);
			}
			else {
				setKeyState(INVALID);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return ()=>document.removeEventListener("keydown", onKeyDown);
	}, [keyState === PEND_INPUT]);

	useEffect(()=>{
		if(keyState !== INVALID) return;
		const timeout = setTimeout( ()=>setKeyState(PEND_INPUT), 1000 );
		return ()=>clearTimeout(timeout);
	}, [keyState === INVALID]);

	return <div 
		className={`${style.key} ${statusStyle}`} 
		style={{"--text-scale":textScale}}
		onClick={e=>setKeyState(PEND_INPUT)} 
		onTouchEnd={e=>e.preventDefault()}
	>
		{keyState === PEND_INPUT ? "" : keyBuffer}
	</div>;
}

export default CategoryKeySetter;