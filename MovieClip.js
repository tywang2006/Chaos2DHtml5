(function(){

var MovieClip = function(frames)
{
    core.Sprite.call(this);
    this.name = NameUtil.createUniqueName("MovieClip");  
    this._frameLabels = {};
    this._frames = [];
    this.currentFrame = 1;
    this._frameDisplayObject = null;
    this._pauseFrames = 0;
    this._paused = false;
}

core.inherit(MovieClip, core.Sprite);
core.MovieClip = MovieClip;
    
MovieClip.prototype.addFrameAt = function(data, frameIndex)
{
    this_frames.splice(frameIndex,0,null);
    this.setFrame(data, frameIndex);    
}

MovieClip.prototype.setFrame = function(data, frameIndex)
{
    var frame;
    frame = (data instanceof core.Frame)?data:new core.Frame(data);
    this._frames[frameIndex-1] = frame;
    if(frame.label) this._frameLabels[frame.label] = frame;
    if(frameIndex==1)
    {
        this._frameDisplayObject = frame.displayObject;
        this.width = Math.max(this.width, frame.displayObject.width);
        this.height = Math.max(this.height, frame.displayObject.height);
    }
}

MovieClip.prototype.getFrameIndex = function(frameIndexOrLabel)
{
    if(typeof(frameIndexOrLabel) == "number") return frameIndexOrLabel;
    var frame = frameIndexOrLabel;
    if(typeof(frame) == "string") frame = this._frameLables[frameIndexOrLabel];    
    for(var i = 0; i < this._frames.length; i++)
    {
        if(frame == this._frames[i]) return i + 1;
    }
    return -1;   
}

MovieClip.prototype.getFrame = function(frameIndexOrLabel)
{
    if(typeof(frameIndexOrLabel) == "number") return this._frames[frameIndexOrLabel - 1];
    return this._frameLables[frameIndexOrLabel];
}

MovieClip.prototype.removeFrame = function(frameIndexOrLabel)
{
    var frame = this.getFrame(frameIndexOrLabel);
    var frameIndex = frameIndexOrLabel;
    if(frame.label)
    {
        frameIndex = this.getFrameIndex(frame);
        delete this._frameLables[frame.label];
    }
    this._frames.splice(frameIndex - 1, 1);
}

MovieClip.prototype.getTotalFrames = function()
{
    return this._frames.length;    
}

MovieClip.prototype.nextFrame = function()
{
    var frame = this.getFrame(this.currentFrame);

    if(frame.pauseFrames)
    {               
        if(frame.pauseFrames > this._pauseFrames) this._pauseFrames++;  
        else this._pauseFrames = 0;
    }

    if(frame.gotoFrame) 
    {
        if(this._pauseFrames == 0 || !frame.pauseFrames) 
        {
            return this.currentFrame = this.getFrameIndex(frame.gotoFrame);
        }
    }
    
    if(frame.pauseFrames && this._pauseFrames > 0) return this.currentFrame;
    else if(this.currentFrame >= this._frames.length) return this.currentFrame = 1;
    else return ++this.currentFrame;
}

MovieClip.prototype.play = function()
{
    this._paused = false;
}

MovieClip.prototype.stop = function()
{
    this._paused = true;
}


MovieClip.prototype.gotoAndStop = function(frameIndexOrLabel)
{       
    this.currentFrame = this.getFrameIndex(frameIndexOrLabel);
    this._paused = true;
}

/**
 * Starts playing the MovieClip at the specified frame.
 */
MovieClip.prototype.gotoAndPlay = function(frameIndexOrLabel)
{
    this.currentFrame = this.getFrameIndex(frameIndexOrLabel);
    this._paused = false;
}

MovieClip.prototype.render = function(context)
{
    var frame = this.getFrame(this.currentFrame);
    if(this._frameDisplayObject && this._frameDisplayObject != frame.displayObject) this.removeChild(this._frameDisplayObject);
    this.addChildAt(frame.displayObject,0);
    this._frameDisplayObject = frame.displayObject;
    this.width = Math.max(this.width, this._frameDisplayObject.width);    
    this.height = Math.max(this.height, this._frameDisplayObject.height);    
    MovieClip.super.render.call(this, context);
    if(!this._paused && context == this.getStage().context) this.nextFrame();
}
    
})();