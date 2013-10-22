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
function Graph(host)
{
    this.id = "mdGraph";
    this.title = "Bubble Front Graph";
    this.host = host;

    this.width = (window.parent.innerWidth-30 - this.host.findModule("mdInput").width);
    this.height = (window.parent.innerHeight-50 - this.host.findModule("mdComparisonTable").height - 52);
    this.posx = 500;
    this.posy = 0;
    
    this.instanceProcessor = null;
    this.axisArray = new Array();
    this.PFVisualizer = new ParetoFrontVisualizer("chart");
}

Graph.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.Processor = new ClaferProcessor(data.claferXML)    
});

Graph.method("onRendered", function()
{
    $("#graph_table").css("overflow", "hidden");
    this.goals = this.host.findModule("mdGoals").goals;
    
    var dropPlaces = $(".axis_drop");
    for (var i = 0; i < dropPlaces.length; i++)
    {
        $(".axis_drop")[i].ondrop = this.drop.bind(this);
        $(".axis_drop")[i].ondragover = this.allowDrop.bind(this);
    }
    
	if (this.goals.length == 1) // single-objective    
    {
		$("#chart").show();
		this.assignToAxis("dropPointX", this.goals[0].arg, this.goals[0].label);
		this.assignToAxis("dropPointY", this.host.instanceCounterArg, this.host.instanceCounterLabel);
        this.assignToAxis("dropPointZ", "", "");
        this.assignToAxis("dropPointT", "", "");
        this.redrawParetoFront();    
    }
	else if (this.goals.length >= 2)
	{
		$("#chart").show();
		this.assignToAxis("dropPointX", this.goals[0].arg, this.goals[0].label);
		this.assignToAxis("dropPointY", this.goals[1].arg, this.goals[1].label);
        
        if (this.goals.length >= 3)
        {
            this.assignToAxis("dropPointZ", this.goals[2].arg, this.goals[2].label);

            if (this.goals.length >= 4)
            {
                this.assignToAxis("dropPointT", this.goals[3].arg, this.goals[3].label);
            }
            else 
                this.assignToAxis("dropPointT", "", "");

        }
        else 
        {
            this.assignToAxis("dropPointZ", "", "");
            this.assignToAxis("dropPointT", "", "");
        }
        
        this.redrawParetoFront();
	}
	else
    {
		$("#chart").hide();
    }
    
    $("#mdGraph .window-titleBar-content").text("Bubble Front Graph: " + this.instanceProcessor.getInstanceSuperClafer().replace(/[^_]{1,}[_]/, ""));
    this.addIds();
});

Graph.method("allowDrop", function(ev)
{
	ev.preventDefault();
});

Graph.method("completeDrop", function(target, arg, label)
// target is the drop destination
// arg is the quality id
// label is a label of the quality we drop
{
    var id = target.id;
    var node = target;
    
    while (node.parentNode != null && (id == "" || id == "svgcontY"|| id == "svgcontT"))
    {
        node = node.parentNode;
        id = node.id;
    }
    
	this.assignToAxis(id, arg, label, true);
    
    return id;
});

Graph.method("drop", function(ev)
{
	ev.preventDefault();

	var data = ev.dataTransfer.getData("Text");
	
	var parts = data.split("|");
	
	if (parts.length < 2)
		return;
	
	var arg = parts[0];
	var label = parts[1];

    if (this.host.findModule("mdGoals").goals.length == 1) // case of 1 dimension
    {
        // we have to switch the instance dimension too
        anotherTarget = "dropPointY";
        
        if (this.completeDrop(ev.target, arg, label) == anotherTarget)
        {
            anotherTarget = "dropPointX";
        }        
        
        this.completeDrop($("#" + anotherTarget)[0], this.host.instanceCounterArg, this.host.instanceCounterLabel);
    }
    else
        this.completeDrop(ev.target, arg, label); 
    
    this.redrawParetoFront();
    host.findModule("mdComparisonTable").addShapes();
    host.findModule("mdComparisonTable").filter.filterContent();
});

Graph.method("assignValue", function (id, value)
{
	if ($(id).length == 0)
		$('body').append('<input type="hidden" id="' + id + '" value=""/>');
	
	$('#' + id).val(value);
	
});

