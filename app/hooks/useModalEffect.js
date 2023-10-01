import { useEffect } from "react";
import {useBodyScrollLock} from "@/hooks/useBodyScrollLock.js";
import keyListener from "@/store/keyListener.js";

function useModalEffect(isModalOpened)
{
	const [lockScroll, openScroll] = useBodyScrollLock();
	useEffect(()=>{
		if(isModalOpened)
		{
			lockScroll();
			keyListener.setLock(0);
		}
		else 
		{
			openScroll();
			keyListener.setLock(-1);
		}
	}, [isModalOpened]);
	useEffect( ()=>()=>keyListener.setLock(-1), [] );
}

export default useModalEffect;