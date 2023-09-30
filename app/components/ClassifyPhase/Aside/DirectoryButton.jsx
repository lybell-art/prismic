import style from "./style.module.scss";
import DirectoryIcon from "@/assets/directory.svg?react";

export default function DirectoryButton({onClick})
{
	return <div className={style.directoryButton} onClick={onClick}>
		<DirectoryIcon className={style.icon} />
		<p className={style.caption}>Directories</p>
	</div>
}