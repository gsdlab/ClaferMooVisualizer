/*
Copyright (C) 2012 - 2014 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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

/* Graph */

Graph.method("makeHighlighted", function(pid)
{
/*
    var instance = parsePID(pid);
    var context = this;

    this.interval = null;
    this.timeout = null;

    //get crosshairs 
    var hairs = this.getCrosshairs($("#" + getPID(instance) + "c").attr("cx"), $("#" + getPID(instance) + "c").attr("cy"));
    $("#" + getPID(instance) + "c").before(hairs);
    $("#CHX").attr("class", instance + "HL");
    $("#CHY").attr("class", instance + "HL");

    var highlight = $("#" + getPID(instance) + "c").clone();
    highlight = this.highlight(highlight);
    $(highlight).removeAttr("id");
    $(highlight).attr("class", instance + "HL");
    //add highlight element behind circle
    $("#" + getPID(instance) + "c").before(highlight);

    var highlight = $("#" + getPID(instance) + "r").clone();
    highlight = this.highlight(highlight);
    $(highlight).removeAttr("id");
    $(highlight).attr("class", instance + "HL");
    //add highlight element behind circle
    $("#" + getPID(instance) + "r").before(highlight);

    var highlight = $("#" + getPID(instance) + "h").clone();
    highlight = this.highlight(highlight);
    $(highlight).removeAttr("id");
    $(highlight).attr("class", instance + "HL");
    //add highlight element behind circle
    $("#" + getPID(instance) + "h").before(highlight);

    var myBool = true;
    context.timeout = setTimeout(function(){
        context.interval = setInterval(function(){
            if (myBool){
                $("." + instance + "HL").hide(500);
                myBool = false;
            } else {
                $("." + instance + "HL").show(500);
                myBool = true;
            }
        }, 500);
    }, 1500);
*/    
});

Graph.method("makeDehighlighted", function(pid)
{
/*
    var instance = parsePID(pid);
    $("." + instance + "HL").remove();
    clearInterval(this.interval);
    clearTimeout(this.timeout);
*/
});

//sets a shape to be rendered as a highlight
Graph.method("highlight", function(obj)
{
/*
    $(obj).attr("filter", "url(#blur)");
    $(obj).attr("stroke-width", "6");
    $(obj).attr("stroke", "yellow");
    return obj;
*/
});

//returns crosshairs for the graph that intersect at coordinates (x,y)
Graph.method("getCrosshairs", function(x, y){
    var NS="http://www.w3.org/2000/svg";
    var crossX = document.createElementNS(NS,"line");
    crossX.setAttribute("x1", "0");
    crossX.setAttribute("x2", "1000");
    crossX.setAttribute("y1", y);
    crossX.setAttribute("y2", y);
    crossX.setAttribute("id", "CHX")
    //crossX.setAttribute("filter", "url(#blur)");
    crossX.setAttribute("stroke", "yellow");
    crossX.setAttribute("stroke-width", "2");

    var crossY = document.createElementNS(NS,"line");
    crossY.setAttribute("y1", "0");
    crossY.setAttribute("y2", "1000");
    crossY.setAttribute("x1", x);
    crossY.setAttribute("x2", x);
    crossY.setAttribute("id", "CHY")
    crossY.setAttribute("stroke", "yellow");
    crossY.setAttribute("stroke-width", "2");

    return [crossX, crossY];
});

//////////////////////////////////
/* For tables */
//////////////////////////////////

function TableHovering(id, context)
{
    this.id = id;
    this.context = context;
}

TableHovering.method("addHovering", function()
{
    var context = this;
    var prefix = this.id + " ";
    $(prefix + "#r0 .td_instance").hover(function () 
    {
        var instance = $(this).find(".svghead :last-child").text();
        context.context.settings.onMouseOver(context.context, getPID(instance));
    }, 

    function () {
        var instance = $(this).find(".svghead :last-child").text();
        context.context.settings.onMouseOut(context.context, getPID(instance));
    });

});

TableHovering.method("highlight", function(instance){
    var prefix = this.id + " ";
    $(prefix + "#th0_" + instance).css("background", "#ffffcc");
});

TableHovering.method("dehighlight", function(instance){
    var prefix = this.id + " ";
    $(prefix + "#th0_" + instance).css("background", "");
});

///////////////////////////////

FeatureQualityMatrix.method("addHovering", function()
{   
    var hovering = new TableHovering("#comparison", this);
    hovering.addHovering();
});

FeatureQualityMatrix.method("makeHighlighted", function(pid)
{   
    var hovering = new TableHovering("#comparison", this);
    hovering.highlight(parsePID(pid));
});

FeatureQualityMatrix.method("makeDehighlighted", function(pid)
{   
    var hovering = new TableHovering("#comparison", this);
    hovering.dehighlight(parsePID(pid));
});

////////////////////////////////
VariantComparer.method("addHovering", function(){
    var hovering = new TableHovering("#unique", this);
    hovering.addHovering();
});

VariantComparer.method("makeHighlighted", function(pid)
{   
    var hovering = new TableHovering("#unique", this);
    hovering.highlight(parsePID(pid));
});

VariantComparer.method("makeDehighlighted", function(pid)
{   
    var hovering = new TableHovering("#unique", this);
    hovering.dehighlight(parsePID(pid));
});


////////////////////////////
/* Highlighter */

function Highlighter(host){
    this.host = host;
}

Highlighter.method("onMouseOver", function(pid){
    this.host.findModule("mdGraph").makeHighlighted(pid);
    this.host.findModule("mdFeatureQualityMatrix").makeHighlighted(pid);
    this.host.findModule("mdParallelCoordinates").makeActive(pid);
//    this.host.findModule("mdVariantComparer").makeHighlighted(pid);
});

Highlighter.method("onMouseOut", function(pid){
    this.host.findModule("mdGraph").makeDehighlighted(pid);
    this.host.findModule("mdFeatureQualityMatrix").makeDehighlighted(pid);
    this.host.findModule("mdParallelCoordinates").makeInactive(pid);
//    this.host.findModule("mdVariantComparer").makeDehighlighted(pid);
});