import {useEffect, useCallback} from "react";
import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import removeIcon from "@/assets/remove.svg";
import style from "./style.module.scss";

function DiscardButton()
{
	const _discard = useDirectoryStore(store=>store.discard);
	const setCurrentFile = useDirectoryStore(store=>store.setCurrentFile);
	const discard = useCallback(()=>{
		_discard();
		setCurrentFile();
	}, [_discard, setCurrentFile]);

	return <div className={`${style.button} ${style.discardButton}`} onClick={discard}>
		<img src={removeIcon} alt="remove" />
		<p>Discard</p>
	</div>;
}

export default DiscardButton;