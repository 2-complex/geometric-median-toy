
function HandTool(traceDocument)
{
    this.dragDown = null;
    this.dragDiff = [0,0];
}

HandTool.prototype.mouseDown = function(eventInfo)
{
    document.body.style.cursor = "grabbing";
    this.isGrabbing = true;
    var v = [event.offsetX, event.offsetY];
    this.dragDown = eventInfo.offset;
    this.dragDiff[0] = eventInfo.offset[0] - v[0]
    this.dragDiff[1] = eventInfo.offset[1] - v[1];
}

HandTool.prototype.mouseMove = function(eventInfo)
{
    if( this.dragDown )
    {
        var v = [event.offsetX, event.offsetY];
        this.dragDown[0] = this.dragDiff[0] + v[0];
        this.dragDown[1] = this.dragDiff[1] + v[1];
    }
}

HandTool.prototype.doubleClick = function(eventInfo)
{
}

HandTool.prototype.mouseUp = function(eventInfo)
{
    document.body.style.cursor = "grab";
    this.isGrabbing = false;
    if( this.dragDown )
    {
        var v = [event.offsetX, event.offsetY];
        this.dragDown[0] = this.dragDiff[0] + v[0];
        this.dragDown[1] = this.dragDiff[1] + v[1];
        this.dragDown = null;
    }
}

HandTool.prototype.manageCursor = function()
{
    if( this.isGrabbing )
    {
        document.body.style.cursor = "grabbing";
    }
    else
    {
        document.body.style.cursor = "grab";
    }
}

