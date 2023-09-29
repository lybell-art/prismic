import { useRef, useEffect } from "react";

function useIntersectionObserver(callback, threshold=0.0)
{
	const observeeRef = useRef(null);
	useEffect( ()=>{
		const observer = new IntersectionObserver( ([{intersectionRatio}])=>{
			callback(intersectionRatio > threshold);
		}, {threshold} );
		observer.observe(observeeRef.current);
		return ()=>observer.disconnect();
	}, [callback] );
	return observeeRef;
}

export default useIntersectionObserver;