import { useCallback } from 'react';

/**
 * body scroll lock hook
 * made by https://joonfluence.tistory.com/657
 * arranged by lybell
 */
export function useBodyScrollLock() {
	let scrollPosition = 0;
	const lockScroll = useCallback(() => {
		// for IOS safari
		scrollPosition = window.pageYOffset;
		document.body.style.setProperty("--scroll", `-${scrollPosition}px`);
		document.body.classList.add("locked");
	}, []);

	const openScroll = useCallback(() => {
		// for IOS safari
		document.body.classList.remove("locked");
		window.scrollTo(0, scrollPosition);
		document.body.style.removeProperty("--scroll");
	}, []);

	return [lockScroll, openScroll];
}