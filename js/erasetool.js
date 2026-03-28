
function EraseTool(traceDocument)
{
}

EraseTool.prototype.mouseDown = function(eventInfo)
{
    var location = eventInfo.worldLocation;
    var pointsDocument = eventInfo.pointsDocument;

    var removedPoint = null;
    var points = eventInfo.pointsDocument.points;
    for( var i = 0; i < points.length; i++ )
    {
        var d0 = points[i].point[0] - location[0];
        var d1 = points[i].point[1] - location[1];
        if( Math.sqrt(d0*d0 + d1*d1) < 10 )
        {
            removedPoint = points[i];
            break;
        }
    }

    if( removedPoint )
    {
        pointsDocument.removePoint(removedPoint);
        undoManager.push(
            pointsDocument.addPoint, pointsDocument, [removedPoint],
            pointsDocument.removePoint, pointsDocument, [removedPoint]);
    }
}

EraseTool.prototype.mouseMove = function(eventInfo)
{
}

EraseTool.prototype.doubleClick = function(eventInfo)
{
}

EraseTool.prototype.mouseUp = function(eventInfo)
{
}

EraseTool.prototype.manageCursor = function()
{
    document.body.style.cursor = "not-allowed";
}
