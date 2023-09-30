import useCategoryStore from "@/store/categoryStore.js";
import useDirectoryStore from "@/store/directoryStore.js";
import {getTrainableAmount} from "@/businessLogic/directoryLogic.js";
import {getTrainableMaxAmount} from "@/businessLogic/categoryLogic.js";
import style from "./style.module.scss";
import AIIcon from "@/assets/robot.svg?react";

export default function AIButton({onClick})
{
	const progress = useDirectoryStore(getTrainableAmount);
	const max = useCategoryStore(getTrainableMaxAmount);
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