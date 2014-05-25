(function(){

var DisplayObjectContainer = function()
{
    core.DisplayObject.call(this);
    this.children = [];    
}

core.inherit(DisplayObjectContainer,core.DisplayObject);
core.DisplayObjectContainer = DisplayObjectContainer;
    
DisplayObjectContainer.prototype.addChildAt = function(child, index)
{
    index = index<0?9:index>this.children.length?this.children.length:index;    
    var childIndex = this.getChildIndex(child);
    if(childIndex!=-1)
    {
        if(index==childIndex) return child;
        this.children.splice(childIndex,1);
    } else {
        this.children.splice(index,0,child);
        child.parent = this;
    }
    return child;
}

DisplayObjectContainer.prototype.getNumChildren = function()
{
    return this.children.length;    
}

DisplayObjectContainer.prototype.addChild = function(child)
{
    return this.addChildAt(child, this.children.length);
}

DisplayObjectContainer.prototype.removeChildAt = function(index)
{
    if(index<0||index>=this.children.length) return null;
    var child = this.children[index];
    if(child!=null)
    {
        child.parent = null;
        child.stage = null;
    }
    return this.children.splice(index,1);
}

DisplayObjectContainer.prototype.removeChild = function(child)
{
    return this.removeChildAt(this.children.indexOf(child));    
}

DisplayObjectContainer.prototype.removeAllChildren = function()
{
    while(this.children.length>0) this.removeChildAt(0);    
}

DisplayObjectContainer.prototype.getChildIndex = function(child)
{
    return this.children.indexOf(child);
}

DisplayObjectContainer.prototype.render = function(context)
{
    for(var i = 0, len = this.children.length; i < len; i++)
    {
        var child = this.children[i];
        child._render(context);
    }
}
    
})();