import { useState, useMemo, useEffect } from "react";
import Thumbnail from "./Thumbnail.jsx";
import List from "@/components/VirtualGroupList";
import useDirectoryStore, {UNSORTED, TRASH} from "@/store/categoryDirectoryStore.js";
import {getCategoryString} from "@/businessLogic/directoryLogic.js";
import {debounce} from "@/utils/utils.js";
import {PREVIEW_PIC_SIZE} from "@/utils/constants.js";
import style from "./style.module.scss";

function GroupHeader({name, count, isOpened})
{
	return <div className={style.header}>
		<h3 className={count === 0 ? style.inactive : null}>
			{name} 
			<span className={style.count}>{count}</span>
		</h3>
		{count !== 0 && <div className={`${style.foldIcon} ${isOpened ? style.opened : ""}`}></div>}
	</div>
}

function useDirectoryData()
{
	const directoryData = useDirectoryStore( (store)=>store.data );
	const categoryArr = useDirectoryStore( store=>store.category );
	const data = useMemo( ()=>{
		function makeData(key, name)
		{
			let content = directoryData.get(key) ?? null;
			if(content !== null) content = [...content.keys()];
			return {
				id: getCategoryString(key),
				name,
				count: content === null ? 0 : content.length,
				content
			};
		}
		const realData = categoryArr.map( ({hash, name})=>makeData(hash, name) );
		realData.push(makeData(UNSORTED, "Unclassified"));
		realData.push(makeData(TRASH, "Trash"));
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

function DirectoryList({visible = true}={})
{
	const data = useDirectoryData();
	const column = useWidthResponsiveEffect();

	return <List 
		data={data}
		column={column}
		headerSize={60}
		itemSize={PREVIEW_PIC_SIZE}
		itemGap={10}
		categoryGap={20}
		className={style.list}
		template={Thumbnail}
		headerTemplate={GroupHeader}
		visible={visible}
	/>;
}

export default DirectoryList;