import { useReducer, useEffect, useRef } from "react";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import CategoryKeySetter from "./CategoryKeySetter.jsx";
import CategoryNameSetter from "./CategoryNameSetter.jsx";
import style from "./style.module.scss";

function handleFocusIndex(state, action)
{
	switch(action.type)
	{
	case "FOCUS": return {...state, index: action.index};
	case "BLUR": return {...state, index:-1};
	case "FORWARD": return {...state, index: (action.index + 1)%state.range};
	case "BACKWARD": return {...state, index: (action.index - 1 + state.range)%state.range};
	case "SET_RANGE": return {...state, range:action.range};
	}
	throw new Error("invalid dispatcher");
}

function CategoryItem({index, isFocus, handleFocus})
{
	const remove = useCategoryStore( store=>store.removeCategory );
	
	return <div className={style.item}>
		<CategoryKeySetter index={index} />
		<CategoryNameSetter index={index} isFocus={isFocus} handleFocus={handleFocus}/>
		<div className={style.deleteButton} onClick={()=>remove(index)}>
			<img src="/remove.svg" alt="remove" />
		</div>
	</div>;
}

function CategoryItems()
{
	const category = useCategoryStore( store=>store.category );
	const [focusIdx, dispatch] = useReducer(handleFocusIndex, {index:-1, range:category.length});

	useEffect( ()=>{
		dispatch({type:"SET_RANGE", range:category.length});
	}, [category.length]);

	return category.map(
		({hash},index)=>{
			return <CategoryItem 
				index={index}
				key={hash}
				isFocus={focusIdx.index === index}
				handleFocus={dispatch}
			/>;
		}
	);
}

export default CategoryItems;