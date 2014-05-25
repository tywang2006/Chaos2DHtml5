var core = {};

core.trace = function()
{
    var logs = [];
    for(var i=0;i<arguments.length;++i) logs.push(arguments[i]);    
    if(typeof(console) != "undefined" && typeof(console.log) != "undefined") console.log(logs.join(" "));
}

core.inherit = function(childClass, superClass)
{
    var tempConstructor = function();
    tempConstructor.prototype = superClass.prototype;
    childClass.super = superClass;
    childClass.prototype = new tempConstructor();
    childClass.prototype.constructor = childClass;    
}