const PHASE = Object.freeze({
	UPLOAD: 1,
	CATEGORY: 2,
	CLASSIFY: 3,
	DOWNLOAD: 4
});

const HEADERS = Object.freeze(["Upload Images", "Make Category", "Classify Pictures", "Download Result"]);

export { PHASE, HEADERS };