
Centroid = function(points)
{
    this.points = points;
}

Centroid.RADIUS = 20;

Centroid.prototype.draw = function(ctx, info)
{
    var convert = info.convert;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(230, 0, 230, 1.0)";

    var n = this.points.length;

    if ( n > 0 )
    {
        var avg = [0,0];
        for ( var i = 0; i < n; i++ )
        {
            var v = this.points[i].point;
            avg[0] += v[0];
            avg[1] += v[1];
        }

        avg[0] /= n;
        avg[1] /= n;

        avg = convert(avg);

        ctx.beginPath();
        ctx.moveTo(avg[0]-Centroid.RADIUS, avg[1]);
        ctx.lineTo(avg[0]+Centroid.RADIUS, avg[1]);
        ctx.moveTo(avg[0], avg[1]-Centroid.RADIUS);
        ctx.lineTo(avg[0], avg[1]+Centroid.RADIUS);
        ctx.stroke();
    }
}
