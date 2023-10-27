import { useContext } from "react";
import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import PhaseContext from "@/store/phaseContext.js";
import CacheContext from "@/store/imageCache.js";
import {PHASE} from "@/utils/constants.js";
import style from "./style.module.scss";

function ResetButton()
{
	const resetDirectory = useDirectoryStore( store=>store.reset );
	const setPhase = useContext(PhaseContext);
	const imgCache = useContext(CacheContext);
	const onClick = ()=>{
		resetDirectory();
		setPhase(PHASE.UPLOAD);
		imgCache.reset();
	};
	return <div className={style.button} onClick={onClick}>Classify another pictures</div>
}

export default ResetButton;