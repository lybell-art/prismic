import {createContext} from "react";
import {wrapPromise} from "@/utils/utils.js";
import {PREVIEW_PIC_SIZE} from "@/utils/constants.js";

function getImageScale(origin, container)
{
	return Math.max(container.width/origin.width, container.height/origin.height);
}
function getImageXPos(originWidth, containerWidth)
{
	return containerWidth/2 - originWidth/2;
}
function getImagePosition(origin, container)
{
	const scale = getImageScale(origin, container);
	const width = origin.width*scale;
	const x = getImageXPos(width, container.width);
	return {x, width, height:origin.height*scale};
}

export class ImageCache
{
	constructor(width=PREVIEW_PIC_SIZE, height=width)
	{
		this.data = new Map();
		this.canvas = document.createElement("canvas");
		this.canvas.width = width * window.devicePixelRatio;
		this.canvas.height = height * window.devicePixelRatio;
		this.context = this.canvas.getContext("2d");
	}
	makeImage(src, width, height)
	{
		return wrapPromise(new Promise( (resolve, reject)=>{
			const img = new Image();
			img.src = src;
			img.addEventListener("load", ()=>{
				const ratio = window.devicePixelRatio;
				const {x, width: sWidth, height: sHeight} = getImagePosition(
					{width: img.naturalWidth, height:img.naturalHeight}, 
					{width: width*ratio, height: height*ratio}
				);
				this.canvas.width = width*ratio;
				this.canvas.height = height*ratio;
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.context.drawImage(img, x, 0, sWidth, sHeight);

				const dataURL = this.canvas.toDataURL();
				resolve(dataURL);
			});
			img.addEventListener("error", reject);
		} ));
	}

	getImage(src, width, height)
	{
		console.log(this.data);
		const path = `${src}@@${width}x${height}`;
		if(this.data.has(path)) return this.data.get(path);
		const resource = this.makeImage(src, width, height);
		this.data.set(path, resource);
		return resource;
	}
	reset()
	{
		this.data.clear();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}


const imgCacheContext = createContext(null);

export default imgCacheContext;