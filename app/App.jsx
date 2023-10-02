import { useState } from "react";
import Header from "./components/Header";
import UploadPhase from "./components/UploadPhase";
import CategoryPhase from "./components/CategoryPhase";
import ClassifyPhase from "./components/ClassifyPhase";
import DownloadPhase from "./components/DownloadPhase";
import PhaseContext from "./store/phaseContext.js";
import { PHASE } from "./utils/constants.js";
import "./styles/common.scss";

function Body({phase})
{
	switch(phase)
	{
	case PHASE.UPLOAD: return <UploadPhase />;
	case PHASE.CATEGORY: return <CategoryPhase />;
	case PHASE.CLASSIFY: return <ClassifyPhase />;
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