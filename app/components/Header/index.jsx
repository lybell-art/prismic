import style from "./Header.module.scss";
import { PHASE, HEADERS } from "@/utils/constants.js";

function getStyle(n, phase)
{
	let additionalClass;
	if(n === phase) additionalClass = `${style.active} grad-border`;
	else additionalClass = style.inactive;
	return `${style.bullet} ${additionalClass}`;
}

function ProgressBar()
{
	/* Todo : link to actual store */
	let donePhoto = 250;
	let totalPhoto = 1750;
	return <div className={style.progressBar}>
		<div className={style.bar} style={{"--progress":donePhoto/totalPhoto}}></div>
		<p className={style.caption}>{donePhoto}/{totalPhoto}</p>
	</div>
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