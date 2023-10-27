import CategoryItems from "./CategoryItems.jsx";
import NextButton from "@/components/NextButton";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import {MAX_CATEGORY_NUM} from "@/utils/constants.js";
import style from "./style.module.scss";
import AddIcon from "@/assets/add.svg?react";

function CategoryAddButton()
{
	const canAdd = useCategoryStore( store=>store.category.length < MAX_CATEGORY_NUM );
	const addCategory = useCategoryStore( store=>store.addCategory );

	function addClass()
	{
		if(!canAdd) return;
		addCategory();
	}

	return <div className={`grad-border ${style.addButton}`} onClick={addClass}>
		<AddIcon className={style.addIcon} />
		<p>Add Class</p>
	</div>
}

function CategoryPhase()
{
	const length = useCategoryStore( store=>store.category.length );

	return <>
		<main>
			<div className={style.container}>
				<CategoryItems />
				{length < MAX_CATEGORY_NUM && <CategoryAddButton />}
			</div>
		</main>
		<NextButton inactive={length === 0}/>
	</>;
}

export default CategoryPhase;