import ProgressBar from "./ProgressBar.jsx";
import { PHASE, HEADERS } from "@/utils/constants.js";
import style from "./style.module.scss";

function getStyle(n, phase)
{
	let additionalClass;
	if(n === phase) additionalClass = `${style.active} grad-border`;
	else additionalClass = style.inactive;
	return `${style.bullet} ${additionalClass}`;
}

function Header({phase})
{
	return <header>
		<div className={style.nav}>
			{[1,2,3,4].map((n)=><div key={`nav-${n}`} className={getStyle(n, phase)}/>)}
		</div>
		<div className={style.title} style={{"--phase":phase}}>
			<p>{HEADERS[phase-1]}</p>
			{phase === PHASE.CLASSIFY && <ProgressBar />}
		</div>
	</header>
}

export default Header;