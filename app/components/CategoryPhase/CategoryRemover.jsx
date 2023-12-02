import {useCallback} from "react";
import useConfirmModal from "@/components/Modal/ConfirmModal.jsx";
import useCategoryStore from "@/store/categoryDirectoryStore.js";
import removeIcon from "@/assets/remove.svg";
import style from "./style.module.scss";

function CategoryRemover({index})
{
	const _remove = useCategoryStore( store=>store.removeCategory );
	const hasImageInCategory = useCategoryStore( store=>store.hasImageInCategory()(index) );
	const remove = useCallback( ()=>_remove(index), [_remove, index] );

	const [setOpened, ConfirmModal] = useConfirmModal(remove);

	function onClick()
	{
		if(hasImageInCategory) setOpened();
		else remove();
	}

	return <>
		<div className={style.deleteButton} onClick={onClick}>
			<img src={removeIcon} alt="remove" />
		</div>
		<ConfirmModal promptMessage="There is already images in the category. Are you sure to delete?" confirmMessage="Discard"/>
	</>
}

export default CategoryRemover;