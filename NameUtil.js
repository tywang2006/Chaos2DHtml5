(function(){

var NameUtil = { _counter:0 };
core.NameUtil = NameUtil;

NameUtil.getUID = function()
{
    return NameUtil._counter++;    
}

NameUtil.createUniqueName = function(name)
{
    var charCode = name.charCodeAt(name.length-1);
    if(charCode>=48&&charCode<=57) name+="_";
    return name+NameUtil.getUID();    
}

NameUtil.displayObjectName = function(displayObject)
{
    var result;
	for(var o = displayObject; o != null; o = o.parent)
	{		
		//prefer id over name if specified
        var s = o.id != null ? o.id : o.name;
        result = result == null ? s : (s + "." + result);
	}
	return result;
        
}
    
})()    