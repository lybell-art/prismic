import style from "./style.module.scss";

function CenterContainer({className, inactive, children, ...props})
{
	return <div className={`${style.container} ${inactive ? style.inactive : ""} ${className ?? ""}`} {...props}>
		{children}
	</div>;
}

export default CenterContainer;