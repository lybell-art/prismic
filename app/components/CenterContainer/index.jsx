import style from "./style.module.scss";

function CenterContainer({className, children, ...props})
{
	return <div className={`${style.container} ${className ?? ""}`} {...props}>
		{children}
	</div>;
}

export default CenterContainer;