import {convertKey} from "@/businessLogic/categoryLogic.js";
import style from "./style.module.scss";

function ClassifyButton({keyCommand, name})
{
	return <div className={`${style.button} ${style.classifyButton}`}>
		<div className={style.key}>{convertKey(keyCommand)}</div>
		<div className={style.label}>{name}</div>
	</div>
}

export default ClassifyButton;