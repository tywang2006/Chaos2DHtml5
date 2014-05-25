(function(){

var DisplayObject = function()
{
    this.name = NameUtil.createUniqueName("DisplayObject");
    this.id = null;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.alpha = 1;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;
    this.regX = 0;
    this.regY = 0;
    this.visible = true;
    this.parent = null; 
    this.stage = null;
}
core.DisplayObject = DisplayObject;
    
DisplayObject.prototype.getStage = function()
{
    if(this.stage) return this.stage;
    var p = this;
    while(p.parent) p = p.parent;
    if(p instanceof core.Stage) return this.stage = p;
    return null;    
}

DisplayObject.prototype.getCurrentWidth = function()
{
    return Math.abs(this.width*this.scaleX);
}
 
DisplayObject.prototype.getCurrentHeight = function()
{
    return Math.abs(this.height*this.scaleY);
}

DisplayObject.prototype.getConcatenatedMatrix = function() 
{
	var mtx = new core.Matrix();
	for (var o = this; o != null; o = o.parent)
	{
		mtx.concatTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.regX, o.regY);
	}	
	return mtx;
}

DisplayObject.prototype.localToGlobal = function(x, y)
{
	var cm = this.getConcatenatedMatrix();
	if (cm == null) return {x:0, y:0};
	var m = new core.Matrix(1, 0, 0, 1, x, y);
	m.concat(cm);
	return {x:m.tx, y:m.ty};
}


DisplayObject.prototype.globalToLocal = function(x, y) 
{
	var cm = this.getConcatenatedMatrix();
	if (cm == null) return {x:0, y:0};
	cm.invert();
	var m = new core.Matrix(1, 0, 0, 1, x, y);
	m.concat(cm);
	return {x:m.tx, y:m.ty};
}

DisplayObject.prototype._transform = function(context, toGlobal)
{
    if(toGlobal)
    {
        var p = this.localToGlobal(0,0);
        if(p.x != 0 || p.y != 0) context.translate(p.x, p.y);
    } else {
        context.translate(this.x, this.y);    
    }
    if(this.rotation%360 > 0) context.rotate(this.rotation%360/180*Math.PI);
    if(this.scaleX != 1 || this.scaleY != 1) context.scale(this.scaleX, this.scaleY);
    if(!toGlobal) context.translate(-this.regX, -this.regY);
    context.globalAlpha *= this.alpha;
}

DisplayObject.prototype._render = function(context, noTransform, globalTransform)
{
    if(!this.visible || this.alpha<=0 || this.scaleX == 0 || this.scaleY == 0) return;
    context.save();
    if(!noTransform) this._transform(context,globalTransform);
    this.render();
    context.restore();
}

DisplayObject.prototype.render = function(context){};
   
})();