import style from "./style.module.scss";

function CenterContainer({className, onClick, children})
{
	return <div className={`${style.container} ${className ?? ""}`} onClick={onClick}>
		{children}
	</div>;
}

export default CenterContainer;