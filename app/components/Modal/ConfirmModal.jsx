import {useState, useEffect} from "react";
import {useBodyScrollLock} from "@/hooks/useBodyScrollLock.js";
import keyListener from "@/store/keyListener.js";
import style from "./style.module.scss";

function useConfirmModal(func)
{
	const [opened, setOpened] = useState(false);
	const [lockScroll, openScroll] = useBodyScrollLock();
	function controlModal(open)
	{
		setOpened(open);
		keyListener.setLock(open ? 0 : -1);
		if(open) lockScroll();
		else openScroll();
	}
	const closeModal = ()=>controlModal(false);

	function doConfirm()
	{
		func();
		setOpened(false);
		openScroll();
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
	return [controlModal, render];
}

export default useConfirmModal;