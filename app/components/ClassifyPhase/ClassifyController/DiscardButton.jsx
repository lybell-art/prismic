import useConfirmModal from "@/components/Modal/ConfirmModal.jsx";
import style from "./style.module.scss";

function DiscardButton()
{
	const [setOpened, ConfirmModal] = useConfirmModal()
	return <>
		<div className={`${style.button} ${style.discardButton}`} onClick={()=>setOpened(true)}>
			<img src="/remove.svg" alt="remove" />
			<p>Discard</p>
		</div>
		<ConfirmModal promptMessage="Are you sure you want to discard it?" confirmMessage="Discard"/>
	</>;
}

export default DiscardButton;