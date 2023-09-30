import { useState } from "react";
import DirectoryButton from "./DirectoryButton.jsx";
import AIButton from "./AIButton.jsx";
import style from "./style.module.scss";

function DirectoryViewer({isOpened, close})
{
	return <div className="directoryViewer"></div>
}

function Aside()
{
	const [viewerOpen, setViewerOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const openViewer = ()=>{
		setViewerOpen(true);
		setMenuOpen(false);
	};

	return <>
		<div className={style.asidePc}>
			<AIButton onClick={null} />
			<DirectoryButton onClick={openViewer} />
		</div>
		<div className={style.asideMobile}>
			<div className={style.menuButton} onClick={()=>setMenuOpen(true)}>
				<div className={style.hamburgerIcon}/>
			</div>
			<div className={`${style.mobileMenu} ${menuOpen ? style.opened : ""}`}>
				<div className="dimmed" onClick={()=>setMenuOpen(false)} />
				<AIButton onClick={null} />
				<DirectoryButton onClick={openViewer} />
			</div>
		</div>
		<DirectoryViewer isOpened={viewerOpen} close={()=>setViewerOpen(false)} />
	</>
}

export default Aside;