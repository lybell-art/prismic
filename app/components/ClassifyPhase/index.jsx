import { useEffect } from "react";
import ClassifyButton from "./ClassifyButton.jsx";
import DiscardButton from "./DiscardButton.jsx";
import ImageViewer from "./ImageViewer.jsx";
import useCategoryStore from "@/store/categoryStore.js";
import useDirectoryStore from "@/store/directoryStore.js";
import style from "./style.module.scss";

function ClassifyController()
{
	const category = useCategoryStore( store=>store.category );

	return <div className={style.container}>
		<ImageViewer />
		<div className={style.buttonContainer}>
			{category.map( ({key, name, hash})=><ClassifyButton key={hash} keyCommand={key} name={name}/> )}
			<DiscardButton />
		</div>
	</div>;
}

function ClassifyPhase()
{
	const setCurrentFile = useDirectoryStore( store=>store.setCurrentFile );
	useEffect(()=>{
		setCurrentFile();
	}, []);

	return <main><ClassifyController /></main>;
}

export default ClassifyPhase;