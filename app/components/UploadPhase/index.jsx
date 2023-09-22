import { useRef } from "react";
import NextButton from "@/components/NextButton";
import CenterContainer from "@/components/CenterContainer";
import useDirectoryStore from "@/store/directoryStore.js";
import UploadImg from "./upload.svg?react"; 

function UploadPhase()
{
	const addFiles = useDirectoryStore(store => store.addFiles);
	const hasFile = useDirectoryStore(store => store.unsorted.size > 0);

	const fileRef = useRef();
	return <>
		<main>
			<CenterContainer 
				onClick={()=>fileRef.current?.click()}
				onDragOver={e=>e.preventDefault()}
				onDrop={e=>{e.preventDefault(); addFiles(e.dataTransfer.files);}}
			>
				<UploadImg className="icon-svg" />
				<p className="caption-big">Upload Files</p>
			</CenterContainer>
		</main>
		<input type="file" accept="image/*" onChange={(e)=>addFiles(e.target.files)} ref={fileRef} multiple hidden />
		<NextButton inactive={!hasFile} />
	</>;
}

export default UploadPhase;