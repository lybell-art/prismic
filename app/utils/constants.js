const PHASE = Object.freeze({
	UPLOAD: 1,
	CATEGORY: 2,
	CLASSIFY: 3,
	DOWNLOAD: 4
});

const HEADERS = Object.freeze(["Upload Images", "Make Category", "Classify Pictures", "Download Result"]);

const MAX_CATEGORY_NUM = 9;

export { PHASE, HEADERS, MAX_CATEGORY_NUM };