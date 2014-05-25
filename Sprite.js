(function(){

var Sprite = function()
{
    core.DisplayObjectContainer.call(this);
    this.name = NameUtil.createUniqueName("Sprite");    
}

core.inherit(Sprite, core.DisplayObjectContainer);
core.Sprite = Sprite;    
    
})();