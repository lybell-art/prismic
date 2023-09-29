import { createElement } from "react";

function createItem(component, content, style, key)
{
	if(component == null) return <div className="vglist-item" style={style} key={key}>{content}</div>;
	if(typeof component === "string") return <div className="vglist-item" style={style} key={key}>{component}</div>;
	return createElement( component, {style, content, key} );
}

/**
 * 그룹-아이템 형태로 구성된 아이템의 그룹입니다.
 * @param header(string|ReactComponent) 헤더에 표시될 컴포넌트
 * @param content(Array|Object) 렌더링할 원본 데이터
 * @param template(string|class/func ReactComponent) 아이템 템플릿
 * @param height(number) 이 컴포넌트의 높이
 * @param itemSize(number) 각 아이템의 높이
 * @param itemGap(number) 각 아이템의 간격
 * @param startIdx(number) 렌더링을 시작할 인덱스(포함)
 * @param endIdx(number) 렌더링을 종료할 인덱스(포함)
 * @param setFold(Function) 아이템 그룹을 열고 닫는 함수
 * @param pickFunc(Function(content, index)=>Any) index에서 아이템을 반환하는 매핑 함수
 * @return ReactComponent
 */
function Group({name="", header=name, content,
	template, 
	height, column=1, itemSize, itemGap=0, 
	startIdx, endIdx, 
	setFold=null, 
	pickFunc=(content, index)=>content[index]}={}
)
{
	const childList = [];
	for(let i=startIdx; i<=endIdx; i++)
	{
		const style = {
			position: "absolute",
			top: Math.floor(i/column) * (itemSize + itemGap),
			left: (i%column) * (itemSize + itemGap)
		};
		const elem = createItem(template, pickFunc(content, i), style, name+"_"+i);
		childList.push(elem);
	}

	return <div className="vglist-group" style={{height}}>
		<div className="vglist-header" onClick={setFold}>{header}</div>
		<div className="vglist-body">{childList}</div>
	</div>;
}

export default Group;