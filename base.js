var core = {};

core.trace = function()
{
    var logs = [];
    for(var i=0;i<arguments.length;++i) logs.push(arguments[i]);    
    if(typeof(console) != "undefined" && typeof(console.log) != "undefined") console.log(logs.join(" "));
}

core.inherit = function(childClass, superClass)
{
    var tempConstructor = function() {};
    tempConstructor.prototype = superClass.prototype;
    childClass.super = superClass.prototype;
    childClass.prototype = new tempConstructor();
    childClass.prototype.constructor = childClass;  
}

core.delegate = function(func, self, args)
{
    var context = self || window;
    if (arguments.length > 2) 
    {
        var boundArgs = Array.prototype.slice.call(arguments, 2);
        return function() 
        {
            var newArgs = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(newArgs, boundArgs);
            return func.apply(context, newArgs);
        };
    }else {
        return function() { return func.apply(context, arguments); };
    }
}