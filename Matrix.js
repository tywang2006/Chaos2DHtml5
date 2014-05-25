(function(){
var Matrix = function(a, b, c, d, tx, ty)
{
    this.a = a != undefined ? a : 1;
    this.b = b != undefined ? b : 0;
    this.c = c != undefined ? c : 0;
    this.d = d != undefined ? d : 1;
    this.tx = tx != undefined ? tx : 0;
    this.ty = ty != undefined ? ty : 0;
}

core.Matrix = Matrix;

Matrix.prototype.concat = function(mtx)
{
	var a = this.a;
	var c = this.c;
	var tx = this.tx;

	this.a = a * mtx.a + this.b * mtx.c;
	this.b = a * mtx.b + this.b * mtx.d;
	this.c = c * mtx.a + this.d * mtx.c;
	this.d = c * mtx.b + this.d * mtx.d;
	this.tx = tx * mtx.a + this.ty * mtx.c + mtx.tx;
	this.ty = tx * mtx.b + this.ty * mtx.d + mtx.ty;
}

Matrix.prototype.concatTransform = function(x, y, scaleX, scaleY, rotation, regX, regY)
{
	var cos = 1;
	var sin = 0;
	if(rotation%360)
	{
		var r = rotation * Math.PI / 180;
		cos = Math.cos(r);
		sin = Math.sin(r);
	}

	if(regX != 0) this.tx -= regX; 
	if(regY != 0) this.ty -= regY;
	this.concat(new Matrix(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y));
}

Matrix.prototype.rotate = function(angle)
{
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);

	var a = this.a;
	var c = this.c;
	var tx = this.tx;

	this.a = a * cos - this.b * sin;
	this.b = a * sin + this.b * cos;
	this.c = c * cos - this.d * sin;
	this.d = c * sin + this.d * cos;
	this.tx = tx * cos - this.ty * sin;
	this.ty = tx * sin + this.ty * cos;
}

Matrix.prototype.scale = function(sx, sy)
{
	this.a *= sx;
	this.d *= sy;
	this.tx *= sx;
	this.ty *= sy;
}

Matrix.prototype.translate = function(dx, dy)
{
	this.tx += dx;
	this.ty += dy;
}

Matrix.prototype.identity = function()
{
	this.a = this.d = 1;
	this.b = this.c = this.tx = this.ty = 0;
}

Matrix.prototype.invert = function()
{
	var a = this.a;
	var b = this.b;
	var c = this.c;
	var d = this.d;
	var tx = this.tx;
	var i = a * d - b * c;

	this.a = d / i;
	this.b = -b / i;
	this.c = -c / i;
	this.d = a / i;
	this.tx = (c * this.ty - d * tx) / i;
	this.ty = -(a * this.ty - b * tx) / i;
}

Matrix.prototype.clone = function()
{
	return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
}

Matrix.prototype.toString = function()
{
	return "(a="+this.a+", b="+this.b+", c="+this.c+", d="+this.d+", tx="+this.tx+", ty="+this.ty+")";
}

}