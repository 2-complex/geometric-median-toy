
Point = function(v)
{
    this.point = [v[0], v[1]];
    this.handle = new Handle(this.point);
    this.handles = [this.handle];
}

Point.prototype.draw = function(ctx, info)
{
    var convert = info.convert;
    ctx.beginPath();
    ctx.lineWidth = 2;
    var pointColor = "rgba(0, 255, 50, 1.0)";
    ctx.fillStyle = pointColor;
    ctx.strokeStyle = pointColor;
    this.handle.draw(ctx, info);
}