//redraws the graph
Graph.method("redrawParetoFront", function()
{
    if (this.instanceProcessor == null)
        return; // no data, so just resize

    var arg1 = $("#dropPointXAxisConfig_arg").val();
	var label1 = $("#dropPointXAxisConfig_label").val();

	var arg2 = $("#dropPointYAxisConfig_arg").val();
	var label2 = $("#dropPointYAxisConfig_label").val();

	var arg3 = $("#dropPointZAxisConfig_arg").val();
	var label3 = $("#dropPointZAxisConfig_label").val();
    
	var arg4 = $("#dropPointTAxisConfig_arg").val();
	var label4 = $("#dropPointTAxisConfig_label").val();
    
    var sLabel2 = '<g style="z-index: 110; "><text text-anchor="middle" x="15" y="320.5" font-family="Arial" font-size="12" transform="rotate(-90 14.2 320.5)" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">' + label2 + '</text><image xlink:href="images/verticalAxis.png" alt="yaxis" x="5" y="90" width="12" height="155"></g>';
    sLabel2 = '<div id="svgcontY" style="position:relative; left:0;top:0; z-index:100; width:100%; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="z-index:101;" height="450" width="18">' + sLabel2 + '</svg></div>';
    
    var sLabel4 = '<g style="z-index: 110; "><text text-anchor="middle" x="14.2" y="210.5" font-family="Arial" font-size="12" transform="rotate(-90 14.2 210.5)" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">' + label4;
    sLabel4 = sLabel4 + '</text><circle cx="40" cy="240" r="12" stroke="black" stroke-width="1" fill="#efe6dc" style="cursor: default;"/><circle cx="40" cy="185" r="20" stroke="black" stroke-width="1" fill="#efe6dc" style="cursor: default;"/><text id="MaxCircleLegend" text-anchor="middle" x="40" y="190" font-family="Arial" font-size="12" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">X1</text><text id="MinCircleLegend" text-anchor="middle" x="40" y="245" font-family="Arial" font-size="12" stroke="none" stroke-width="0" fill="#222222" style="cursor: default;">X2</text></g>';
    sLabel4 = '<div id="svgcontT" style="position:relative; left:0;top:0; z-index:100; width:100%; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="z-index:101;" height="350" width="60">' + sLabel4 + '</svg></div>';

    $("#dropPointX").html('<div>' + label1 + '<image src="images/horizontalAxis.png" alt="x-axis"></div>');
    $("#dropPointY").html(sLabel2);
    $("#dropPointZ").html("<div>" + label3 + "</div>");
    $("#dropPointT").html(sLabel4);

    var args = new Array();
    var labels = new Array();
    
    args.push(arg1);
    labels.push(label1);
    
    args.push(arg2);
    labels.push(label2);
    
//    alert(arg3);
    
    if (arg3 && arg3 != "")
    {
        args.push(arg3);
        labels.push(label3);
    }
    
//    alert(arg4);

    if (arg4 && arg4 != "")
    {
        args.push(arg4);
        labels.push(label4);
    }
    
    this.PFVisualizer.draw(this.Processor, this.instanceProcessor, args, labels, this.host.instanceCounterArg);
    this.makePointsSelected(this.host.selector.selection);
    this.makePointsReady();
    this.addFilters();
});

//adds ids to the circles and text on the graph for the other functions to use
Graph.method("addIds", function(){
    var i = 1;
    var graph_data = $("#chart g:contains('" + getPID(1) + "')")[2];
    var circle_pairs = [];
    for (i=0; i<$(graph_data).children().length;i+=2){
        circle_pairs.push({ circle: $(graph_data).children()[i], text_data: $(graph_data).children()[i+1], ident: ""});
    }

    for (i=0; i<circle_pairs.length; i++){
        circle_pairs[i].ident = $(circle_pairs[i].text_data).text().replace(/[A-Za-z]/g, "");
    }

    

    circle_pairs.sort(function(a,b){
        return a.ident - b.ident;
    });


    for(i=0; i<circle_pairs.length; i++){
        $(circle_pairs[i].circle).attr("id", getPID(i+1) + "c");
        $(circle_pairs[i].text_data).attr("id", getPID(i+1) + "t");
        var child1 = $(circle_pairs[i].text_data).children()[0]
        var child2 = $(circle_pairs[i].text_data).children()[1]
        $(child1).text(parsePID($(child1).text()));
        $(child2).text(parsePID($(child1).text()));
    }

});

