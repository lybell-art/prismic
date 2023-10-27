import { useState, useMemo, createElement } from "react";
import Group from "./Group.jsx";
import useContainerHeight from "@/hooks/useContainerHeight.js";
import { debounce, clamp } from "@/utils/utils.js";
import "./style.scss";

function createHeader(item, template)
{
	if(item.header != null) return item.header;
	if(template != null) return createElement(template, item);
	return item.name;
}

/**
 * 그룹-아이템 형태로 구성된 아이템을 windowing으로 렌더링한 가상 리스트입니다.
 * @param rawData(Array({name, headercontent, count})) 렌더링할 가상 리스트의 원본.
 *  id: 각 그룹의 식별자
 * 	name : 각 그룹의 이름
 * 	header : 각 그룹의 헤더에 렌더링될 아이템(optional)
 *  content : 각 그룹에 소속된 실제 데이터
 *  count : 데이터의 수
 * @param column(number) 각 아이템의 열 수
 * @param headerSize(number) 아이템 헤더의 높이
 * @param itemSize(number) 각 아이템의 높이
 * @param categoryGap(number) 그룹과 그룹 사이의 간격
 * @param itemGap(number) 아이템과 아이템 사이의 간격
 * @param className(string) 컨테이너의 클래스 이름
 * @param template(string|class/func ReactComponent) 아이템 템플릿
 * @param headerTemplate(class/func ReactComponent) 헤더 템플릿
 * @param pickFunc(Function(content, index)=>Any) index에서 아이템을 반환하는 매핑 함수
 * @return ReactComponent
 */
function VirtualGroupList({ data: rawData, 
	column=1, headerSize, itemSize, categoryGap=10, 
	itemGap=0, 
	className="", template, headerTemplate=null, pickFunc 
})
{
	// 그룹의 열고 닫는 상태 관리
	const [foldList, setFoldState] = useState( new Map(rawData.map( ({id})=>[id, true] )) );
	// 스크롤 높이
	const [scrollHeight, setScrollHeight] = useState(0);
	// 컨테이너의 높이
	const [containerHeight, containerRef] = useContainerHeight();
	const itemInterval = itemSize + itemGap;

	// 그룹을 열거나 닫는다.
	function toggleFoldState(key)
	{
		setFoldState( state=>{
			const newState = new Map(state);
			const prevFoldState = state.get(key) ?? true;
			newState.set(key, !prevFoldState);
			return newState;
		} );
	}

	// 각 그룹의 y 좌표와 높이를 구한다.
	// data: Array({id, name, content, isOpened, count, yPos, height})
	const [totalHeight, yPosData] = useMemo( ()=>{
		const _data = rawData.map( (item, i)=>{
			const isOpened = foldList.get(item.id) ?? true;
			return {
				...item,
				isOpened,
				count: item.count,
				realCount: isOpened ? item.count : 0
			};
		} );

		const heights = _data.map( ({realCount})=> headerSize + itemInterval * Math.ceil( realCount / column ) );
		const yPos = heights.reduce((arr, height, i)=>{
			arr.push(arr[i] + height + categoryGap);
			return arr;
		}, [0]);
		const totalHeight = yPos.pop() - categoryGap;
		_data.forEach( (item,i)=>{
			item.yPos = yPos[i];
			item.height = heights[i];
		} );

		return [totalHeight, _data];
	}, [rawData, foldList, column, headerSize, itemInterval, categoryGap] );

	// 각 그룹이 렌더링할 시작 인덱스와 종료 인덱스를 구한다. 시작 인덱스와 종료 인덱스는 포함된다.
	// data: Array({id, name, content, isOpened, realCount, yPos, height, startIdx, endIdx})
	const listItemData = useMemo( ()=>{
		return yPosData.map( (item)=>{
			const relativeStartPos = scrollHeight - item.yPos - headerSize;
			const startRowIdx = Math.floor( relativeStartPos/itemInterval );
			const endRowIdx = Math.ceil( (relativeStartPos + containerHeight - itemGap)/itemInterval );
			const startIdx = clamp(startRowIdx*column, 0, item.realCount);
			const endIdx = clamp(endRowIdx*column, 0, item.realCount) - 1;

			const header = createHeader(item, headerTemplate);
			return {...item, header, startIdx, endIdx};
		} );
	}, [yPosData, scrollHeight, containerHeight, column, headerSize, itemInterval, itemGap] );

	return <div className={className} ref={containerRef} onScroll={debounce(e=>setScrollHeight(e.target.scrollTop))}>
		{listItemData.map( props=><Group
			setFold={()=>toggleFoldState(props.id)} 
			key={props.id}
			column={column}
			itemGap={itemGap}
			itemSize={itemSize}
			template={template}
			pickFunc={pickFunc}
			{...props} 
		/>)}
	</div>;
}

export default VirtualGroupList;