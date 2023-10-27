import DirectoryList from "./DirectoryList";
import AddButton from "./AddButton";
import style from "./style.module.scss";

function DirectoryViewer({isOpened, close})
{
	return <div className={`${style.outerContainer} ${isOpened ? "" : style.hidden}`}>
		<div className="backdrop" onClick={close} />
		<div className={style.viewerContainer}>
			<DirectoryList visible={isOpened} />
			<AddButton />
		</div>
	</div>;
}

export default DirectoryViewer;