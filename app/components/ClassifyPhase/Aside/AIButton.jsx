import useDirectoryStore from "@/store/directoryStore.js";
import {getTrainableAmount, getTrainableMaxAmount} from "@/businessLogic/directoryLogic.js";
import style from "./style.module.scss";
import AIIcon from "@/assets/robot.svg?react";

export default function AIButton({onClick})
{
	const progress = useDirectoryStore(getTrainableAmount);
	const max = useDirectoryStore(getTrainableMaxAmount);

	return <div className={style.aiButton} onClick={onClick}>
		<AIIcon className={style.icon} />
		<div className={style.caption}>
			<p className={style.large}>Use AI Classify</p>
			<p className={style.small}>{progress}/{max}</p>
		</div>
	</div>
}