import {useEffect, useCallback} from "react";
import useDirectoryStore from "@/store/directoryStore.js";
import {convertKey} from "@/businessLogic/categoryLogic.js";
import keyListener from "@/store/keyListener.js";
import style from "./style.module.scss";

function ClassifyButton({keyCommand, name})
{
	const classify = useDirectoryStore(store=>store.classify);
	const setCurrentFile = useDirectoryStore(store=>store.setCurrentFile);

	const select = useCallback(()=>{
		classify(name);
		setCurrentFile();
	}, [classify, setCurrentFile]);
	useEffect( ()=>{
		function onKey({key})
		{
			if(key.length === 1) key = key.toLowerCase();
			if(keyCommand !== key) return;
			select();
		}
		keyListener.addEventListener("keyup", onKey);
		return ()=>keyListener.removeEventListener("keyup", onKey);
	}, [keyCommand, select] );
	return <div className={`${style.button} ${style.classifyButton}`} onClick={select}>
		<div className={style.key}>{convertKey(keyCommand)}</div>
		<div className={style.label}>{name}</div>
	</div>
}

export default ClassifyButton;