import useDirectoryStore from "@/store/directoryStore.js";
import style from "./style.module.scss";

function ImageViewer()
{
	const currentFile = useDirectoryStore( store=>store.currentFile );
	function onLoad(e)
	{
		const target = e.target;
		target.style.setProperty("--imgWidth", target.naturalWidth);
		target.style.setProperty("--imgHeight", target.naturalHeight);
	}
	return <img 
		className={style.previewImage}
		src={currentFile} alt="Current Image Preview"
		onLoad={onLoad}
	/>;
}

export default ImageViewer;