// Make instances squares or octagons
Graph.method("makePointsReady", function(){
    this.addIds();
    var goals = this.Processor.getGoals();
    var originalPoints = this.host.findModule("mdInput").originalPoints
// Get graph bubble html locations
    originalCirclePairs = [];
    for (var i=1; i<=originalPoints; i++){
        originalCirclePairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }

    var circle_pairs = [];
    for (var i=(originalPoints + 1); i<=$("#chart circle").length; i++){
        circle_pairs.push({circle: $("#" + getPID(i) + "c"), text_data: $("#" + getPID(i) + "t"), ident: i});
    }
    //hide table header (row 0)
    while (circle_pairs.length != 0){
        circlePair = circle_pairs.pop();
        var r = $(circlePair.circle).attr("r");
        var xpos = $(circlePair.circle).attr("cx");
        var ypos = $(circlePair.circle).attr("cy");
        var fill = $(circlePair.circle).attr("fill");
        var id = getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "r"
        var NS="http://www.w3.org/2000/svg";
        var IdenticalId = this.instanceProcessor.getIdenticalID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, ""), goals, originalPoints) - 1;
        if (IdenticalId != -1){
            var shape = this.getSVGOctagon(xpos, ypos, r);
            var newID = getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "h";
            shape.setAttributeNS(null, "id", newID);
            $(originalCirclePairs[IdenticalId].circle).hide();
            $(originalCirclePairs[IdenticalId].text_data).hide();
            host.findModule("mdComparisonTable").filter.permaHidden[getPID((IdenticalId+1))] = true;
        } else {
            var shape = this.getSVGSquare(xpos, ypos, r)
            shape.setAttributeNS(null, "id", getPID($(circlePair.circle).attr("id").replace(/[A-Za-z]/g, "")) + "r");
        }
        shape.setAttributeNS(null, "stroke","#000000");
        shape.setAttributeNS(null, "stroke-width","1");
        shape.setAttributeNS(null, "fill-opacity","0.8");
        shape.style.fill=fill;
        $(circlePair.text_data).prepend(shape);
        $(circlePair.circle).hide();
    }
});

//return an svg octagon of 2r diameter centered at (x,y)
Graph.method("getSVGOctagon", function(x, y, r){
    var NS="http://www.w3.org/2000/svg";
    var oct= document.createElementNS(NS,"polygon");
    x = Number(x);
    y = Number(y);
    r = Number(r);
    var xcoords = [x-(r/3), x+(r/3), x+r, x-r]
    var ycoords = [y-(r/3), y+(r/3), y+r, y-r];
    var points = (xcoords[0])+","+(ycoords[3])+" ";
    points += (xcoords[1])+","+(ycoords[3]) + " ";
    points += (xcoords[2])+","+(ycoords[0]) + " ";
    points += (xcoords[2])+","+(ycoords[1]) + " ";
    points += (xcoords[1])+","+(ycoords[2]) + " ";
    points += (xcoords[0])+","+(ycoords[2]) + " ";
    points += (xcoords[3])+","+(ycoords[1]) + " ";
    points += (xcoords[3])+","+(ycoords[0]);
    oct.setAttributeNS(null, "points", points);
    return oct;
});

//returns an svg square of width 2r centered at (x,y)
Graph.method("getSVGSquare", function(cx, cy, r){
    var NS="http://www.w3.org/2000/svg";
    var rect= document.createElementNS(NS,"rect");
    rect.setAttributeNS(null, "height",r*2);
    rect.setAttributeNS(null, "width",r*2);
    rect.setAttributeNS(null, "x",cx-r);
    rect.setAttributeNS(null, "y",cy-r);
    return rect;
});

//formats object as selected
Graph.method("selectObject", function(o)
{
    $(o).attr("fill", "#ff0000");    
});

//formats object as not selected
Graph.method("deselectObject", function(o)
{
    $(o).attr("fill", "#000000");    
});

//runs selectObject on points
Graph.method("makePointsSelected", function(points)
{
    var module = this;
    this.selectObject($("#" + points + "t text")[1]);
});

//runs deselectObject on points
Graph.method("makePointsDeselected", function(points)
{
    var module = this;
    this.deselectObject($("#" + points + "t text")[1]);
});

