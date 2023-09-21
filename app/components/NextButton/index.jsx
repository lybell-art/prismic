import { useContext } from "react";
import PhaseContext from "@/store/phaseContext.js";
import style from "./NextButton.module.scss";

function NextSvg()
{
	return <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
		<path d="M13 10 L 27 20 L 13 30" fill="transparent" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="bevel" />
	</svg>;
}

function NextButton({inactive=false}={})
{
	const setPhase = useContext(PhaseContext);
	const className = `${style.nextButton} ${inactive ? style.inactive : ""}`;
	return <div className={className} onClick={()=>setPhase(phase=>phase%4+1)}>
		<div className={style.background}></div>
		<NextSvg/>
		<p className={style.caption}>Next</p>
	</div>;
}

export default NextButton;