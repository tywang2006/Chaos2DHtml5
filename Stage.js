(function(){
var Stage = function(context)
{
    if(context==null) throw Error("Context can't be null");
    core.DisplayObjectContainer.call(this);
    this.context = context;
    this.canvas = context.canvas;
    this._frameRate = 0;
    this._paused = false;
    this._pauseInNextFrame = false;
    this._intervalID = null;
    this.setFrameRate(20);
}

core.inherit(Stage, core.DisplayObjectContainer);
core.Stage = Stage;    
    
Stage.prototype.setFrameRate = function(frameRate)
{
    if(this_frameRate == frameRate) return;
    this._frameRate = frameRate;
    if(this._intervalID != null)clearInterval(this._intervalID);
    this._intervalID = setInterval
    
}

Stage.prototype._enterFrame = function()
{
    if(this._paused && !this._pauseInNextFrame) return;
    if(!this._paused||this._pauseInNextFrame)this._render(this.context,true);
    if(this._frameRate<=0)
    {
        clearInterval(this._intervalID);
        this._intervalID = null;
    }    
}

Stage.prototype.render = function(context, rect)
{
    if(!context) contex = this.context;
    if(rect) this.clear(rect.x,rect.y,rect.width,rect.height);
    else this.clear();
    Stage.super.render.call(this,context);  
    if(this._pauseInNextFrame)
    {
        this._paused = true;
        this._pauseInNextFrame = false;
    }
}

Stage.prototype.clear = function(x,y,width,height)
{
    if(arguments.length>=4)this.context.clearRect(x,y,width,height);
    else this.context.clearRect(0,0,this.canvas.width,this.canvas.height);    
}

Stage.prototype.getStageWidth = function()
{
    return this.canvas.width;
}

Stage.prototype.getStageHeight = function()
{
    return this.canvas.height;
}
    
})();