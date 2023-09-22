import { useRef } from "react";
import NextButton from "@/components/NextButton";
import CenterContainer from "@/components/CenterContainer";
import UploadImg from "./upload.svg?react"; 

function handleFiles(files)
{
	for(let file of files)
	{
		if(!file.type?.startsWith("image")) continue;
		console.log(file);
	}
}

function UploadPhase()
{
	const fileRef = useRef();
	return <>
		<main>
			<CenterContainer 
				onClick={()=>fileRef.current?.click()}
				onDragOver={e=>e.preventDefault()}
				onDrop={e=>{e.preventDefault(); handleFiles(e.dataTransfer.files);}}
			>
				<UploadImg className="icon-svg" />
				<p className="caption-big">Upload Files</p>
			</CenterContainer>
		</main>
		<input type="file" accept="image/*" onChange={(e)=>handleFiles(e.target.files)} ref={fileRef} multiple hidden />
		<NextButton inactive={true} />
	</>;
}

export default UploadPhase;