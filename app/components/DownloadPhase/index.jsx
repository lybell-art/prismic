import CenterContainer from "@/components/CenterContainer";
import useDirectoryStore from "@/store/directoryStore.js";
import style from "./style.module.scss";
import DownloadImg from "@/assets/download.svg?react"; 

function DownloadPhase()
{
	const sorted = useDirectoryStore( store=>store.sorted );
	return <main>
		<CenterContainer onClick={()=>console.log(sorted)}>
			<DownloadImg className="icon-svg" />
			<p className="caption-big">Download Files</p>
		</CenterContainer>
		<div className={style.buttonContainer}>
			<div className={style.button}>Classify another pictures</div>
			<a href="../" className={style.button}>Return To Title</a>
		</div>
	</main>;
}

export default DownloadPhase;