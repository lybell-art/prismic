import { useState, useMemo, useEffect } from "react";
import List from "@/components/VirtualGroupList";
import useDirectoryStore, {UNSORTED} from "@/store/directoryStore.js";
import useCategoryStore from "@/store/categoryStore.js";
import {debounce} from "@/utils/utils.js";
import style from "./style.module.scss";

function GroupHeader({name, count, isOpened})
{
	return <div className={style.header}>
		<h3 className={count === 0 ? style.inactive : null}>
			{name === "@@unsorted@@" ? "Unclassified" : name} 
			<span className={style.count}>{count}</span>
		</h3>
		{count !== 0 && <div className={`${style.foldIcon} ${isOpened ? style.opened : ""}`}></div>}
	</div>
}

function GroupItem({content, style:innerStyle})
{
	const setCurrentFile = useDirectoryStore(store=>store.setCurrentFile);
	return <img src={content} className={style.item} style={innerStyle} 
		onClick={()=>setCurrentFile(content)}/>;
}

function useDirectoryData()
{
	const directoryData = useDirectoryStore( (store)=>store.sorted.set(UNSORTED, store.unsorted) );
	const categoryArr = useCategoryStore( store=>store.category );
	const data = useMemo( ()=>{
		function makeData(name)
		{
			let content = directoryData.get(name) ?? null;
			if(content !== null) content = [...content.keys()];
			return {
				name: name === UNSORTED ? "@@unsorted@@" : name,
				count: content === null ? 0 : content.length,
				content
			};
		}
		const realData = categoryArr.map( ({name})=>makeData(name) );
		realData.push(makeData(UNSORTED));
		return realData;
	}, [directoryData, categoryArr] );

	return data;
}

function useWidthResponsiveEffect()
{
	const MOBILE_WIDTH = 768;
	const [column, setColumn] = useState(window.innerWidth >= MOBILE_WIDTH ? 5 : 3);
	useEffect( ()=>{
		const onResize = debounce( (e)=>{
			if(window.innerWidth >= MOBILE_WIDTH) setColumn(5);
			else setColumn(3);
		} );
		window.addEventListener( "resize", onResize );
		return ()=>window.removeEventListener( "resize", onResize );
	}, [] );
	return column;
}

function DirectoryList()
{
	const data = useDirectoryData();
	const column = useWidthResponsiveEffect();

	return <List 
		data={data}
		column={column}
		headerSize={60}
		itemSize={70}
		itemGap={10}
		categoryGap={20}
		className={style.list}
		template={GroupItem}
		headerTemplate={GroupHeader}
	/>;
}

export default DirectoryList;