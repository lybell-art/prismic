import NextButton from "@/components/NextButton";
import CategoryKeySetter from "./CategoryKeySetter.jsx";
import CategoryNameSetter from "./CategoryNameSetter.jsx";
import useCategoryStore from "@/store/categoryStore.js";
import {MAX_CATEGORY_NUM} from "@/utils/constants.js";
import style from "./style.module.scss";
import AddIcon from "@/assets/add.svg?react";

function CategoryItem({index})
{
	const remove = useCategoryStore( store=>store.remove );
	
	return <div className={style.item}>
		<CategoryKeySetter index={index} />
		<CategoryNameSetter index={index} />
		<div className={style.deleteButton} onClick={()=>remove(index)}>
			<img src="/remove.svg" alt="remove" />
		</div>
	</div>;
}

function CategoryPhase()
{
	const category = useCategoryStore( store=>store.category );
	const add = useCategoryStore( store=>store.add );
	function addClass()
	{
		if(category.length >= MAX_CATEGORY_NUM) return;
		add();
	}

	return <>
		<main>
			<div className={style.container}>
				{category.map(({hash},index)=><CategoryItem index={index} key={hash}/>)}
				{category.length < MAX_CATEGORY_NUM && 
					<div className={`grad-border ${style.addButton}`} onClick={addClass}>
						<AddIcon className={style.addIcon} />
						<p>Add Class</p>
					</div>
				}
			</div>
		</main>
		<NextButton inactive={category.length === 0}/>
	</>;
}

export default CategoryPhase;