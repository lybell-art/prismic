import ClassifyButton from "./ClassifyButton.jsx";
import DiscardButton from "./DiscardButton.jsx";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import style from "./style.module.scss";

function ClassifyController()
{
	const category = useCategoryStore( store=>store.category );

	return <div className={style.buttonContainer}>
		{category.map( ({key, name, hash})=><ClassifyButton 
			key={hash} 
			keyCommand={key} 
			hash={hash} 
			label={name}
		/> )}
		<DiscardButton />
	</div>;
}

export default ClassifyController;