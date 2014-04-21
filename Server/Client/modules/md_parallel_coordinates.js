/*
Copyright (C) 2012, 2013 Neil Redman, Alexander Murashkin <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function ParallelCoordinates(host, settings)
{
    this.id = "mdParallelCoordinates";

    this.settings = settings;
    this.title = this.settings.title;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;

    this.host = host;
    this.chart = null;

    this.instanceProcessor = null;
    this.host.loaded();
}

ParallelCoordinates.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.claferProcessor = new ClaferProcessor(data.claferXML);
    this.goals = data.goals;
});

ParallelCoordinates.method("resize", function() // not attached to the window anymore, so need to call the method
{
    this.redrawChart();
    return true;
});

ParallelCoordinates.method("onRendered", function()
{
    this.redrawChart();
});

ParallelCoordinates.method("argsToArray", function(argString){
    return argString.split("-");
});

ParallelCoordinates.method("redrawChart", function()
{
    /* calculating data */

    var instanceCount = this.instanceProcessor.getInstanceCount();    

    if (instanceCount == 0)
    {
        return;
    }

    var labels = new Object();
    labels["id"] = "#variant";

    for (var j = 0; j < this.goals.length; j++)
    {
        labels[this.goals[j].arg] = this.goals[j].label + " [" + this.goals[j].operation + "]";
    }

    var data = [];
    for (var i = 1; i <= instanceCount; i++)
    {            
        var current = new Object();
        current["id"] = i;
        for (var j = 0; j < this.goals.length; j++)
        {
            var value = this.instanceProcessor.getFeatureValue(i, this.argsToArray(this.goals[j].arg), 'int'); // get only numeric
            current[this.goals[j].arg] = value;
        }

        data.push(current);
    }          

    console.log(data);
    console.log(labels);

    /* Rendering */

    $('#mdParallelCoordinates div.window-content').html("");
    $('#mdParallelCoordinates div.window-content').html(this.getContent());

/* if using the module

    // quantitative color scale
    var blue_to_brown = d3.scale.linear()
      .domain([9, 50])
      .range(["steelblue", "brown"])
      .interpolate(d3.interpolateLab);

    var color = function(d) { return blue_to_brown(d['economy (mpg)']); };

    var parcoords = d3.parcoords()("#pcChart")
        .color(color)
        .alpha(0.4)
        .data(data)
        .render()
        .reorderable()
        .brushable()
        .interactive();
*/

    var e = $('#mdParallelCoordinates div.window-content')[0];

    var sw = document.defaultView.getComputedStyle(e,null).getPropertyValue("width");
    var sh = document.defaultView.getComputedStyle(e,null).getPropertyValue("height");

    var w = parseInt(sw) - 10;
    var h = parseInt(sh) - 10;

    var context = this;

    var chartListeners = {
        "onMouseOver": function(id){
            context.settings.onMouseOver(context, getPID(id));
//            alert("over: " + id);
        },
        "onMouseOut": function(id){
            context.settings.onMouseOut(context, getPID(id));
//            alert("out: ");
        },
        "onSelected": function(id){
            context.settings.onSelected(context, getPID(id));
//            alert("select: " + id);
        },
        "onDeselected": function(id){
            context.settings.onDeselected(context, getPID(id));
//            alert("unselect: " + id);
        },
        "onRangeFilter": function(dim, start, end){
            context.settings.onRangeFiltered(context, dim, start, end);
        }        
    }

    this.chart = new CustomParCoords("#pcChart", data, labels, [30, 10, 10, 10], w, h, chartListeners);

});

//gets containers and placeholders
ParallelCoordinates.method("getContent", function()
{
    var content = '<div id="pcChart" class="parcoords" style="width:100%;height:100%"></div>';
	return content;	
});

ParallelCoordinates.method("getInitContent", function()
{
	return this.getContent();
});

ParallelCoordinates.method("onInitRendered", function()
{

});

ParallelCoordinates.method("makePointsSelected", function(pid)
{
    this.chart.makeSelected(parseInt(parsePID(pid)));
});

ParallelCoordinates.method("makePointsDeselected", function(pid)
{
    this.chart.makeDeselected(parseInt(parsePID(pid)));
});

ParallelCoordinates.method("makeActive", function(pid)
{
    this.chart.makeActive(parseInt(parsePID(pid)));
});

ParallelCoordinates.method("makeInactive", function(pid)
{
    this.chart.makeInactive();
});
