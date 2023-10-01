import {useEffect, useCallback} from "react";
import useConfirmModal from "@/components/Modal/ConfirmModal.jsx";
import useDirectoryStore from "@/store/directoryStore.js";
import keyListener from "@/store/keyListener.js";
import useHold from "@/hooks/useHold.js";
import style from "./style.module.scss";

function DiscardButton()
{
	const _discard = useDirectoryStore(store=>store.discard);
	const setCurrentFile = useDirectoryStore(store=>store.setCurrentFile);
	const discard = useCallback(()=>{
		_discard();
		setCurrentFile();
	}, [_discard, setCurrentFile]);
	const [setOpened, ConfirmModal] = useConfirmModal(discard);
	const [startHold, endHold, isHolding] = useHold(setOpened, discard);

	useEffect( ()=>{
		function onKeyDown({key})
		{
			if(key !== "Delete" && key !== "Backspace") return;
			startHold();
		}
		function onKeyUp({key})
		{
			if(key !== "Delete" && key !== "Backspace") return;
			endHold();
		}
		keyListener.addEventListener("keydown", onKeyDown);
		keyListener.addEventListener("keyup", onKeyUp);
		return ()=>{
			keyListener.removeEventListener("keydown", onKeyDown);
			keyListener.removeEventListener("keyup", onKeyUp);
		}
	}, [startHold, endHold] );

	return <>
		<div className={`${style.button} ${style.discardButton} ${isHolding ? style.holding : ""}`}
			onMouseDown={startHold}
			onMouseUp={endHold}>
			<img src="/remove.svg" alt="remove" />
			<p>Discard</p>
		</div>
		<ConfirmModal promptMessage="Are you sure you want to discard it?" confirmMessage="Discard"/>
	</>;
}

export default DiscardButton;