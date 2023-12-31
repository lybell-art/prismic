import {useState, useRef, useEffect} from "react";
import {debounce} from "@/utils/utils.js";

function useContainerHeight()
{
	const [height, setHeight] = useState(0);
	const ref = useRef(null);
	useEffect( ()=>{
		if(ref.current === null) return;
		setHeight(ref.current.offsetHeight);
		const debouncer = debounce( ([entry])=>{
			setHeight(entry.contentRect.height);
		}, 250 );

		const resizeObserver = new ResizeObserver( debouncer );
		resizeObserver.observe(ref.current);
		return ()=>resizeObserver.disconnect();
	}, [] );
	return [height, ref];
}

export default useContainerHeight;
