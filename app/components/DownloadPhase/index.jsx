import useDirectoryStore from "@/store/directoryStore";

function DownloadPhase()
{
	const sorted = useDirectoryStore( store=>store.sorted );
	console.log(sorted);
	return <div>
		{JSON.stringify(sorted)}
	</div>;
}

export default DownloadPhase;