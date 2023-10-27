import { useState } from "react";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import {getUniqueName} from "@/utils/utils.js";
import style from "./style.module.scss";

function CategoryNameSetter({index})
{
	const [name, setName] = useState( useCategoryStore.getState().category[index].name );
	const changeLabel = useCategoryStore( store=>store.changeCategoryLabel );

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
	}

	return <input type="text" value={name} className={style.name} onChange={onChange} onBlur={onBlur}/>;
}

export default CategoryNameSetter;