import { useEffect } from "react";
import ImageViewer from "./ImageViewer";
import ClassifyController from "./ClassifyController";
import useDirectoryStore from "@/store/directoryStore.js";
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
	useEffect(()=>{
		setCurrentFile();
	}, []);

	return <main><ClassifyContainer /></main>;
}

export default ClassifyPhase;