import { useEffect, useContext } from "react";
import ImageViewer from "./ImageViewer";
import ClassifyController from "./ClassifyController";
import Aside from "./Aside";
import BackButton from "./BackButton";
import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import PhaseContext from "@/store/phaseContext.js";
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
	const isDone = useDirectoryStore( store=>store.isDone() );
	const setPhase = useContext(PhaseContext);
	useEffect(()=>{
		if(isDone) {
			setPhase(PHASE.DOWNLOAD);
		}
	}, [isDone]);

	return <>
		<main><ClassifyContainer /></main>
		<Aside />
		<BackButton />
	</>;
}

export default ClassifyPhase;