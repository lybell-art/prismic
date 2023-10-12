import { useEffect, useContext } from "react";
import ImageViewer from "./ImageViewer";
import ClassifyController from "./ClassifyController";
import Aside from "./Aside";
import useDirectoryStore from "@/store/directoryStore.js";
import PhaseContext from "@/store/phaseContext.js";
import CacheContext, {ImageCache} from "@/store/imageCache.js";
import {isDone as isDoneChecker} from "@/businessLogic/directoryLogic.js";
import {PHASE} from "@/utils/constants.js";
import style from "./style.module.scss";

function ClassifyContainer()
{
	return <div className={style.container}>
		<ImageViewer />
		<ClassifyController />
	</div>;
}

function ClassifyPhase()
{
	const setCurrentFile = useDirectoryStore( store=>store.setCurrentFile );
	const isDone = useDirectoryStore( isDoneChecker );
	const setPhase = useContext(PhaseContext);
	useEffect(()=>{
		setCurrentFile();
	}, []);
	useEffect(()=>{
		if(isDone) setPhase(PHASE.DOWNLOAD);
	}, [isDone]);

	return <>
		<main><ClassifyContainer /></main>
		<CacheContext.Provider value={new ImageCache()}><Aside /></CacheContext.Provider>
	</>;
}

export default ClassifyPhase;