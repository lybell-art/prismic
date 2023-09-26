import useDirectoryStore from "@/store/directoryStore.js";
import {getDoneAmount, getTotalAmount} from "@/businessLogic/directoryLogic.js";
import style from "./style.module.scss";

function ProgressBar()
{
	const donePhoto = useDirectoryStore(getDoneAmount);
	const totalPhoto = useDirectoryStore(getTotalAmount);
	return <div className={style.progressBar}>
		<div className={style.bar} style={{"--progress":donePhoto/totalPhoto}}></div>
		<p className={style.caption}>{donePhoto}/{totalPhoto}</p>
	</div>
}

export default ProgressBar;