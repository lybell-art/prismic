import { useRef } from "react";
import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import style from "./style.module.scss";
import AddIcon from "@/assets/add.svg?react";

function AddButton()
{
	const addFiles = useDirectoryStore(store => store.addFiles);

	const fileRef = useRef(null);
	return <>
		<div className={style.addButton} onClick={()=>fileRef.current?.click()}>
			<AddIcon className={style.addIcon} />
			<p>Add Photo</p>
		</div>
		<input type="file" accept="image/*" onChange={(e)=>addFiles(e.target.files)} ref={fileRef} multiple hidden />
	</>
}

export default AddButton;