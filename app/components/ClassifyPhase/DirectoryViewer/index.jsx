import DirectoryList from "./DirectoryList";
import style from "./style.module.scss";
import AddIcon from "@/assets/add.svg?react";

function DirectoryViewer({isOpened, close})
{
	return <div className={`${style.outerContainer} ${isOpened ? "" : style.hidden}`}>
		<div className="backdrop" onClick={close} />
		<div className={style.viewerContainer}>
			{isOpened && <DirectoryList />}
			<div className={style.addButton}>
				<AddIcon className={style.addIcon} />
				<p>Add Photo</p>
			</div>
		</div>
	</div>;
}

export default DirectoryViewer;