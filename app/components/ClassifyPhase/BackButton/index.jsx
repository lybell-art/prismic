import { useContext } from "react";
import PhaseContext from "@/store/phaseContext.js";
import {PHASE} from "@/utils/constants.js";
import style from "./style.module.scss";

function PrevSvg()
{
	return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
		<path d="M27 10 L 13 20 L 27 30" fill="transparent" stroke="#333333" strokeWidth="4" strokeLinecap="square" strokeLinejoin="bevel" />
	</svg>;
}

function BackButton()
{
	const setPhase = useContext(PhaseContext);
	return <div className={style.backButton} onClick={()=>setPhase(PHASE.CATEGORY)}>
		<PrevSvg />
	</div>;
}

export default BackButton;