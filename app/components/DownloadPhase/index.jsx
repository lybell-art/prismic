import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary.jsx";
import CenterContainer from "@/components/CenterContainer";
import ResetButton from "./ResetButton.jsx";
import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import {compress} from "@/businessLogic/downloadLogic.js";
import style from "./style.module.scss";
import DownloadImg from "@/assets/download.svg?react"; 
import LoadingImg from "@/assets/zip.svg?react"; 
import ErrorImg from "@/assets/error.svg?react"; 

function useCompress(sorted)
{
	const [progress, setProgress] = useState(0);
	const {read, watchProgress, unwatchProgress} = useMemo( ()=>compress(sorted), [sorted] );
	useEffect( ()=>{
		const _setProgress = (current, max)=>setProgress(current/max);
		watchProgress( _setProgress );
		return ()=>unwatchProgress( _setProgress );
	}, [sorted] );

	return [read, progress];
}

function ZipError()
{
	return <CenterContainer inactive={true}>
		<ErrorImg className="icon-svg" />
		<p className="caption-big">Compress Error</p>
	</CenterContainer>;
}

function Loading({progress})
{
	return <CenterContainer inactive={true}>
		<LoadingImg className="icon-svg" />
		<p className="caption-big">Compressing... : {(progress*100).toFixed(2)}%</p>
		<progress className={style.progress} max="1" value={progress}>70%</progress>
	</CenterContainer>;
}

function DownloadContainer({resource})
{
	const virtualLink = useRef( document.createElement('a') );
	const zip = resource();
	function download()
	{
		if(virtualLink.current === null) return;
		if(zip === undefined) return;
		const url = URL.createObjectURL(zip);
		virtualLink.current.href = url;
		virtualLink.current.download = "result.zip";
		virtualLink.current.click();
		URL.revokeObjectURL(url);
		console.log(url);
	}

	return <CenterContainer onClick={download}>
		<DownloadImg className="icon-svg" />
		<p className="caption-big">Download Result</p>
	</CenterContainer>
}

function DownloadPhase()
{
	const sorted = useDirectoryStore( store=>store.result() );
	const [read, progress] = useCompress(sorted);

	return <main>
		<ErrorBoundary fallback={<ZipError />}>
			<Suspense fallback={<Loading progress={progress} />}>
				<DownloadContainer resource={read} />
			</Suspense>
		</ErrorBoundary>
		<div className={style.buttonContainer}>
			<ResetButton />	
			<a href="../" className={style.button}>Return To Title</a>
		</div>
	</main>;
}

export default DownloadPhase;