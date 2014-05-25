(function(){
  
var Frame = function(displayObject, label, gotoFrame, pauseFrames, stop)
{
    this.displayObject = displayObject;
    this.label = label;
    this.gotoFrame = gotoFrame;
    this.pauseFrames = pauseFrames;
    this.stop = stop;
}

core.Frame = Frame;
    
Frame.prototype.render = function(context, x, y)
{
    if(x != undefined) this.displayObject.x = x;    
    if(y != undefined) this.displayObject.y = y;  
    this.displayObject._render(context,false,false);
}
    
})()