import { useState, useRef } from "react";
import Header from "./components/Header";
import UploadPhase from "./components/UploadPhase";
import CategoryPhase from "./components/CategoryPhase";
import ClassifyPhase from "./components/ClassifyPhase";
import DownloadPhase from "./components/DownloadPhase";
import CacheContext, {ImageCache} from "./store/imageCache.js";
import PhaseContext from "./store/phaseContext.js";
import { PHASE } from "./utils/constants.js";
import "./styles/common.scss";

function CategoryClassifyPhase({phase})
{
	const imageCacheRef = useRef(new ImageCache());

	if(phase === PHASE.CATEGORY) return <CategoryPhase />;
	else if(phase === PHASE.CLASSIFY) {
		return <CacheContext.Provider value={imageCacheRef.current}>
			<ClassifyPhase />
		</CacheContext.Provider>;
	}
	return null;
}

function Body({phase})
{
	switch(phase)
	{
	case PHASE.UPLOAD: return <UploadPhase />;
	case PHASE.CATEGORY:
	case PHASE.CLASSIFY: return <CategoryClassifyPhase phase={phase}/>;
	case PHASE.DOWNLOAD: return <DownloadPhase />;
	}
	return null;
}

function App()
{
	const [phase, setPhase] = useState(PHASE.UPLOAD);
	return <PhaseContext.Provider value={setPhase}>
		<Header phase={phase} />
		<Body phase={phase} />
	</PhaseContext.Provider>
}


export default App;