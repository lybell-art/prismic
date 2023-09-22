import NextButton from "@/components/NextButton";
import useCategoryStore from "@/store/categoryStore.js";
import {MAX_CATEGORY_NUM} from "@/utils/constants.js";
import style from "./style.module.scss";

function CategoryKeySetter({index})
{
	const keyCode = useCategoryStore( store=>store.category[index].key );
	return <div className={style.key}>{keyCode}</div>;
}

function CategoryNameSetter({index})
{
	const name = useCategoryStore( store=>store.category[index].name );
	const changeLabel = useCategoryStore( store=>store.changeLabel );

	function onChange(e)
	{
		changeLabel(index, e.target.value);
	}

	return <input type="text" value={name} className={style.name} onChange={onChange}/>;
}

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
				{category.length < MAX_CATEGORY_NUM && <div className={style.addButton} onClick={addClass}>Add Class</div>}
			</div>
		</main>
		<NextButton inactive={category.length === 0}/>
	</>;
}

export default CategoryPhase;