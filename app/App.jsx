import { useState } from "react";
import Header from "./components/Header";
import NextButton from "./components/NextButton";
import PhaseContext from "./store/phaseContext.js";
import { PHASE } from "./utils/constants.js";
import "./styles/common.scss";

function Body({phase})
{
	switch(phase)
	{
	case PHASE.UPLOAD: return <div>upload phase</div>;
	case PHASE.CATEGORY: return <div>category phase</div>;
	case PHASE.CLASSIFY: return <div>classify phase</div>;
	case PHASE.DOWNLOAD: return <div>download phase</div>;
	}
	return null;
}


function App()
{
	const [phase, setPhase] = useState(PHASE.CLASSIFY);
	return <PhaseContext.Provider value={setPhase}>
		<Header phase={phase} />
		<Body phase={phase} />
		<NextButton />
	</PhaseContext.Provider>
}

export default App;