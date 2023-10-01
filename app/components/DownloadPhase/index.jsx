import { useEffect, useRef } from "react";
import CenterContainer from "@/components/CenterContainer";
import useDirectoryStore from "@/store/directoryStore.js";
import {mapFilesToDir, compress} from "@/businessLogic/downloadLogic.js";
import style from "./style.module.scss";
import DownloadImg from "@/assets/download.svg?react"; 

function DownloadPhase()
{
	const virtualLink = useRef( document.createElement('a') );
	const sorted = useDirectoryStore( store=>store.sorted );

	useEffect( ()=>{
		let res = mapFilesToDir(sorted);
		console.log(res);
	}, [] );

	useEffect( ()=>{
		let url = null;
		compress().then( (zip)=>{
			url = URL.createObjectURL(zip);
			virtualLink.current.href = url;
			virtualLink.current.download = "result.zip";
		} );
		return ()=>URL.revokeObjectURL(url);
	}, [] );

	return <main>
		<CenterContainer onClick={()=>virtualLink.current?.click()}>
			<DownloadImg className="icon-svg" />
			<p className="caption-big">Download Result</p>
		</CenterContainer>
		<div className={style.buttonContainer}>
			<div className={style.button}>Classify another pictures</div>
			<a href="../" className={style.button}>Return To Title</a>
		</div>
	</main>;
}

export default DownloadPhase;