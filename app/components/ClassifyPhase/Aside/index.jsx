import { useState, useEffect } from "react";
import DirectoryButton from "./DirectoryButton.jsx";
import AIButton from "./AIButton.jsx";
import DirectoryViewer from "../DirectoryViewer";
import useModalEffect from "@/hooks/useModalEffect.js";
import style from "./style.module.scss";

function Aside()
{
	const [viewerOpen, setViewerOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	useModalEffect(viewerOpen || menuOpen);

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
			<div className={style.menuButton} onClick={()=>setMenuOpen(state=>!state)}>
				<div className={`${style.hamburgerIcon} ${menuOpen ? style.active : ""}`}/>
			</div>
			<div className={`${style.mobileMenu} ${menuOpen ? "" : style.hidden}`}>
				<div className="backdrop" onClick={()=>setMenuOpen(false)} />
				<AIButton onClick={null} />
				<DirectoryButton onClick={openViewer} />
			</div>
		</div>
		<DirectoryViewer isOpened={viewerOpen} close={()=>setViewerOpen(false)} />
	</>
}

export default Aside;