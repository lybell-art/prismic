import { useContext, Suspense } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary.jsx";
import useDirectoryStore from "@/store/directoryStore.js";
import CacheContext from "@/store/imageCache.js";
import {PREVIEW_PIC_SIZE} from "@/utils/constants.js";
import style from "./Thumbnail.module.scss";
import ErrorImg from "@/assets/error.svg?react";

function ThumbImg({content, resource, style:innerStyle})
{
	const setCurrentFile = useDirectoryStore(store=>store.setCurrentFile);
	return <img src={resource()} className={`${style.item} ${style.image}`} style={innerStyle} 
		onClick={()=>setCurrentFile(content)}/>;
}

function Loading({style:innerStyle})
{
	return <div className={`${style.item} ${style.loading}`} style={innerStyle}>
		<span className={style.spinner} />
	</div>;
}

function LoadError({style:innerStyle})
{
	return <div className={`${style.item} ${style.error}`} style={innerStyle}>
		<ErrorImg className="icon-svg" />
	</div>;
}

function Thumbnail({content, style:innerStyle})
{
	const imgCache = useContext(CacheContext);
	const resource = imgCache.getImage(content, PREVIEW_PIC_SIZE, PREVIEW_PIC_SIZE);

	return <ErrorBoundary fallback={<LoadError style={innerStyle} />}>
		<Suspense fallback={<Loading style={innerStyle} />}>
			<ThumbImg content={content} resource={resource} style={innerStyle} />
		</Suspense>
	</ErrorBoundary>;
}

export default Thumbnail;