import { useState } from "react";
import Header from "./components/Header";
import { PHASE } from "./utils/constants.js";

function Body({phase, setPhase})
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
	return <>
		<Header phase={phase} />
		<Body phase={phase} setPhase={setPhase} />
		<div onClick={()=>setPhase(phase=>phase%4+1)}>Next</div>
	</>
}

export default App;