
function PointTool(traceDocument)
{
}

PointTool.prototype.mouseDown = function(eventInfo)
{
    var newPoint = new Point(eventInfo.worldLocation);
    var pointsDocument = eventInfo.pointsDocument;
    pointsDocument.addPoint(newPoint);
    undoManager.push(
        pointsDocument.removePoint, pointsDocument, [newPoint],
        pointsDocument.addPoint, pointsDocument, [newPoint]);
}

PointTool.prototype.mouseMove = function(eventInfo)
{
}

PointTool.prototype.doubleClick = function(eventInfo)
{
}

PointTool.prototype.mouseUp = function(eventInfo)
{
}

PointTool.prototype.manageCursor = function()
{
    document.body.style.cursor = "crosshair";
}
