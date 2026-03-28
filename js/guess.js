
Guess = function(points)
{
    this.points = points;
    this.position = [0,0];
    this.dragDiff = [0,0];
    this.handles = [new Handle(this.position)];
}

Guess.prototype = inherit([Draggable]);

Guess.RADIUS = 4;
Guess.DRAW_NUMBERS = false;

Guess.prototype.clickIn = function(screenloc)
{
    var canvasLoc = worldToCanvas(this.position);

    var dx = screenloc[0] - canvasLoc[0];
    var dy = screenloc[1] - canvasLoc[1];

    return dx < Handle.RADIUS && dx > -Handle.RADIUS &&
           dy < Handle.RADIUS && dy > -Handle.RADIUS;
}

Guess.prototype.draw = function(ctx, info)
{
    var convert = info.convert;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(40, 200, 250, 0.6)";
    ctx.fillStyle = "rgba(40, 200, 250, 1.0)";

    var n = this.points.length;
    if ( n > 0 )
    {
        var a = convert(this.position);
        for ( var i = 0; i < n; i++ )
        {
            var b = convert(this.points[i].point);
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.ellipse(a[0], a[1], 6, 6, 0, 0, 2 * Math.PI); 
        ctx.fill();
        ctx.closePath();

        if (Guess.DRAW_NUMBERS)
        {
            var td = 0.0;
            var p = this.position;
            for ( var i = 0; i < n; i++ )
            {
                var q = this.points[i].point;
                var d0 = q[0] - p[0];
                var d1 = q[1] - p[1];
                td += Math.sqrt(d0*d0 + d1*d1);
            }

            ctx.font = "20px Arial";
            ctx.fillStyle = "rgba(40, 200, 250, 0.4)"
            ctx.lineWidth = 1;

            ctx.fillText(td.toFixed(2), a[0]+10, a[1]-10);
        }
    }
}

Guess.prototype.step = function(ctx, info)
{
    var n = this.points.length;
    var p = this.position;
    var g = [0,0];

    if ( n > 0 )
    {
        var k = 10.0/n;
        for ( var i = 0; i < n; i++ )
        {
            var q = this.points[i].point;
            var d0 = q[0] - p[0];
            var d1 = q[1] - p[1];
            var d = Math.sqrt(d0*d0 + d1*d1);
            if (d > 0.0)
            {
                g[0] -= k*d0/d;
                g[1] -= k*d1/d;
            }
        }

        this.position[0] -= g[0];
        this.position[1] -= g[1];
    }
}