//assigns a goal to an axis
Graph.method("assignToAxis", function(axis, arg, label)
{
	this.assignValue(axis + "AxisConfig_arg", arg);
	this.assignValue(axis + "AxisConfig_label", label);
});

//gets containers and placeholders
Graph.method("getContent", function()
{
	var table = $('<div border="0" id="graph_table" style="float:left"></div>');
	
    var tdZ = $('<div id="dropPointZ" class="axis_drop" style="float:left;"></div>');
    var tdY = $('<div id="dropPointY" class="axis_drop" style="float:left;"></div>');
    var tdT = $('<div id="dropPointT" class="axis_drop" style="float:left;"></div>');
    var tdChart = $('<div id="chart" style="float:left; display:none; width: 300px; height: 200px;"></div>'); // need to keep width here since first time is not rendered good
    var tdX = $('<div id="dropPointX" class="axis_drop" style="float:left;"></div>');

    this.axisArray.splice(0, this.axisArray.length); // clear the array
    this.axisArray = new Array();
    this.axisArray.push(tdX);
    this.axisArray.push(tdY);
    this.axisArray.push(tdZ);
    this.axisArray.push(tdT);
    
    for (var i = 0; i < this.axisArray.length; i++)
    {
        this.axisArray[i].html("&nbsp;");
    }
    
    var row1 = $('<div></div>').append(tdZ);
    var row2 = $('<div></div>').append(tdY).append(tdChart).append(tdT);
    var row3 = $('<div></div>').append(tdX);
        
		
    table.append(row1);
    table.append(row2);
    table.append(row3);
		
	return table;	
    
});

Graph.method("getInitContent", function()
{
	return this.getContent();
});

function setDim(el, w, h)
{
//    alert(el);
//    alert(w + "px");
//    alert(h + "px");

//    el.setAttribute('height', w + "px");
//    el.setAttribute('width', h + "px");

      $(el).width(w + "px");
      $(el).height(h + "px");

      if (el)
      {
          el.style.display = "inline-block";
      }

//    el.style.height = h + "px";
    
//    $(el).css("width", w + "px");
//    $(el).css("height", h + "px");
}

Graph.method("resize", function() // not attached to the window anymore, so need to call the method
{

    // need to resize dynamically, since it does not do this automatically

    var e = $('#mdGraph div.window-content')[0];
//    alert(e);
    
    var sw = document.defaultView.getComputedStyle(e,null).getPropertyValue("width");
    var sh = document.defaultView.getComputedStyle(e,null).getPropertyValue("height");

    var w = parseInt(sw);
    var h = parseInt(sh);
    
	var table = $('#graph_table')[0];	
    
    var tdZ = $('#dropPointZ')[0];
    var tdY = $('#dropPointY')[0];
    var tdT = $('#dropPointT')[0];
    
    var tdChart = $('#chart')[0];
    var tdDiv = $('#chart').children("div")[0];
    var tdX = $('#dropPointX')[0];    
        
    var unit = 20;
    
    setDim(table, w, h);
    setDim(tdZ, w, unit);
    setDim(tdY, unit, h - 2 * unit);
    setDim(tdChart, w - 4 * unit, h - 2 * unit);
    setDim(tdDiv, w - 4 * unit, h - 2 * unit);
    setDim(tdT, 2 * unit, h - 2 * unit);
    setDim(tdX, w, unit);

    $("#graph_table").css("table-layout", "auto"); //A fix for horizontal compression on non-chrome browsers (Jan 11th 2013)
    
    $("chart").empty(); // clear the old graph
    
    if (host.findModule("mdGraph"))
    {    
        host.findModule("mdGraph").redrawParetoFront();
    }

	return true;
});

//This adds a visual filter that is used by the hottracking higlights
Graph.method("addFilters", function(){
    var defs  = $("#defs");
    var NS="http://www.w3.org/2000/svg";
    var filter= document.createElementNS(NS,"filter");
    filter.setAttribute("id", "blur");

    var gaussian = document.createElementNS(NS,"feGaussianBlur");
    gaussian.setAttribute("in","SourceGraphic");
    gaussian.setAttribute("stdDeviation","1");

    $(filter).append(gaussian);
    $(defs).append(filter);
});