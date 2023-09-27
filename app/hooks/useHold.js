import { useState, useRef, useCallback } from "react";

function useHold(clickFunc, holdFunc, duration = 1)
{
	const millis = duration * 1000;
	const [lastKeyPressed, setKeyPressTiming] = useState(Date.now());
	const [isHolding, setHolding] = useState(false);
	const timeout = useRef(null);
	const startHold = useCallback( ()=>{
		if(isHolding) return;
		setKeyPressTiming(Date.now());
		timeout.current = setTimeout( holdFunc, millis );
		setHolding(true);
	}, [isHolding, holdFunc] );
	const endHold = useCallback( ()=>{
		clearTimeout(timeout.current);
		timeout.current = null;
		setHolding(false);
		if(lastKeyPressed + millis > Date.now()) clickFunc();
	}, [lastKeyPressed, clickFunc] );

	return [ startHold, endHold, isHolding ];
}

export default useHold;