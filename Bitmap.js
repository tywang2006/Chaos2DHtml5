(function(){

var Bitmap = function(image, frame)
{
    core.DisplayObject.call(this);
    this.name = core.NameUtil.createUniqueName("Bitmap");
    this.image = image;
    if(!frame) this.frame = [0,0,image.width,image.height];
    else this.frame = frame;
    this.width = this.frame[2];
    this.height = this.frame[3];
    this.regX = this.frame[4] || 0;
    this.regY = this.frame[5] || 0;
}

core.inherit(Bitmap,core.DisplayObject);
core.Bitmap = Bitmap;
    
Bitmap.prototype.render = function(context)
{
    context.drawImage(this.image, this.frame[0], this.frame[1], this.frame[2], this.frame[3],0,0,this.width,this.height);    
}   
    
})();