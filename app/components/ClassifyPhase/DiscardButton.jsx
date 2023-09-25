import style from "./style.module.scss";

function DiscardButton()
{
	return <div className={`${style.button} ${style.discardButton}`}>
		<img src="/remove.svg" alt="remove" />
		<p>Discard</p>
	</div>;
}

export default DiscardButton;