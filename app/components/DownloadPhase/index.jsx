import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary.jsx";
import CenterContainer from "@/components/CenterContainer";
import useDirectoryStore from "@/store/directoryStore.js";
import {compress} from "@/businessLogic/downloadLogic.js";
import style from "./style.module.scss";
import DownloadImg from "@/assets/download.svg?react"; 

function useCompress(sorted)
{
	const [progress, setProgress] = useState(0);
	const {read, watchProgress, abort} = useMemo( ()=>compress(sorted) , [sorted] );
	useEffect( ()=>{
		watchProgress( (current, max)=>setProgress(current/max) );
		return ()=>abort();
	}, [sorted] );

	return [read, progress];
}

function LoadingDownload({progress})
{
	return <CenterContainer>
		<p className="caption-big">Compress : {progress}</p>
	</CenterContainer>
}

function DownloadContainer({resource})
{
	const virtualLink = useRef( document.createElement('a') );
	const zip = resource();
	function download()
	{
		if(virtualLink.current === null) return;
		const url = URL.createObjectURL(zip);
		virtualLink.current.href = url;
		virtualLink.current.download = "result.zip";
		virtualLink.current.click();
		URL.revokeObjectURL(url);
	}

	return <CenterContainer onClick={download}>
		<DownloadImg className="icon-svg" />
		<p className="caption-big">Download Result</p>
	</CenterContainer>
}

function DownloadPhase()
{
	const sorted = useDirectoryStore( store=>store.sorted );
	const [read, progress] = useCompress(sorted);

	return <main>
		<ErrorBoundary fallback={<div>ERROR!</div>}>
			<Suspense fallback={<LoadingDownload progress={progress} />}>
				<DownloadContainer resource={read} />
			</Suspense>
		</ErrorBoundary>
		<div className={style.buttonContainer}>
			<div className={style.button}>Classify another pictures</div>
			<a href="../" className={style.button}>Return To Title</a>
		</div>
	</main>;
}

export default DownloadPhase;