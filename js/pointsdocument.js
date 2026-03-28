
function PointsDocument()
{
    this.images = [];
    this.points = [];
    this.centroid = new Centroid(this.points);
    this.guess = new Guess(this.points);

    this.rootNode = new Node();
    this.rootNode.add(this.centroid);
    this.rootNode.add(this.guess);
}

PointsDocument.prototype.draw = function(ctx, info)
{
    this.rootNode.draw(ctx, info);
}

PointsDocument.prototype.close = function()
{
}

PointsDocument.prototype.serialize = function()
{
    return JSON.stringify( {'points' : this.points, 'images' : []} );
}


PointsDocument.prototype.addImage = function(imageInfo)
{
    this.images.push(imageInfo);
    this.rootNode.add(imageInfo);
}

PointsDocument.prototype.removeImage = function(imageInfo)
{
    var index = this.images.indexOf(imageInfo);
    this.images.splice(index, 1);
    this.rootNode.remove(imageInfo);
}

PointsDocument.prototype.addPoint = function(point)
{
    this.points.push(point);
    this.rootNode.add(point);
}

PointsDocument.prototype.removePoint = function(point)
{
    var index = this.points.indexOf(point);
    this.points.splice(index, 1);
    this.rootNode.remove(point);
}

PointsDocument.prototype.getDraggables = function()
{
    var draggableList = [this.guess];

    for( var i = 0; i < this.points.length; i++ )
    {
        draggableList = draggableList.concat(this.points[i].handles);
    }

    return this.images.concat( draggableList, this.rootNode.getDraggables() );
}

PointsDocument.prototype.step = function()
{
    this.guess.step();
}
