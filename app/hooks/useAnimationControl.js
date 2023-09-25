import { useState, useEffect, useRef, useMemo } from "react";

const IDLE = Symbol("idle");
const ANIMATE_FRONT = Symbol("front");
const ACTIVE = Symbol("active");
const ANIMATE_BACK = Symbol("back");

function useAnimationControl({forward, backward, active})
{
	const [animationState, setAnimationState] = useState(IDLE);
	const [isReversed, setReversed] = useState(false);
	const className = useMemo(()=>{
		switch(animationState)
		{
			case ANIMATE_FRONT: return forward;
			case ANIMATE_BACK: return `${backward} ${active}`;
			case ACTIVE: return active;
		}
		return "";
	}, [animationState]);
	const targetRef = useRef(null);

	useEffect( ()=>{
		if(targetRef.current === null) return;

		if(isReversed) targetRef.current.style.animationDirection = "reverse";
		function animEnd(e)
		{
			if(isReversed)
			{
				setReversed(false);
				e.target.style.animationDirection = "";
			}
			if(animationState === ANIMATE_FRONT) setAnimationState(isReversed ? IDLE : ACTIVE);
			else if(animationState === ANIMATE_BACK) setAnimationState(isReversed ? ACTIVE : IDLE);
		}
		targetRef.current.addEventListener("animationend", animEnd);
		return ()=>targetRef.current.removeEventListener("animationend", animEnd);
	}, [animationState, isReversed] );

	function setActive()
	{
		if(animationState === ACTIVE || animationState === ANIMATE_BACK) return;
		if(animationState === ANIMATE_FRONT)
		{
			setReversed(true);
			return;
		}
		setAnimationState(ANIMATE_FRONT);
	}
	function setDeactive()
	{
		if(animationState === IDLE || animationState === ANIMATE_FRONT) return;
		if(animationState === ANIMATE_BACK)
		{
			setReversed(true);
			return;
		}
		setAnimationState(ANIMATE_BACK);
	}

	return [targetRef, className, (state)=>(state ? setActive() : setDeactive())];
}

export default useAnimationControl;