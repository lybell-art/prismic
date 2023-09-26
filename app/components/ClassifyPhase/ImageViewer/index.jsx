import { useCallback } from "react";
import useDirectoryStore from "@/store/directoryStore.js";
import useIntersectionObserver from "@/hooks/useIntersectionObserver.js";
import useAnimationControl from "@/hooks/useAnimationControl.js";
import style from "./style.module.scss";

const html = document.documentElement;

function getNewScale(isForward, imgWidth, imgHeight)
{
	const domWidth = html.clientWidth;
	const originScale = Math.min(1, domWidth/imgWidth, style.domOriginHeight/imgHeight );
	const shrinkedScale = Math.min(1, domWidth/imgWidth, style.domShrinkedHeight/imgHeight);
	return isForward ? shrinkedScale/originScale : originScale/shrinkedScale;
}

function ImageViewer()
{
	const currentFile = useDirectoryStore( store=>store.currentFile );
	const [imgRef, animStyle, activateAnim] = useAnimationControl({
		forward: style.animForward,
		backward: style.animBackward,
		active: style.shrink,
	});
	const observeeRef = useIntersectionObserver( visible=>{
		if(imgRef.current === null) return;
		const imgDom = imgRef.current;
		const newScale = getNewScale(!visible, imgDom.naturalWidth, imgDom.naturalHeight);
		imgDom.style.setProperty("--domWidth", html.clientWidth+"px");
		imgDom.style.setProperty("--newScale", newScale);
		activateAnim(!visible);
	} );

	let imgStyleClass = `${style.previewImage} ${animStyle}`;

	return <>
		<div className={style.observer} ref={observeeRef} />
		<img 
			className={imgStyleClass} ref={imgRef}
			src={currentFile} alt="Current Image Preview"
		/>
	</>;
}

export default ImageViewer;