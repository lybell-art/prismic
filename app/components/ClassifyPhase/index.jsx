import { useEffect } from "react";
import useCategoryStore from "@/store/categoryStore.js";
import useDirectoryStore from "@/store/directoryStore.js";
import {convertKey} from "@/businessLogic/categoryLogic.js";

function ClassifyButton({keyCommand, name})
{
	return <div>
		<div>{convertKey(keyCommand)}</div>
		<div>{name}</div>
	</div>
}

function ClassifyController()
{
	const currentFile = useDirectoryStore( store=>store.currentFile );
	const category = useCategoryStore( store=>store.category );

	return <main>
		<img src={currentFile} alt="Current File" />
		<div>
			{category.map( ({key, name, hash})=><ClassifyButton key={hash} keyCommand={key} name={name}/> )}
		</div>
	</main>;
}

function ClassifyPhase()
{
	const setCurrentFile = useDirectoryStore( store=>store.setCurrentFile );
	useEffect(()=>{
		setCurrentFile();
	}, []);

	return <ClassifyController />;
}

export default ClassifyPhase;