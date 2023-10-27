import useDirectoryStore from "@/store/categoryDirectoryStore.js";
import style from "./style.module.scss";
import AIIcon from "@/assets/robot.svg?react";

export default function AIButton({onClick})
{
	const progress = useDirectoryStore( store=>store.trainableAmount() );
	const max = useDirectoryStore( store=>store.trainableMaxAmount() );
	const percent = max === 0 ? 0 : progress/max;

	return <div 
		className={`${style.aiButton} ${percent < 1 ? style.onProgress : ""}`} 
		style={{"--progressPercent": percent*360+"deg"}} 
		onClick={onClick}
	>
		<AIIcon className={style.icon} />
		<div className={style.caption}>
			<p className={style.large}>Use AI Classify</p>
			<p className={style.small}>{progress}/{max}</p>
		</div>
	</div>
}