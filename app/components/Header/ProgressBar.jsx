import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import style from "./style.module.scss";

function ProgressBar()
{
	const donePhoto = useDirectoryStore( store=>store.doneAmount() );
	const totalPhoto = useDirectoryStore( store=>store.totalAmount() );
	return <div className={style.progressBar}>
		<div className={style.bar} style={{"--progress":donePhoto/totalPhoto}}></div>
		<p className={style.caption}>{donePhoto}/{totalPhoto}</p>
	</div>
}

export default ProgressBar;