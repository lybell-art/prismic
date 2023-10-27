import { useState, useEffect, useRef } from "react";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import {getUniqueName} from "@/utils/utils.js";
import style from "./style.module.scss";

function CategoryNameSetter({index, isFocus, handleFocus})
{
	const [name, setName] = useState( useCategoryStore.getState().category[index].name );
	const changeLabel = useCategoryStore( store=>store.changeCategoryLabel );
	const ref = useRef(null);

	function onKeyDown(e)
	{
		if(e.key === "ArrowDown") {
			e.preventDefault();
			handleFocus({type:"FORWARD", index});
		}
		else if(e.key === "ArrowUp") {
			e.preventDefault();
			handleFocus({type:"BACKWARD", index});
		}
	}
	function onChange(e)
	{
		setName(e.target.value);
	}
	function onBlur(e)
	{
		const rawNames = useCategoryStore.getState().category.map(({name})=>name);
		const names = rawNames.filter((_,i)=>i !== index);
		const uniqueName = getUniqueName(e.target.value, names);
		
		setName(uniqueName);
		changeLabel(index, uniqueName);
		if(document.activeElement?.dataset?.group !== "category-name-setter") {
			handleFocus({type:"BLUR"});
		}
	}

	useEffect( ()=>{
		if(isFocus) ref.current?.focus();
	}, [isFocus] );

	return <input type="text" value={name} className={style.name} 
		onKeyDown={onKeyDown} onChange={onChange} onBlur={onBlur}
		ref={ref}
		data-group="category-name-setter"
	/>;
}

export default CategoryNameSetter;