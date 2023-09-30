class KeyListener
{
	#locked = -1;
	#keydown = [];
	#keyup = [];
	#runKeyDown = null;
	#runKeyUp = null;
	constructor()
	{
		this.#runKeyDown = this.#_runKeyDown.bind(this);
		this.#runKeyUp = this.#_runKeyUp.bind(this);
	}
	addEventListener(type, func, hierarchy=0)
	{
		if(type === "keydown")
		{
			if(this.#keydown[hierarchy] === undefined) this.#keydown[hierarchy] = new Set();
			this.#keydown[hierarchy].add(func);
		}
		else if(type === "keyup")
		{
			if(this.#keyup[hierarchy] === undefined) this.#keyup[hierarchy] = new Set();
			this.#keyup[hierarchy].add(func);
		}
	}
	removeEventListener(type, func, hierarchy=0)
	{
		if(type === "keydown")
		{
			if(this.#keydown[hierarchy] === undefined) return;
			this.#keydown[hierarchy].delete(func);
		}
		else if(type === "keyup")
		{
			if(this.#keyup[hierarchy] === undefined) return;
			this.#keyup[hierarchy].delete(func);
		}
	}
	setLock(hierarchy)
	{
		this.#locked = hierarchy;
	}
	run()
	{
		document.addEventListener("keydown", this.#runKeyDown);
		document.addEventListener("keyup", this.#runKeyUp);
	}
	stop()
	{
		document.removeEventListener("keydown", this.#runKeyDown);
		document.removeEventListener("keyup", this.#runKeyUp);
	}

	#_runKeyDown(e)
	{
		for(let i=this.#keydown.length-1; i>this.#locked; i--)
		{
			for(let func of this.#keydown[i]) func(e);
		}
	}
	#_runKeyUp(e)
	{
		for(let i=this.#keyup.length-1; i>this.#locked; i--)
		{
			for(let func of this.#keyup[i]) func(e);
		}
	}
}

const keyListener = new KeyListener();
keyListener.run();

export default keyListener;