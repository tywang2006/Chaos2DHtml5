(function()
{	
	var conflictMap = {}, cacheMap = {};	
	function mapClass(className, host)
	{
		if(window[className] != undefined) conflictMap[className] = window[className];
		cacheMap[className] = window[className] = (host || core)[className];
	}

	core.noConflict = function()
	{
		for(var p in cacheMap) 
		{
			if(conflictMap[p] != undefined) window[p] = conflictMap[p];
			else delete window[p];
		}
	}

	mapClass("trace");

	mapClass("DisplayObject");
	mapClass("DisplayObjectContainer");
	mapClass("Graphics");
	mapClass("Shape");
	mapClass("Bitmap");
	mapClass("Sprite");
	mapClass("Frame");
	mapClass("MovieClip");
	mapClass("Stage");

})();