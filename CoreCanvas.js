(function(){

var CoreCanvas = function(width, height) 
{
    var canvas = document.createElement("canvas");    
    canvas.width = width;
    canvas.height = height;
    this._context = canvas.getContext("2d");
    CoreCanvas._init(this, this._context);
}

CoreCanvas.prototype._proxy = function(context, func, alias) 
{
    this[func] = function() {
        return context[func].apply(context, arguments) || this;    
    }
    if(alias) this[alias] = this[func];
}

CoreCanvas._init = function(g, context) {
    g._proxy(context, "beginPath");
    g._proxy(context, "closePath");
    g._proxy(context, "stroke");
    g._proxy(context, "fill");
    g._proxy(context, "moveTo");
    g._proxy(context, "lineTo");
    
    g._proxy(context, "arcTo");
    g._proxy(context, "arc");
    g._proxy(context, "quadraticCurveTo", "curveTo");
    g._proxy(context, "bezierCurveTo");
    g._proxy(context, "rect");
    
    g._proxy(context, "createLinearGradient");
    g._proxy(context, "createRadialGradient");
    g._proxy(context, "createPattern");     
    
    g.fillStyle = null;
    g.strokeStyle = null;   
    g.fillAlpha = 1;
    g.lineAlpha = 1;
    g.lineWidth = 1;
}


CoreCanvas.prototype.lineStyle = function(thickness, lineColor, alpha, lineCap, lineJoin, miterLimit)
{
    this.lineWidth = this._context.lineWidth = thickness || 1;
    this.strokeStyle = this._context.strokeStyle = lineColor || "0";
    this.lineAlpha = alpha || 1;
    if(lineCap != undefined) this._context.lineCap = lineCap;
    if(lineJoin != undefined) this._context.lineJoin = lineJoin;
    if(miterLimit != undefined) this._context.miterLimit = miterLimit;
    return this;
}


CoreCanvas.prototype.beginLinearGradientFill = function(x0, y0, x1, y1, colors, ratios)
{
    var gradient = this.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0, len = colors.length; i < len; i++)
    {
        gradient.addColorStop(ratios[i], colors[i]);
    }
    this.fillStyle = gradient;
    return this;
}


CoreCanvas.prototype.beginRadialGradientFill = function(x0, y0, r0, x1, y1, r1, colors, ratios)
{
    var gradient = this.createRadialGradient(x0, y0, r0, x1, y1, r1);
    for (var i = 0, len = colors.length; i < len; i++)
    {
        gradient.addColorStop(ratios[i], colors[i]);
    }
    this.fillStyle = gradient;
    return this;
}


CoreCanvas.prototype.beginBitmapFill = function(image, repetition)
{
    repetition = repetition || "";
    this.fillStyle = this.createPattern(image, repetition);
    return this;
}

CoreCanvas.prototype.beginFill = function(fill, alpha)
{
    if(fill) 
    {
            this._context.fillStyle = fill;
            this.fillStyle = fill;
    }
    this.fillAlpha = alpha || 1;
    return this;
}


CoreCanvas.prototype.endFill = function()
{
    if(this.strokeStyle) 
    {
            this._context.strokeStyle = this.strokeStyle;
            this._context.globalAlpha = this.lineAlpha;
            this._context.stroke();
    }
    if(this.fillStyle) 
    {
            this._context.fillStyle = this.fillStyle;
            this._context.globalAlpha = this.fillAlpha;
            this._context.fill();
    }
    return this;
}


CoreCanvas.prototype.drawRect = function(x, y, width, height)
{
    this.beginPath();
    this.rect(x, y, width, height);
    this.closePath();
    this.endFill();
    return this;
}

CoreCanvas.prototype.drawRoundRect = function(x, y, width, height, cornerSize)
{   
    return this.drawRoundRectComplex(x, y, width, height, cornerSize, cornerSize, cornerSize, cornerSize);
}


CoreCanvas.prototype.drawRoundRectComplex = function(x, y, width, height, cornerTL, cornerTR, cornerBR, cornerBL)
{
    this.beginPath();
    this.moveTo(x + cornerTL, y);
    this.lineTo(x + width - cornerTR, y);
    this.arc(x + width - cornerTR, y + cornerTR, cornerTR, -Math.PI/2, 0, false);
    this.lineTo(x + width, y + height - cornerBR);
    this.arc(x + width - cornerBR, y + height - cornerBR, cornerBR, 0, Math.PI/2, false);
    this.lineTo(x + cornerBL, y + height);
    this.arc(x + cornerBL, y + height - cornerBL, cornerBL, Math.PI/2, Math.PI, false);
    this.lineTo(x, y + cornerTL);
    this.arc(x + cornerTL, y + cornerTL, cornerTL, Math.PI, Math.PI*3/2, false);
    this.closePath();
    this.endFill();
    return this;
}


CoreCanvas.prototype.drawCircle = function(x, y, radius)
{
    this.beginPath();
    this.arc(x + radius, y + radius, radius, 0, Math.PI * 2, 0);
    this.closePath();
    this.endFill();
    return this;
}


CoreCanvas.prototype.drawEllipse = function(x, y, width, height)
{
    if(width == height) return this.drawCircle(x, y, width);
    var w = width / 2;
    var h = height / 2;
    var C = 0.5522847498307933;
    var cx = C * w;
    var cy = C * h;
    x = x + w;
    y = y + h;
    this.beginPath();
    this.moveTo(x + w, y);
    this.bezierCurveTo(x + w, y - cy, x + cx, y - h, x, y - h);
    this.bezierCurveTo(x - cx, y - h, x - w, y - cy, x - w, y);
    this.bezierCurveTo(x - w, y + cy, x - cx, y + h, x, y + h);
    this.bezierCurveTo(x + cx, y + h, x + w, y + cy, x + w, y);
    this.closePath();
    this.endFill();
    return this;
}


CoreCanvas.prototype.get = function()
{
    return this._context.canvas;
}


CoreCanvas.prototype.setSize = function(width, height)
{       
    this._context.save();
    if(width != undefined) this._context.canvas.width = width;
    if(height != undefined) this._context.canvas.height = height;
    this._context.restore();
    return this;
}

CoreCanvas.prototype.clear = function()
{
    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    this._context.restore();
    return this;
}

})();
