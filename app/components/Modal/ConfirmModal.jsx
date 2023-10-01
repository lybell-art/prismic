import {useState, useEffect} from "react";
import useModalEffect from "@/hooks/useModalEffect.js";
import style from "./style.module.scss";

function useConfirmModal(func)
{
	const [opened, setOpened] = useState(false);
	useModalEffect(opened);

	const closeModal = ()=>setOpened(false);
	function doConfirm()
	{
		func();
		setOpened(false);
	}

	function render({promptMessage, confirmMessage})
	{
		return <div className={`${style.modalContainer} ${opened ? "" : style.hidden}`}>
			<div className="backdrop" onClick={closeModal}></div>
			<div className={style.modal}>
				<p className={style.prompt}>{promptMessage}</p>
				<div className={style.modalButtonContainer}>
					<div className={style.cancel} onClick={closeModal}>Cancel</div>
					<div className={style.confirm} onClick={doConfirm}>{confirmMessage}</div>
				</div>
			</div>
		</div>;
	}
	return [()=>setOpened(true), render];
}

export default useConfirmModal;